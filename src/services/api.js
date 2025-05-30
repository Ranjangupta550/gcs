import { io } from "socket.io-client";
import useServerStatus from "../Store/serverStatus";
import {connectionStatus,useTelemetryStore,serverStatus} from "../index"
import useTelemetry from "../Store/centralTelemetry";
const socket = io("http://192.168.29.5:5000");
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
// socket.on("heartbeat", (data) => {
//   // console.log("📩 Server Response for heartbeat", data);
// });
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
