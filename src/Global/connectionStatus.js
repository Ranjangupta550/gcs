import { create } from "zustand";
import { sendCommand } from "../api/api";
import { useTelemetryStore } from "./telemetryStore.js";
import { monitoring } from "../api/droneapi.js";
import notify from "../Components/utils/Notification/notify.jsx"

const connectionStatus = create((set) => ({
    isConnected: false,

    // Connect Drone
    connect: async () => {
        try {
            const response = await sendCommand("connection");
            if (response.message) {
                set({ isConnected: true });
                console.log("Connected");
                // notify("Drone Connected", "success");
                setTimeout(() => {
                    useTelemetryStore.getState().startTelemetry();
                }, 3000);
            }
            return response;
        } catch (error) {
            console.error("Error connecting drone:", error);
            // notify("Drone Connection Failed", "error");
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
                // notify("Drone Disconnected", "success");
            }
            return response.message;
        } catch (error) {
            console.error("Error disconnecting drone:", error);
            // notify("Drone Disconnection Failed", "error");
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
