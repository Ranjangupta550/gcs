// socket.js
import { io } from "socket.io-client";
import config from "./config"; // Your config file
import { useServerStatus } from "../index";
import { connectionStatus, useTelemetryStore } from "../index";

let socket = null;

// ✅ Create socket and attach event listeners
export function ServerConnection() {
  if (!socket) return;

  // 🔌 On connect
  socket.on("connect", () => {
    console.log("✅ Connected to WebSocket server");
    useServerStatus.getState().setServerStatus(true);
  });

  // 🔌 On disconnect
  socket.on("disconnect", () => {
    console.warn("🔌 Disconnected from server");
    useServerStatus.getState().setServerStatus(false);
    connectionStatus.getState().setConnectionandLoading(false, false);
    useTelemetryStore.getState().setTelemetry(null);
  });

  // ❌ On error
  socket.on("connect_error", (err) => {
    // console.error("⚠️ WebSocket connection error:", err.message);
    useServerStatus.getState().setServerStatus(false);
    connectionStatus.getState().setConnectionandLoading(false, false);
    useTelemetryStore.getState().setTelemetry(null);
  });
}

// ✅ Reconnect with updated IP & Port
export function reconnectSocket() {
  const api = config.apiEndpoint();
  console.log("🔁 Reconnecting to:", api);

  try {
    socket = io(api, {
      transports: ["websocket"],
      timeout: 5000,
    });
    ServerConnection(); // reattach listeners
  } catch (err) {
    console.error("❌ Socket reconnect failed:", err.message);
  }
}

// ✅ Emit event without payload
export async function sendCommand(eventName) {
  if (!socket?.connected) {
    console.warn("⚠️ Socket not connected");
    return;
  }

  return new Promise((resolve) => {
    console.log(`🚀 Sending command: ${eventName}`);
    socket.emit(eventName);
    socket.once(`${eventName}_response`, (data) => {
      console.log(`📩 Response for ${eventName}:`, data);
      resolve(data);
    });
  });
}

// ✅ Emit event with payload
export async function sendCommandWithPayload(eventName, payload) {
  if (!socket?.connected) {
    console.warn("⚠️ Socket not connected");
    return;
  }

  return new Promise((resolve) => {
    console.log(`🚀 Sending ${eventName} with payload:`, payload);
    socket.emit(eventName, payload);
    socket.once(`${eventName}_response`, (data) => {
      console.log(`📩 Response for ${eventName}:`, data);
      resolve(data);
    });
  });
}

// ✅ Initial connection
reconnectSocket();

export { socket };
