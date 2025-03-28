// import { create } from "zustand";
// import { sendCommand, socket } from "../api/api"; // ✅ Import reusable function
// import { useState } from "react";
// import { useTelemetryStore}  from "./telemetryStore.js"; // ✅ Import telemetry store
// import { monotring } from "../api/droneapi.js";
// const connectionStatus = create((set) => ({
//     isConnected: false, // ✅ Initial status


//     // ✅ Connect Drone
//     connect: async () => {
//         try {
//             const response = await sendCommand("connection");
//             if (response.message) {
//                 set({ isConnected: true }); // ✅ Connection successful to state update
//                 console.log("Connected");

//                 console.log("isConnected", connectionStatus.getState().isConnected);
//                 setTimeout(() => {
//                     useTelemetryStore.getState().startTelemetry();
//                 }, 3000);
               
//             }
//             return response;
//         } catch (error) {
//             console.error("Error connecting drone:", error);
//             return { message: false, error };
//         }
//     },

//     // ✅ Disconnect Drone
//     disconnect: async () => {
//         try {
//             const response = await sendCommand("disconnection");
//             if (response.message) {
                
//                 useTelemetryStore.getState().stopTelemetry();
//                 set({ isConnected: false });
//               // ✅ Disconnection successful to state update
//             }
//             return response.message;
//         } catch (error) {
//             console.error("Error disconnecting drone:", error);
//             return { message: false, error };
//         }
//     },
//     // ✅ Get Connection Status
//     isDroneConnected: () => {
//         console.log("isConnected", connectionStatus.getState().isConnected);
//         return connectionStatus.getState().isConnected;
//     },

// }));

// export default connectionStatus;

// // socket.on("disconnection", () => {
// //     console.log("Drone Disconnected Unexpectedly!");
// //     useTelemetryStore.getState().stopTelemetry();
// //     connectionStatus.setState({ isConnected: false });
// // });
import { create } from "zustand";
import { sendCommand } from "../api/api";
import { useTelemetryStore } from "./telemetryStore.js";
import { monitoring } from "../api/droneapi.js";

const connectionStatus = create((set) => ({
    isConnected: false,

    // Connect Drone
    connect: async () => {
        try {
            const response = await sendCommand("connection");
            if (response.message) {
                set({ isConnected: true });
                console.log("Connected");

                // Start telemetry
                setTimeout(() => {
                    useTelemetryStore.getState().startTelemetry();
                }, 3000);

                // Start monitoring only when successfully connected
                // setTimeout(() => {
                //     connectionStatus.getState().monitor();
                // }, 5000);
            }
            return response;
        } catch (error) {
            console.error("Error connecting drone:", error);
            return { message: false, error };
        }
    },

    // Disconnect Drone
    disconnect: async () => {
        try {
            const response = await sendCommand("disconnection");
            if (response.message) {
               setTimeout(() => {
                useTelemetryStore.getState().stopTelemetry();
                }
                , 3000);
                set({ isConnected: false });
            }
            return response.message;
        } catch (error) {
            console.error("Error disconnecting drone:", error);
            return { message: false, error };
        }
    },

    // Monitor Drone Status
    monitor: async () => {
        try {
            const response = await monitoring();
            console.log("Monitoring response:", response);
            if (response === true) {
                set({ isConnected: false });
                setTimeout(() => {
                    useTelemetryStore.getState().stopTelemetry();
                }
                , 3000);
            }
            return response;
        } catch (error) {
            console.error("Error during monitoring:", error);
            return { message: false, error };
        }
    },

    // Get Connection Status
    isDroneConnected: () => {
        return connectionStatus.getState().isConnected;
    },
}));

export default connectionStatus;
