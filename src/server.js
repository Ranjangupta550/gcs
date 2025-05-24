// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);
// let currentLat = 28.6139;
// let currentLong = 77.2090;
// let currentAltitude = 10;
// let currentYaw = 0;
// let roll = 0;
// let pitch = 0;

// const destinationLat = 28.6129;
// const destinationLong = 77.2295;

// const getRandom = (min, max) => +(Math.random() * (max - min) + min).toFixed(2);

// const toRadians = deg => deg * Math.PI / 180;
// const toDegrees = rad => rad * 180 / Math.PI;

// // Haversine-based bearing calculation
// const calculateBearing = (lat1, lon1, lat2, lon2) => {
//     const dLon = toRadians(lon2 - lon1);
//     const y = Math.sin(dLon) * Math.cos(toRadians(lat2));
//     const x = Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
//               Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);
//     return (toDegrees(Math.atan2(y, x)) + 360) % 360;
// };

// const moveTowardDestination = () => {
//     const step = 0.00015 + Math.random() * 0.00005;

//     const latDiff = destinationLat - currentLat;
//     const lonDiff = destinationLong - currentLong;

//     // Slightly vary path to simulate real flight
//     const directionNoise = (Math.random() - 0.5) * 0.0001;

//     currentLat += step * Math.sign(latDiff) + directionNoise;
//     currentLong += step * Math.sign(lonDiff) + directionNoise;

//     if (Math.abs(latDiff) < 0.0001 && Math.abs(lonDiff) < 0.0001) {
//         console.log("🏁 Reached destination");
//     }
// };

// const generateTelemetry = () => {
//     moveTowardDestination();

//     const bearing = calculateBearing(currentLat, currentLong, destinationLat, destinationLong);
//     currentYaw = +(bearing + getRandom(-2, 2)).toFixed(2); // add small noise

//     // Simulate altitude and pitch
//     const climb_rate = getRandom(-0.5, 0.8);
//     currentAltitude = Math.max(0, currentAltitude + climb_rate);
//     pitch = +(climb_rate * 10).toFixed(2); // positive pitch if climbing

//     // Roll when yaw is changing (simulated turn)
//     roll = getRandom(-5, 5); // small bank angle

//     return {
//         nav: {
//             altitude: +currentAltitude.toFixed(2),
//             longitude: +currentLong.toFixed(6),
//             latitude: +currentLat.toFixed(6),
//             climb_rate: +climb_rate.toFixed(2),
//             groundspeed: getRandom(10, 18),
//             airspeed: getRandom(25, 35),
//         },
//         attitude: {
//             yaw: currentYaw,
//             pitch: pitch,
//             roll: roll,
//         },
//         battery: {
//             current: getRandom(5, 10),
//         }
//     };
// };



// const io = new Server(server, {
//   cors: {
//     origin: "*", // 🔥 allow all origins (or specify "http://localhost:3000")
//     methods: ["GET", "POST"]
//   }
// });

// io.on("connect", (socket) => {
  
//   console.log("✅ Client connected");
//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected");
//   });

//   socket.on("connection", () => {
//     console.log("📩 connection recived");

//     setTimeout(() => {
//       socket.emit("connection_response", { message: true });
//     }, 5000); // Simulate a delay of 1 second before sending the response
//   });
//   socket.on("disconnection", () => {
//     console.log("📩 disconnection recived");
//     setTimeout(() => {
//       socket.emit("disconnection_response", { message: true });
//     } , 5000); // Simulate a delay of 1 second before sending the response
   
//   } );

//   socket.on("geofence", (data) => {
//     console.log("📩 geofence received", data);
//     setTimeout(() => {
//       socket.emit("geofence_response", { message: true });
//     }, 5000); // Simulate a delay of 5 seconds before sending the response
//   });

//   socket.on("telemetry", () => {
//     console.log("🎯 Client requested telemetry");

//     const interval = setInterval(() => {
//         const telemetryData = generateTelemetry();
//         socket.emit("telemetry_response",{message: telemetryData});
//     },300); // send every second

//     socket.on("disconnect", () => {
//         console.log("❌ Client disconnected");
//         clearInterval(interval);
//     });
// });
// });
// server.listen(5000, () => {
//   console.log("🚀 Mock WebSocket server running on http://localhost:5000");
// });