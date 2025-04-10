import { io } from "socket.io-client";
// const socket = io("http://localhost:3000");
// const socket = io("http://192.168.29.14:5000");
const socket =io("http://192.168.167.108:5000");
// const socket = io("http://192.168.73.134:5000");

const ServerConnection = () => {
  // ✅ Handle connection
  socket.on("connect", () => {
    console.log("✅ Connected to WebSocket server");
    
  });

  // ❌ Handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ Disconnected from WebSocket server");
  });
};
socket.on("heartbeat", (data) => {
  console.log("📩 Server Response for heartbeat", data);
});

export const sendCommand = async (eventName) => {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Sending event: ${eventName}`);

    socket.emit(eventName);

    // ✅ Listen for the response with a one-time listener
    // console(`${eventName}_response`);
    socket.on(`${eventName}_response`, (data) => {
      console.log(`📩 Server Response for ${eventName}:`, data);
      resolve(data);
    });
  });
};

ServerConnection();
export { socket };
// import { io } from "socket.io-client";

// // const socket = io("http://192.168.29.14:5000");
// const socket = io("http://192.168.29.5:5001");

// const ServerConnection = () => {
//   socket.on("connect", () => {
//     console.log("✅ Connected to WebSocket server");

//     // 🔹 Heartbeat ko sirf tabhi listen karo jab connection ban jaye
//     listenToHeartbeat();
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ Disconnected from WebSocket server");
//   });
// };

// // 🔹 Heartbeat listener jab WebSocket connected ho
// const listenToHeartbeat = () => {
//   socket.on("heartbeat", (heartbeatRes) => {
//     // console.log("📩 Server Response for heartbeat:", heartbeatRes.message);
//     console.log("📩 Server Response for heartbeat:", heartbeatRes.message.ack_timestamp);
//     console.log("📩 Server Response for heartbeat:", heartbeatRes.message.ack);
//     heartbeatRes.message.ack=true;
//     heartbeatRes.message.ack_timestamp=new Date()/1000;
//     // console.log("time stamp",heartbeatRes.ack_timestamp);
//     socket.emit("ack",heartbeatRes);

//   });
// };
// // const emitHeartbeat = () => {
// //   socket.emit("ack_");
// // };  

// // 🔹 Generic command sender
// export const sendCommand = async (eventName) => {
//   return new Promise((resolve, reject) => {
//     if (!socket.connected) {
//       console.error("⚠️ WebSocket is not connected!");
//       return reject("WebSocket is not connected!");
//     }

//     console.log(`🚀 Sending event: ${eventName}`);
//     socket.emit(eventName);

//     socket.once(`${eventName}_response`, (data) => {
//       console.log(`📩 Server Response for ${eventName}:`, data);
//       resolve(data);
//     });
//   });
// };

// ServerConnection();
// export { socket };
