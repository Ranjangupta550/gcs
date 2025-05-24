import { io } from "socket.io-client";
import useServerStatus from "../Store/serverStatus";
import {connectionStatus,useTelemetryStore} from "../index"
import useTelemetry from "../Store/centralTelemetry";
const socket = io("http://192.168.29.14:5000");
 export const ServerConnection = () => {
  // ✅ Handle connection
  socket.on("connect", () => {
    console.log("✅ Connected to WebSocket server");
    useServerStatus.getState().setServerStatus(true);
  });

  // ❌ Handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ Disconnected from WebSocket server");
    useServerStatus.getState().setServerStatus(false);
    connectionStatus.getState().setConnectionandLoading(false,false);
    useTelemetryStore.getState().setTelemetry(null);

  });
};
socket.on("heartbeat", (data) => {
  // console.log("📩 Server Response for heartbeat", data);
});
export const sendCommand = async (eventName) => {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Sending event: ${eventName}`);
    socket.emit(eventName);
    socket.once(`${eventName}_response`, (data) => {
      console.log(`📩 Server Response for ${eventName}:`, data);
      resolve(data);
    });
  });
};
export const sendCommandWithPayload = async (eventName, payload) => {
  return new Promise((resolve, reject) => {

    console.log(`🚀 Sending event: ${eventName} with payload:`, payload);
    socket.emit(eventName, payload);

    socket.once(`${eventName}_response`, (data) => {
      console.log(`📩 Server Response for ${eventName}:`, data);
      resolve(data);
    });
  });
};
ServerConnection();
export { socket };






















//? heartbeat ko sirf tabhi listen karo jab connection ban jaye

// import { io } from "socket.io-client";

// const socket = io("http://192.168.29.14:5000");
// // const socket = io("http://192.168.29.5:5001");

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
//   console.log("Listening to heartbeat...");
//   socket.on("heartbeat", (heartbeatRes) => {
//     console.log("📩 Server Response for heartbeat:", heartbeatRes.message);

//     // console.log("📩 Server Response for heartbeat:", heartbeatRes.message.ack_timestamp);
//     // console.log("📩 Server Response for heartbeat:", heartbeatRes.message.ack);
//     heartbeatRes.message.ack=true;
//     heartbeatRes.message.ack_timestamp=new Date()/1000;
//     heartbeatRes.message.source="groundUnit"
//     // console.log("time stamp",heartbeatRes.ack_timestamp);
//     socket.emit("ack",heartbeatRes);

//   });
// };
// // // const emitHeartbeat = () => {
// // //   socket.emit("ack_");
// // // };  

// // // 🔹 Generic command sender
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
