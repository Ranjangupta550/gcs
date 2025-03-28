const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST"],
  },
});

// Function to generate random telemetry data
const generateTelemetry = () => {
  return {
    nav: {
      airspeed: parseFloat((Math.random() * 50).toFixed(2)),
      altitude: parseFloat((Math.random() * 100).toFixed(2)),
      longitude: parseFloat((Math.random() * 360 - 180).toFixed(6)),
      latitude: parseFloat((Math.random() * 180 - 90).toFixed(6)),
      climb_rate: parseFloat((Math.random() * 10 - 5).toFixed(2)),
      groundspeed: parseFloat((Math.random() * 30).toFixed(2)),
    },
    attitude: {
      yaw: parseFloat((Math.random() * 360).toFixed(2)),
      pitch: parseFloat((Math.random() * 180 - 90).toFixed(2)),
      roll: parseFloat((Math.random() * 180 - 90).toFixed(2)),
    },
    battery: {
      level: parseFloat((Math.random() * 100).toFixed(2)),
      current: parseFloat((Math.random() * 5).toFixed(2)),
    },
    gps: {
      satellites: Math.floor(Math.random() * 13),
      strength: parseFloat((Math.random() * 100).toFixed(2)),
    },
    system: {
      flight_mode: ["Stabilize", "AltHold", "Loiter", "RTL"][Math.floor(Math.random() * 4)],
    },
  };
};

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  // Send connection success message
  socket.emit("connection_response", { message: true });

  // Handle telemetry stream requests
  socket.on("telemetry", () => {
    console.log(`📡 Telemetry request received from: ${socket.id}`);

    telemetryInterval = setInterval(() => {
        const telemetryData = generateTelemetry();
        console.log("📡 Sending telemetry data:", telemetryData); // Debugging
        socket.emit("telemetry_response", telemetryData);
    }, 1000);
});
  // Stop telemetry stream
//   socket.on("stop_telemetry_stream", () => {
//     console.log("Stopping telemetry stream for:", socket.id);
//     if (telemetryInterval) {
//       clearInterval(telemetryInterval);
//     }
//   });
//HANDLE CONNECT 
    socket.on("connection", () => {
        console.log("Connecting drone for:", socket.id);
        socket.emit("connection_response", { message: true });
    });
  // Handle disconnection
  socket.on("disconnection", () => {
    console.log("❌ Client disconnected:", socket.id);
    if (telemetryInterval) {
      clearInterval(telemetryInterval);
    }
    socket.emit("disconnection_response", { message: false });
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});