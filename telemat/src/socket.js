const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Store connected users
let connectedUsers = 0;

// Set up server to listen for location updates and track connections
io.on("connection", (socket) => {
  connectedUsers++;
  console.log("A new user connected. Connected users:", connectedUsers);

  // Broadcast the number of connected users to all clients
  io.emit("connected-users", connectedUsers);

  // Listen for location data from the Aopt component
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


server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
