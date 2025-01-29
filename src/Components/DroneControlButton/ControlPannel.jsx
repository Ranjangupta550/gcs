import React, { useState } from "react";
import ControlButton from "../../Components/DroneControlButton/ControlButton"; 

function ControlPanel() {
    const [isConnected, setIsConnected] = useState(false);
    const [isArmed, setIsArmed] = useState(false);

    const handleConnect = async () => {
        const response = await fetch("http://localhost:5000/api/connect", {
            method: "POST",
        });
        const data = await response.json();
        if (data.status === "connected") {
            setIsConnected(true);
        }
    };

    const handleDisconnect = async () => {
        const response = await fetch("http://localhost:5000/api/disconnect", {
            method: "POST",
        });
        const data = await response.json();
        if (data.status === "disconnected") {
            setIsConnected(false);
            setIsArmed(false); // Automatically disarm when disconnected
        }
    };

    const handleArm = async () => {
        const response = await fetch("http://localhost:5000/api/arm", {
            method: "POST",
        });
        const data = await response.json();
        if (data.status === "armed") {
            setIsArmed(true);
        }
    };

    const handleDisarm = async () => {
        const response = await fetch("http://localhost:5000/api/disarm", {
            method: "POST",
        });
        const data = await response.json();
        if (data.status === "disarmed") {
            setIsArmed(false);
        }
    };

    const handleThrottle = async (action) => {
        const response = await fetch("http://localhost:5000/api/throttle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ action }),
        });
        const data = await response.json();
        console.log(data.status);
    };

    const handleYaw = async (action) => {
        const response = await fetch("http://localhost:5000/api/yaw", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ action }),
        });
        const data = await response.json();
        console.log(data.status);
    };

    return (
        <div className="flex flex-col items-center p-4 border h-full w-full">
            <h2 className="text-lg font-bold text-white">Drone Controls</h2>

            {/* Connect/Disconnect Button */}
            <ControlButton
                label={isConnected ? "Disconnect" : "Connect"}
                command="CONNECT"
                sendCommand={isConnected ? handleDisconnect : handleConnect}
                isEnabled={true} // Always enabled
                isConnectionButton={true}
                shortcut="C"
            />

            {/* Arm/Disarm Toggle Button */}
            <ControlButton
                label={isArmed ? "Disarm" : "Arm"}
                command="ARM"
                sendCommand={isArmed ? handleDisarm : handleArm}
                isEnabled={isConnected} // Only works when connected
                shortcut="A"
            />

            {/* Throttle Controls (Only enabled if Armed) */}
            <div className="flex">
                <ControlButton
                    label="Throttle +"
                    command="THROTTLE_UP"
                    sendCommand={() => handleThrottle("up")}
                    isEnabled={isConnected && isArmed}
                    shortcut="↑"
                />
                <ControlButton
                    label="Throttle -"
                    command="THROTTLE_DOWN"
                    sendCommand={() => handleThrottle("down")}
                    isEnabled={isConnected && isArmed}
                    shortcut="↓"
                />
            </div>

            {/* Yaw Controls (Only enabled if Armed) */}
            <div className="flex">
                <ControlButton
                    label="Yaw Left"
                    command="YAW_LEFT"
                    sendCommand={() => handleYaw("left")}
                    isEnabled={isConnected && isArmed}
                    shortcut="←"
                />
                <ControlButton
                    label="Yaw Right"
                    command="YAW_RIGHT"
                    sendCommand={() => handleYaw("right")}
                    isEnabled={isConnected && isArmed}
                    shortcut="→"
                />
            </div>
        </div>
    );
}

export default ControlPanel;
