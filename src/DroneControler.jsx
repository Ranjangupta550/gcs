import { useState, useEffect } from "react";

function useDroneController() {
    const [isConnected, setIsConnected] = useState(false);
    const [isArmed, setIsArmed] = useState(false);
    const [status, setStatus] = useState("Disconnected");

    // Function to send commands
    const sendCommand = (command) => {
        if (!isConnected && command !== "CONNECT") {
            console.warn("Drone not connected!");
            return;
        }

        console.log(`📡 Sending command: ${command}`);

        if (command === "CONNECT") {
            setIsConnected(true);
            setStatus("Connected");
            console.log("✅ Drone Connected");
        } else if (command === "DISCONNECT") {
            setIsConnected(false);
            setStatus("Disconnected");
            setIsArmed(false); // Auto disarm on disconnect
            console.log("❌ Drone Disconnected");
        } else if (command === "ARM") {
            setIsArmed(true);
            console.log("🔵 Drone Armed");
        } else if (command === "DISARM") {
            setIsArmed(false);
            console.log("🟠 Drone Disarmed");
        } else {
            console.log(`🎮 Executing: ${command}`);
        }
    };

    // Function to toggle connection
    const toggleConnection = () => {
        sendCommand(isConnected ? "DISCONNECT" : "CONNECT");
    };

    // Function to toggle Arm/Disarm
    const toggleArmDisarm = () => {
        if (isConnected) {
            sendCommand(isArmed ? "DISARM" : "ARM");
        } else {
            console.warn("❌ Cannot arm! Drone is disconnected.");
        }
    };

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (event) => {
            const keyMap = {
                "c": () => toggleConnection(),
                "a": () => toggleArmDisarm(),
                "ArrowUp": () => sendCommand("THROTTLE_UP"),
                "ArrowDown": () => sendCommand("THROTTLE_DOWN"),
                "ArrowLeft": () => sendCommand("YAW_LEFT"),
                "ArrowRight": () => sendCommand("YAW_RIGHT"),
            };

            if (keyMap[event.key]) {
                keyMap[event.key]();
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [isConnected, isArmed]); // Dependencies updated for correct state tracking

    return { isConnected, isArmed, status, sendCommand, toggleConnection, toggleArmDisarm };
}

export default useDroneController;
