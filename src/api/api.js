
import { io } from "socket.io-client";
// const socket = io("http://localhost:3000");
// const socket=io("http://192.168.29.42:5000");
const socket = io("http://192.168.29.231:5000");
// const COMMAND_SERVER_URL = "http://localhost:3000";
// const TELEMETRY_SERVER_URL = "http://localhost:";

// export const socket = io(COMMAND_SERVER_URL);
// export const telemetrySocket = io(TELEMETRY_SERVER_URL);

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


// // 📢 Generic function to send commands and wait for a response
// export const sendCommand = async (eventName) => {
//     return new Promise((resolve) => {
//         console.log(`🚀 Sending event: ${eventName}`);

//         // Emit event to server
//         socket.emit(eventName);

//         // Listen for the response
//         socket.on(`${eventName}_response`, (data) => {
//             console.log(`📩 Server Response for ${eventName}:`, data.message);
//             resolve(data);
//         });
//     });
// };
// ServerConnection();

// export { socket }; // Exporting socket instance for use in other modules
export const sendCommand = async (eventName) => {
    return new Promise((resolve, reject) => {
        console.log(`🚀 Sending event: ${eventName}`);

        // ✅ Remove any previous listeners to avoid duplication issues
        // socket.off(`${eventName}_response`);

        // Emit event to the server
        socket.emit(eventName);

        // ✅ Listen for the response with a one-time listener
        // console(`${eventName}_response`);
        socket.on(`${eventName}_response`, (data) => {
            console.log(`📩 Server Response for ${eventName}:`, data);
            resolve(data);
        });
        // ✅ Add a timeout to handle cases where no response is received
        // setTimeout(() => {
        //     reject(new Error(`❌ Timeout: No response received for ${eventName}`));
        // }, 10000); // Wait for 5 seconds before timing out
    });
};

ServerConnection();
export { socket }; 