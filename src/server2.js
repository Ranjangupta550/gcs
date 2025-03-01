// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: "*", methods: ["GET", "POST"] },
// });

// // Function to generate random telemetry data
// const generateTelemetry = () => ({
//   nav: {
//     airspeed: parseFloat((Math.random() * 50).toFixed(2)),
//     altitude: parseFloat((Math.random() * 100).toFixed(2)),
//     longitude: parseFloat((Math.random() * 360 - 180).toFixed(6)),
//     latitude: parseFloat((Math.random() * 180 - 90).toFixed(6)),
//     climb_rate: parseFloat((Math.random() * 10 - 5).toFixed(2)),
//     groundspeed: parseFloat((Math.random() * 30).toFixed(2)),
//   },
//   attitude: {
//     yaw: parseFloat((Math.random() * 360).toFixed(2)),
//     pitch: parseFloat((Math.random() * 180 - 90).toFixed(2)),
//     roll: parseFloat((Math.random() * 180 - 90).toFixed(2)),
//   },
//   battery: {
//     level: parseFloat((Math.random() * 100).toFixed(2)),
//     current: parseFloat((Math.random() * 5).toFixed(2)),
//   },
//   gps: {
//     satellites: Math.floor(Math.random() * 13),
//     strength: parseFloat((Math.random() * 100).toFixed(2)),
//   },
//   system: {
//     flight_mode: ["Stabilize", "AltHold", "Loiter", "RTL"][Math.floor(Math.random() * 4)],
//   },
// });

// // Handle telemetry connections
// io.on("connection", (socket) => {
//   console.log("✅ Telemetry Client connected:", socket.id);
//   socket.emit("telemetry_connection", { message: "Connected to telemetry server" });

//   let telemetryInterval;

//   socket.on("start_telemetry", () => {
//     console.log(`📡 Starting telemetry stream for: ${socket.id}`);

//     telemetryInterval = setInterval(() => {
//       const telemetryData = generateTelemetry();
//       socket.emit("telemetry_update", telemetryData);
//     }, 1000);
//   });

//   socket.on("stop_telemetry", () => {
//     console.log(`🛑 Stopping telemetry stream for: ${socket.id}`);
//     if (telemetryInterval) clearInterval(telemetryInterval);
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ Telemetry Client disconnected:", socket.id);
//     if (telemetryInterval) clearInterval(telemetryInterval);
//   });
// });

// // Start the telemetry server
// const TELEMETRY_PORT = 5001;
// server.listen(TELEMETRY_PORT, () => {
//   console.log(`📡 Telemetry WebSocket server running on http://localhost:${TELEMETRY_PORT}`);
// });
