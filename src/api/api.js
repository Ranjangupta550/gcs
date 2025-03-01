// import io from "socket.io-client";
// import { ColorRing } from "react-loader-spinner";

// // import {endPoint} from './api';
// // const endPoint = "http://192.168.29.11:5000/api/";
// // const endPoint = "http://192.168.105.92:5000/api/";

// const endPoint = "http://192.168.29.13:5000/api/";
// let droneConnectionStatus = false;

// export const isDroneConnected = () => droneConnectionStatus;

// export const connectDrone = async () => {
//   try {
//     const response = await fetch(`${endPoint}connection`, { method: "POST" });
//     console.log(response);
//     const data = await response.json();
//     console.log(data);
//     if (data.message === true) {
//       droneConnectionStatus = true;
//       return { success: true };
//     } else {
//       return { success: false };
//     }
//   } catch (error) {
//     console.error("Error connecting drone:", error);
//     return { success: false, error };
//   }
// };

// export const disconnectDrone = async () => {
//   try {
//     const response = await fetch(`${endPoint}disconnection`, {
//       method: "POST",
//     });
//     console.log("disconnect = ", response);
//     const data = await response.json();
//     console.log(data);
//     if (data.message === true) {
//       droneConnectionStatus = false;
//       return { success: true };
//     } else {
//       return { success: false };
//     }
//   } catch (error) {
//     console.error("Error disconnecting drone:", error);
//     return { success: false, error };
//   }
// };

// export const armDrone = async () => {
//   try {
//     const response = await fetch(`${endPoint}arm`, { method: "POST" });
//     console.log(response);
//     return await response.json();
//   } catch (error) {
//     console.error("Error arming drone:", error);
//     return { success: false, error };
//   }
// };

// export const disarmDrone = async () => {
//   try {
//     const response = await fetch(`${endPoint}disarm`, { method: "POST" });
//     return await response.json();
//   } catch (error) {
//     console.error("Error disarming drone:", error);
//     return { success: false, error };
//   }
// };

// // ✅ Throttle Control
// export const controlThrottle = async (direction) => {
//   try {
//     const response = await fetch(`${endPoint}throttle${direction}`, {
//       method: "POST",
//     });
//     console.log(response);
//     return await response.json();
//   } catch (error) {
//     console.error("Error controlling throttle:", error);
//     return { success: false, error };
//   }
// };

// // ✅ Yaw Control
// export const controlYaw = async (direction) => {
//   try {
//     const response = await fetch(`${endPoint}yaw${direction}`, {
//       method: "POST",
//     });
//     return await response.json();
//   } catch (error) {
//     console.error("Error controlling yaw:", error);
//     return { success: false, error };
//   }
// };

// // ✅ Height Control
// export const controlHeight = async (direction) => {
//   try {
//     const response = await fetch(`${endPoint}height${direction}`, {
//       method: "POST",
//     });
//     return await response.json();
//   } catch (error) {
//     console.error("Error controlling height:", error);
//     return { success: false, error };
//   }
// };

// // ✅ Roll Control
// export const controlRoll = async (direction) => {
//   try {
//     const response = await fetch(`${endPoint}roll${direction}`, {
//       method: "POST",
//     });
//     return await response.json();
//   } catch (error) {
//     console.error("Error controlling roll:", error);
//     return { success: false, error };
//   }
// };

// // ✅ Pitch Control
// export const controlPitch = async (direction) => {
//   try {
//     const response = await fetch(`${endPoint}pitch${direction}`, {
//       method: "POST",
//     });
//     return await response.json();
//   } catch (error) {
//     console.error("Error controlling pitch:", error);
//     return { success: false, error };
//   }
// };
// export const controlLand= async (direction) => {
//   console.log("inside controlLand ",direction);
//   try {
//     const response = await fetch(`${endPoint}land`, {
//       method: "POST",
//     });
//     console.log("control land ",response);
//     return await response.json();
//   } catch (error) {
//     console.error("Error returning Home:", error);
//     return { success: false, error };
//   }
// };
// export const controlSetAlt = async (direction) => {
//   console.log("inside controlSetAlt ",direction);
//   try {
//     const response = await fetch(`${endPoint}setalt`, {
//       method: "POST",
//     });
//     console.log("control setAlt ",response);
//     return await response.json();
//   } catch (error) {
//     console.error("Error setting altitude:", error);
//     return { success: false, error };
//   }
// };
// export const getTelemetry = async () => {
//   try {
//     const response = await fetch(`${endPoint}telemetry`, {
//       method: "GET",
//     });

//     const data = await response.json();
//     console.log("Telemetry: ", data);
//     console.log("Telemetry data: ", data.message);

//     if (data.message != null) {
//       console.log("inside this if block");
//       return data.message; // Assuming telemetry data is in data.telemetry
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching telemetry data:", error);
//     return null;
//   }
// };


// export const getFlightMode = async () => {
//   try {
//     const response = await fetch(`${endPoint}flightmode`, {
//       method: "GET",
//     });

//     const data = await response.json();
//     console.log("Flight Mode: ", data);
//     console.log("Flight Mode data: ", data.message);

//     if (data.message != null) {
//       console.log("inside this if block");
//       return data.message; // Assuming telemetry data is in data.telemetry
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching Flight Mode data:", error);
//     return null;
//   }
// };





// const socket = io("http://192.168.29.13:5000"); // Replace with your Flask WebSocket URL

// // When connected
// socket.on("handshake", () => {
//     console.log("✅ Connected to WebSocket server");

//     // Emit an event to Flask
//     socket.emit("arm");
//     console.log("🚀 Sent 'arm' event");
// });

// // Listen for response
// socket.on("arm_response", (data) => {
//     console.log("📩 Received response:", data);
// });

// // Function to trigger an event manually
// function triggerEvent(eventName) {
//     socket.emit(eventName);
//     console.log(`🚀 Triggered '${eventName}' event`);
// }

// triggerEvent("handshake");
// import { io } from "socket.io-client";

// // 🌐 Connect to the WebSocket server
// const SOCKET_SERVER_URL = "http://192.168.29.11:5000"; // Update with your actual server IP
// const socket = io(SOCKET_SERVER_URL);

// // ✅ Handle connection
// socket.on("connect", () => {
//     console.log("✅ Connected to WebSocket server");
// });

// // ❌ Handle disconnection
// socket.on("disconnect", () => {
//     console.log("❌ Disconnected from WebSocket server");
// });

// // 📢 Generic function to send commands and wait for a response
// export const sendCommand = async (eventName, payload = {}) => {
//     return new Promise((resolve) => {
//         console.log(`🚀 Sending event: ${eventName}`, payload);

//         // Emit event to server
//         socket.emit(eventName, payload);

//         // Listen for the response
//         socket.on(`${eventName}_response`, (data) => {
//             console.log(`📩 Server Response for ${eventName}:`, data.message);
//             resolve(data);
//         });
//     });
// };

// export { socket }; // Exporting socket instance for use in other modules


// 🌐 Connect to the WebSocket server
// const SOCKET_SERVER_URL = "http://192.168.29.11:5000"; // Update with your actual server IP

// const socket = io("http://192.168.29.14:5000");
import { io } from "socket.io-client";
// const socket = io("http://localhost:5000");
const socket=io("http://192.168.29.42:5000");
// const COMMAND_SERVER_URL = "http://localhost:5000";
// const TELEMETRY_SERVER_URL = "http://localhost:5001";

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


// 📢 Generic function to send commands and wait for a response
export const sendCommand = async (eventName) => {
    return new Promise((resolve) => {
        console.log(`🚀 Sending event: ${eventName}`);

        // Emit event to server
        socket.emit(eventName);

        // Listen for the response
        socket.on(`${eventName}_response`, (data) => {
            console.log(`📩 Server Response for ${eventName}:`, data.message);
            resolve(data);
        });
    });
};
ServerConnection();

export { socket }; // Exporting socket instance for use in other modules
