
import { io } from "socket.io-client";
// const socket = io("http://localhost:3000");
// const socket=io("http://192.168.29.42:5000");
const socket = io("http://192.168.73.134:5000");



const ServerConnection = () => {
    // ✅ Handle connection
    socket.on("connect", () => {
        console.log("✅ Connected to WebSocket server");
    });

    // ❌ Handle disconnection
    socket.on("disconnect", () => {
        console.log("❌ Disconnected from WebSocket server");
    });
}
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