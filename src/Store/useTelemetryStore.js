import { create } from "zustand";
import { sendCommand, socket } from "../services/api";

 const useTelemetryStore = create((set, get) => ({
    telemetry: null, // ✅ Store in Zustand state
    setTelemetry: (telemetry) => {
        set({ telemetry });
    },
    getTelemetry: () => get().telemetry, // ✅ Use Zustand state
}));

export default useTelemetryStore;

