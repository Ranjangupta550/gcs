import { create } from "zustand";
import { sendCommand, socket } from "../api/api";

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
            // console.log("📡 Telemetry update:", data);
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
