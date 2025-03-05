import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (you can restrict this later)
    methods: ["GET", "POST"],
  },
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for messages from the client
  socket.on("message", (data) => {
    console.log(`Received: ${data}`);
    io.emit("message", `Server received: ${data}`); // Broadcast to all clients
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`WebSocket server running on port ${PORT}`)
);
