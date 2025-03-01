import { create } from "zustand";
import { socket,sendCommand } from "../api/api";

const useTelemetryStore = create((set, get) => {
    let telemetry = null; // 🌍 Global variable (no need to store in Zustand state)

    return {
        isListening: false,
        error: null,

        startTelemetry: () => {
            if (get().isListening) {
                console.log("📡 Telemetry already active!");
                return;
            }

            console.log("📡 Starting telemetry stream...");
            set({ isListening: true, error: null });

            // socket.emit("telemetry");
            sendCommand("telemetry"); // ✅ Reuse sendCommand function

            
            // Remove previous listeners
            socket.on("telemetry_response", (data) => {
                console.log("📡 Telemetry update:", data);
                telemetry = data; // ✅ Update global variable
                set({}); // ✅ Trigger Zustand update without storing telemetry in state
            });

            socket.on("error", (err) => {
                console.error("📡 Telemetry error:", err);
                set({ error: err.message, isListening: false });
            });
        },

        stopTelemetry: () => {
            console.log("🛑 Stopping telemetry...");
            set({ isListening: false, error: null });
            telemetry = null; // ✅ Reset global telemetry
            socket.off("telemetry_response");
        },

        getTelemetry: () =>{
             return telemetry
        }  // ✅ Always return latest telemetry
    };
});

export default useTelemetryStore;
