import { create } from "zustand";
import { sendCommand, socket } from "../api/api";

// const useTelemetryStore = create((set, get) => {
//     let telemetry = null; // 🌍 Global variable to store telemetry data

//     return {
//         isListening: false,
//         error: null,

//         startTelemetry: () => {
//             if (get().isListening) {
//                 console.log("📡 Telemetry already active!");
//                 return;
//             }



//             console.log("📡 Starting telemetry stream...");
//             set({ isListening: true, error: null });

//             // ✅ Send request via reusable function
//             socket.emit("telemetry");

//             // ✅ Remove previous listeners to avoid duplication
//             socket.off("telemetry_response");

//             // ✅ Listen for telemetry updates
//             socket.on("telemetry_response", (data) => {
//                 console.log("📡 Telemetry update:", data);
//                 telemetry = data; // ✅ Store latest telemetry data
//             });

//             // ✅ Handle errors
//             socket.on("error", (err) => {
//                 console.error("📡 Telemetry error:", err);
//                 set({ error: err.message, isListening: false });
//             });
//         },

//         stopTelemetry: () => {
//             console.log("🛑 Stopping telemetry...");
//             set({ isListening: false, error: null });
//             telemetry = null; // ✅ Reset telemetry data
//             socket.off("telemetry_response"); // ✅ Stop listening
//         },

//         getTelemetry: () => telemetry, // ✅ Return latest telemetry data
//     };
// });

// export { useTelemetryStore };

const useTelemetryStore = create((set, get) => ({
    telemetry: null, // ✅ Store in Zustand state

    startTelemetry: () => {
        if (get().isListening) {
            console.log("📡 Telemetry already active!");
            return;
        }

        console.log("📡 Starting telemetry stream...");
        set({ isListening: true });

        socket.emit("telemetry");
        socket.off("telemetry_response"); // Remove old listener
        
        socket.on("telemetry_response", (data) => {
            console.log("📡 Telemetry update:", data);
            set({ telemetry: data }); // ✅ Zustand will trigger re-renders
        });

        socket.on("error", (err) => {
            console.error("📡 Telemetry error:", err);
            set({ error: err.message, isListening: false });
        });
    },

    stopTelemetry: () => {
        console.log("🛑 Stopping telemetry...");
        set({ isListening: false, telemetry: null });
        // socket.off("telemetry_response");
    },

    getTelemetry: () => get().telemetry, // ✅ Use Zustand state
}));

export   {useTelemetryStore};
