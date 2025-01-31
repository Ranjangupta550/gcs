import React, { useState } from "react";
import ControlButton from "../../Components/DroneControlButton/ControlButton";
import { connectDrone, disconnectDrone, armDrone, disarmDrone, controlThrottle, controlYaw } from "./api";

function ControlPanel() {
  const [isConnected, setIsConnected] = useState(false);
  const [isArmed, setIsArmed] = useState(false);

  // Handle connect
  const handleConnect = async () => {
    try {
      const response = await connectDrone();
      // console.log('Connect response:', response); // Debugging log

      if (response.success == true) {
        // When successful, update the connection state to true
        // console.log("Drone connected successfully!");
        // console.log("Drone status:", response.data.status, "    -    "  , response.data);
        setIsConnected(true);
      } else {
        console.error("Connection failed:", response.error);
      }
    } catch (error) {
      console.error("Error while connecting:", error);
    }
  };

  // Handle disconnect
  const handleDisconnect = async () => {
    try {
      const response = await disconnectDrone();
      console.log('Disconnect response:', response); // Debugging log

      if (response.success && response.status === "disconnected") {
        setIsConnected(false);  // Reset connection state
        setIsArmed(false);  // Optionally reset armed state when disconnected
      } else {
        console.error("Disconnection failed:", response.error);
      }
    } catch (error) {
      console.error("Error while disconnecting:", error);
    }
  };

  // Handle arm
  const handleArm = async () => {
    try {
      const response = await armDrone();
      console.log('Arm response:', response); // Debugging log

      if (response.success && response.status === "armed") {
        setIsArmed(true);
      } else {
        console.error("Failed to arm:", response.error);
      }
    } catch (error) {
      console.error("Error while arming:", error);
    }
  };

  // Handle disarm
  const handleDisarm = async () => {
    try {
      const response = await disarmDrone();
      console.log('Disarm response:', response); // Debugging log

      if (response.success && response.status === "disarmed") {
        setIsArmed(false);
      } else {
        console.error("Failed to disarm:", response.error);
      }
    } catch (error) {
      console.error("Error while disarming:", error);
    }
  };

  // Handle throttle
  const handleThrottle = async (action) => {
    try {
      const response = await controlThrottle(action);
      console.log('Throttle response:', response); // Debugging log

      if (!response.success) {
        console.error("Throttle control failed:", response.error);
      }
    } catch (error) {
      console.error("Error with throttle control:", error);
    }
  };

  // Handle yaw
  const handleYaw = async (action) => {
    try {
      const response = await controlYaw(action);
      console.log('Yaw response:', response); // Debugging log

      if (!response.success) {
        console.error("Yaw control failed:", response.error);
      }
    } catch (error) {
      console.error("Error with yaw control:", error);
    }
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
