import { create } from "zustand";
import { sendCommand } from "../api/api"; // ✅ Import reusable function
import { useState } from "react";

const connectionStatus = create((set) => ({
    isConnected: false, // ✅ Initial status

    // ✅ Connect Drone
    connect: async () => {
        try {
            const response = await sendCommand("connection");
            if (response.message) {
                set({ isConnected: true }); // ✅ Connection successful to state update
            }
            return response;
        } catch (error) {
            console.error("Error connecting drone:", error);
            return { message: false, error };
        }
    },

    // ✅ Disconnect Drone
    disconnect: async () => {
        try {
            const response = await sendCommand("disconnection");
            if (response.message) {
                set({ isConnected: false }); // ✅ Disconnection successful to state update
            }
            return response;
        } catch (error) {
            console.error("Error disconnecting drone:", error);
            return { message: false, error };
        }
    },

    // ✅ Get Connection Status
    isDroneConnected: () => {
        return connectionStatus.getState().isConnected;
    },
}));

export default connectionStatus;
