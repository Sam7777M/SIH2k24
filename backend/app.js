require("dotenv").config(); // For environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const http = require("http"); // For creating HTTP server
const socketIo = require("socket.io"); // For WebSocket
const multer = require("multer"); // For file uploads
const path = require("path"); // For handling file paths
const fs = require("fs"); // For filesystem operations

const app = express();
const server = http.createServer(app); // HTTP server for WebSocket
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend origin
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Parse JSON requests
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/parcelDB";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

// Mongoose Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  companyName: { type: String, required: true },
  password: { type: String, required: true },
});

const parcelSchema = new mongoose.Schema({
  parcelId: String,
  pickupPoint: String,
  destinationPoint: String,
  driverVehicle: String,
  numberOfEntities: Number,
  parcelWeight: String,
  parcelVolume: String,
});

const registrationSchema = new mongoose.Schema({
  cdlNumber: { type: String, required: true },
  mcNumber: { type: String, required: true },
  gstNumber: { type: String, required: true },
  panNumber: { type: String, required: true },
  vehicleCert: { type: String, required: true },
  insuranceCert: { type: String, required: true },
  panCard: { type: String, required: true },
  transportLicense: { type: String, required: true },
  cdlDocument: { type: String, required: true },
  mcDocument: { type: String, required: true },
});

const scheduleSchema = new mongoose.Schema({
  name: String,
  entities: String,
  weight: String,
  destination: String,
  pickupDate: String,
  dropDate: String,
});

// Models
const User = mongoose.model("User", userSchema);
const Parcel = mongoose.model("Parcel", parcelSchema);
const Registration = mongoose.model("Registration", registrationSchema);
const Schedule = mongoose.model("Schedule", scheduleSchema);

// Multer File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath); // Create folder if not exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// API Routes

// **User Registration**
app.post("/api/auth/register", async (req, res) => {
  const { name, email, phone, companyName, password } = req.body;

  if (!name || !email || !phone || !companyName || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      phone,
      companyName,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// **User Login**
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// **Save Parcel Data**
app.post("/api/save-parcel", async (req, res) => {
  try {
    const parcel = new Parcel(req.body);
    await parcel.save();
    res.status(201).json({ message: "Parcel data saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save parcel data" });
  }
});

// **Fetch All Parcels**
app.get("/api/parcels", async (req, res) => {
  try {
    const parcels = await Parcel.find();
    res.json(parcels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch parcel data" });
  }
});

// **Save Registration Data**
app.post(
  "/api/register",
  upload.fields([
    { name: "vehicleCert", maxCount: 1 },
    { name: "insuranceCert", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "transportLicense", maxCount: 1 },
    { name: "cdlDocument", maxCount: 1 },
    { name: "mcDocument", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { cdlNumber, mcNumber, gstNumber, panNumber } = req.body;

      // Validate required fields
      if (!cdlNumber || !mcNumber || !gstNumber || !panNumber) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const registration = new Registration({
        cdlNumber,
        mcNumber,
        gstNumber,
        panNumber,
        vehicleCert: req.files.vehicleCert[0].path,
        insuranceCert: req.files.insuranceCert[0].path,
        panCard: req.files.panCard[0].path,
        transportLicense: req.files.transportLicense[0].path,
        cdlDocument: req.files.cdlDocument[0].path,
        mcDocument: req.files.mcDocument[0].path,
      });

      await registration.save();
      res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error. Please try again." });
    }
  }
);

// **Save Schedule Data**
app.post("/api/schedule", async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).send({ message: "Schedule saved successfully" });
  } catch (error) {
    res.status(500).send({ message: "Failed to save schedule", error });
  }
});

// **WebSocket for Real-time Location Updates**
let users = {}; // Store user locations by socket ID

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send-location", (data) => {
    const { latitude, longitude } = data;
    users[socket.id] = { id: socket.id, latitude, longitude };
    io.emit("receive-location", users[socket.id]); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete users[socket.id];
  });
});

// Server listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
