import React, { useState } from "react";
import ControlButton from "../Common/ControlButton";
import { connectDrone, disconnectDrone, armDrone, disarmDrone, controlThrottle, controlYaw, controlHeight, controlRoll, controlPitch } from "../../api/droneapi.js";

function FlightControlPannel() {
  const [isConnected, setIsConnected] = useState(false);
  const [isArmed, setIsArmed] = useState(false);

  // Handle connect
  const handleConnect = async () => {
    try {
      const response = await connectDrone();
      if (response.success == true) {
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
      if (response.success && response.status === "disconnected") {
        setIsConnected(false);
        setIsArmed(false);
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
      if (!response.success) {
        console.error("Yaw control failed:", response.error);
      }
    } catch (error) {
      console.error("Error with yaw control:", error);
    }
  };

  // Handle height
  const handleHeight = async (action) => {
    try {
      const response = await controlHeight(action);
      if (!response.success) {
        console.error("Height control failed:", response.error);
      }
    } catch (error) {
      console.error("Error with height control:", error);
    }
  };

  // Handle roll
  const handleRoll = async (action) => {
    try {
      const response = await controlRoll(action);
      if (!response.success) {
        console.error("Roll control failed:", response.error);
      }
    } catch (error) {
      console.error("Error with roll control:", error);
    }
  };

  // Handle pitch
  const handlePitch = async (action) => {
    try {
      const response = await controlPitch(action);
      if (!response.success) {
        console.error("Pitch control failed:", response.error);
      }
    } catch (error) {
      console.error("Error with pitch control:", error);
    }
  };

  return (
    <div className="flex  items-center pl-2 pr-2  h-full w-full flex-col border-4 border-opacity-15 border-white rounded-md bg-navbar bg-opacity-50">
      <div className="flex   w-full h-12 justify-between items-center p-1  mt-1 border-b-4 border-opacity-20 border-white rounded-sm"> 
      <h2 className="text-lg font-bold text-white">Flight Control Pannel</h2>
      <div className=" overflow-hidden w-28 flex items-center justify-center h-full">
      <ControlButton
        label={isArmed ? "Disarm" : "Arm"}
        command="ARM"
        sendCommand={isArmed ? handleDisarm : handleArm}
        isEnabled={isConnected}
        shortcut="A"
      />
      </div>
      </div>
    
      
    <div className="flex w-full h-full  flex-col">

      {/* Arm/Disarm Toggle Button */}
      

      {/* Throttle Controls (Only enabled if Armed) */}
        <div className="flex  justify-evenly h-14">
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
      <div className="flex  justify-evenly h-14">
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

      {/* Height Controls (Only enabled if Armed) */}
      <div className="flex   justify-evenly h-14">
      <ControlButton
        label="Height +"
        command="HEIGHT_UP"
        sendCommand={() => handleHeight("up")}
        isEnabled={isConnected && isArmed}
        shortcut="H"
      />
      <ControlButton
        label="Height -"
        command="HEIGHT_DOWN"
        sendCommand={() => handleHeight("down")}
        isEnabled={isConnected && isArmed}
        shortcut="L"
      />
      </div>

      {/* Roll Controls (Only enabled if Armed) */}
      <div className="flex  justify-evenly h-14">
        <ControlButton
          label="Roll Left"
          command="ROLL_LEFT"
          sendCommand={() => handleRoll("left")}
          isEnabled={isConnected && isArmed}
          shortcut="Q"
        />
        <ControlButton
          label="Roll Right"
          command="ROLL_RIGHT"
          sendCommand={() => handleRoll("right")}
          isEnabled={isConnected && isArmed}
          shortcut="E"
        />
      </div>

      {/* Pitch Controls (Only enabled if Armed) */}
      <div className="flex  justify-evenly h-14">
        <ControlButton
          label="Pitch Up"
          command="PITCH_UP"
          sendCommand={() => handlePitch("up")}
          isEnabled={isConnected && isArmed}
          shortcut="W"
        />
        <ControlButton
          label="Pitch Down"
          command="PITCH_DOWN"
          sendCommand={() => handlePitch("down")}
          isEnabled={isConnected && isArmed}
          shortcut="S"
        />
      </div>
      
      </div>
    </div>
  );
}

export default FlightControlPannel;
