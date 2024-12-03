require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const http = require("http");
const socketIo = require("socket.io");
const multer = require("multer");
const path = require("path");
const { Schema } = mongoose;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // React frontend
    methods: ["GET", "POST"],
  },
});

// **MongoDB Connection**
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/centralDatabase";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// **Middleware**
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
});

// **Schemas and Models**
const userSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true },
  emailid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  serviceType: { type: String, required: true },
});

const parcelSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  address: String,
  status: { type: String, default: "Pending" },
});

const scheduleSchema = new mongoose.Schema({
  name: String,
  entities: String,
  weight: String,
  destination: String,
  pickupDate: String,
  dropDate: String,
});


const registrationSchema = new mongoose.Schema({
  cdlNumber: String,
  mcNumber: String,
  gstNumber: String,
  panNumber: String,
  vehicleCert: String,
  insuranceCert: String,
  panCard: String,
  transportLicense: String,
  cdlDocument: String,
  mcDocument: String,
});

const User = mongoose.model("User", userSchema);
const Parcel = mongoose.model("Parcel", parcelSchema);
const Schedule = mongoose.model("Schedule", scheduleSchema);
const Registration = mongoose.model("Registration", registrationSchema);

// **User Registration**
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Schema for the user
const userSchemaa = new Schema({
  registrationNumber: { type: String, required: true },
  emailid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  serviceType: { type: String, required: true },
});

const User4 = mongoose.model("User4", userSchemaa);

// Registration route (POST)
app.post("/api/auth/register", async (req, res) => {
  const { registrationNumber, emailid, password, confirmPassword, serviceType } = req.body;

  // Basic validation
  if (!registrationNumber || !emailid || !password || !confirmPassword || !serviceType) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User4.findOne({ emailid });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User4({
      registrationNumber,
      emailid,
      password: hashedPassword,
      serviceType,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was a problem with the registration." });
  }
});

// **User Login**
app.post("/api/auth/login1", async (req, res) => {
  const { emailid, password } = req.body;

  try {
    const user = await User.findOne({ emailid });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// **Save Parcel Data**
app.post("/api/parcels", async (req, res) => {
  try {
    const parcel = new Parcel(req.body);
    await parcel.save();
    res.status(201).json({ message: "Parcel saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save parcel data", error });
  }
});

// **Fetch Parcels**
app.get("/api/parcels", async (req, res) => {
  try {
    const parcels = await Parcel.find();
    res.json(parcels);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch parcels", error });
  }
});





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

app.get("/api/schedules", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch schedules", error });
  }
});

// **File Upload**
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully", file: req.file });
});

// **POST /api/documents for registration form submission**
app.post(
  "/api/documents",
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

      // Save registration details
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

// **WebSocket for Real-Time Location**
let connectedUsers = 0;

// Set up server to listen for location updates and track connections
io.on("connection", (socket) => {
  connectedUsers++;
  console.log("A new user connected. Connected users:", connectedUsers);

  // Broadcast the number of connected users to all clients
  io.emit("connected-users", connectedUsers);

  // Listen for location data from the client (Aopt component)
  socket.on("send-location", (data) => {
    console.log("Received location:", data);
    // Emit the location to all connected clients (Live component)
    io.emit("receive-location", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    connectedUsers--;
    console.log("A user disconnected. Connected users:", connectedUsers);
    // Broadcast the updated number of connected users
    io.emit("connected-users", connectedUsers);
  });
});




mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// User Schema (Mongoose Model)




// Routes

// POST route for registration


// Handle errors in routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});
//login for dop


app.post("/api/auth/login2", async (req, res) => {
  const { emailid, password } = req.body;

  if (!emailid || !password) {
      return res.status(400).json({ message: "All fields are required." });
  }

  try {
      // Find the user by email
      const user = await User4.findOne({ emailid });

      if (!user) {
          return res.status(401).json({ message: "Invalid email or password." });
      }

      // Compare the password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          return res.status(401).json({ message: "Invalid email or password." });
      }

      // Store the user ID in the session to maintain the session
      req.session.userId = user._id;

      res.status(200).json({ message: "Login successful!" });
  } catch (error) {
      console.error("Login error: ", error);
      res.status(500).json({ message: "Server error." });
  }
});

//3pl
app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define the User schema
const tplSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    companyName: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword : { type: String, required: true },

});

// Hash the password before saving the user


// Create User model


// Register user controller

app.post("/api/auth/register", async (req, res) => {
  const { name, email, phone, companyName, password, confirmPassword } = req.body;

  if (!name || !email || !phone || !companyName || !password|| !confirmPassword) {
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
      confirmPassword: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// qr data save

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })


const qrSchema = new mongoose.Schema({
  qrData: String, // Store the QR code data
  createdAt: { type: Date, default: Date.now },
});

const QR = mongoose.model("QR", qrSchema);

// Save QR data endpoint
app.post("/api/saveQr", async (req, res) => {
  try {
      const { qrData } = req.body;
      const newQR = new QR({ qrData });
      await newQR.save();
      res.status(201).json({ message: "QR Code data saved successfully!" });
  } catch (error) {
      res.status(500).json({ error: "Failed to save QR Code data." });
  }
});


//fetch the destination login

//fo reg

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Define a schema and model for form data
const FormDataSchema = new mongoose.Schema({
  name: String,
  city: String,
  phone: String,
  companyName: String,
  password: String,
  truck: String,
  preferredFrom: String,
  preferredTo: String,
  preferredCost: String,
});

const FormData = mongoose.model("FormData", FormDataSchema);

// Route to handle form submissions
app.post("/api/register", async (req, res) => {
  try {
    const { companyName, password, ...otherDetails } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newData = new FormData({ ...otherDetails, companyName, password: hashedPassword });
    await newData.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get all data (optional)
app.get("/api/data", async (req, res) => {
  try {
    const data = await FormData.find(); // Fetch all data from the database
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//login fllet

app.post("/api/login", async (req, res) => {
  const { companyName, password } = req.body;

  try {
    const user = await FormData.findOne({ companyName });
    if (!user) {
      return res.status(404).json({ message: "Company not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", companyName: user.companyName });
  } catch (error)  {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


//message function

mongoose.connect('mongodb://localhost:27017/fleet-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Message Schema & Model
const messageSchema = new mongoose.Schema({
  partnerId: String,
  message: String,
  status: { type: String, default: "Pending" },
});

const Message = mongoose.model('Message', messageSchema);

// Routes
app.post('/api/sendMessage', async (req, res) => {
  const { partnerId, message } = req.body;

  try {
      const newMessage = await Message.create({ partnerId, message });
      res.status(201).json(newMessage);
  } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
      const messages = await Message.find();
      res.json(messages);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.patch('/api/messages/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
      const updatedMessage = await Message.findByIdAndUpdate(
          id,
          { status },
          { new: true }
      );
      res.json(updatedMessage);
  } catch (error) {
      res.status(500).json({ error: 'Failed to update message status' });
  }
});






  

// **Fallback Route**
app.use((req, res) => res.status(404).json({ message: "Routesss not found" }));

// **Start Server**
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
