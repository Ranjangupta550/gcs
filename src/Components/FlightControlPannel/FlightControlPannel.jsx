import React, { useState, useEffect } from "react";
import connectionStatus from "../../Global/connectionStatus"; // ✅ Import Global Store
import ControlButton from "../Common/ControlButton";
import { 
  armDrone, 
  disarmDrone, 
  controlThrottle, 
  controlYaw, 
  controlHeight, 
  controlRoll, 
  controlPitch, 
  controlLand,
  controlSetAlt,
} from "../../api/droneapi.js";

function FlightControlPannel() {
  const [isArmed, setIsArmed] = useState(false);
  const isConnected = connectionStatus((state) => state.isConnected); // ✅ Global State

  const handleArm = async () => {
    if (!isConnected) return;
    try {
      const response = await armDrone();
      console.log("Arm response2: ", response);
      if (response === true) setIsArmed(true);
    } catch (error) {
      console.error("Error while arming:", error);
    }
  };

  const handleDisarm = async () => {
    if (!isConnected) return;
    try {
      const response = await disarmDrone();
      if (response) setIsArmed(false);
    } catch (error) {
      console.error("Error while disarming:", error);
    }
  };

  const handleControl = async (actionType, action) => {
    if (!isConnected || !isArmed) return;

    let controlFunction;
    switch (actionType) {
      case "throttle":
        controlFunction = controlThrottle;
        break;
      case "yaw":
        controlFunction = controlYaw;
        break;
      case "height":
        controlFunction = controlHeight;
        break;
      case "roll":
        controlFunction = controlRoll;
        break;
      case "pitch":
        controlFunction = controlPitch;
        break;
      case "land":
        controlFunction = controlLand;
        break;
      case "setAlt":
        console.log("Setting altitude");
        controlFunction = controlSetAlt;
        break;
      default:
        console.error("Invalid control action");
        return;
    }

    try {
      const response = await controlFunction(action);
      if (!response.success) {
        console.error(`${actionType} control failed:`, response.error);
      }
    } catch (error) {
      console.error(`Error controlling ${actionType}:`, error);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isConnected || !isArmed) return;

      switch (event.key.toLowerCase()) {
        case "p":
          isArmed ? handleDisarm() : handleArm();
          break;
        case "w":
          handleControl("throttle", "up");
          break;
        case "s":
          handleControl("throttle", "down");
          break;
        case "a":
          handleControl("yaw", "anticlock");
          break;
        case "d":
          handleControl("yaw", "clock");
          break;
        case "h":
          handleControl("land", "land");
          break;
        case "l":
          handleControl("setAlt", "setalt");
          break;
        case "arrowleft":
          handleControl("roll", "left");
          break;
        case "arrowright":
          handleControl("roll", "right");
          break;
        case "arrowup":
          handleControl("pitch", "forward");
          break;
        case "arrowdown":
          handleControl("pitch", "backward");
          break;
        default:
          console.log("Key not mapped:", event.key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isConnected, isArmed]);

  return (
    <div className="flex items-center pl-2 pr-2 h-full w-full flex-col border-4 border-opacity-15 border-white rounded-md bg-navbar bg-opacity-50">
      <div className="flex w-full h-12 justify-between items-center p-1 mt-1 border-b-4 border-opacity-20 border-white rounded-sm">
        <h2 className="text-lg font-bold text-white">Flight Control Panel</h2>
        <div className="overflow-hidden w-28 flex items-center justify-center h-full">
          <ControlButton
            label={isArmed ? "Disarm" : "Arm"}
            command="ARM"
            sendCommand={isArmed ? handleDisarm : handleArm}
            isEnabled={isConnected}
            shortcut="P"
          />
        </div>
      </div>

      <div className="flex w-full h-full flex-col">

        {/* Throttle Controls */}
        <div className="flex justify-evenly h-14">
          <ControlButton label="Throttle +" command="THROTTLE_UP" sendCommand={() => handleControl("throttle", "up")} isEnabled={isConnected && isArmed} shortcut="W" />
          <ControlButton label="Throttle -" command="THROTTLE_DOWN" sendCommand={() => handleControl("throttle", "down")} isEnabled={isConnected && isArmed} shortcut="S" />
        </div>

        {/* Yaw Controls */}
        <div className="flex justify-evenly h-14">
          <ControlButton label="Yaw Left" command="YAW_LEFT" sendCommand={() => handleControl("yaw", "left")} isEnabled={isConnected && isArmed} shortcut="A" />
          <ControlButton label="Yaw Right" command="YAW_RIGHT" sendCommand={() => handleControl("yaw", "right")} isEnabled={isConnected && isArmed} shortcut="D" />
        </div>

        {/* Roll Controls */}
        <div className="flex justify-evenly h-14">
          <ControlButton label="Roll Left" command="ROLL_LEFT" sendCommand={() => handleControl("roll", "left")} isEnabled={isConnected && isArmed} shortcut="←" />
          <ControlButton label="Roll Right" command="ROLL_RIGHT" sendCommand={() => handleControl("roll", "right")} isEnabled={isConnected && isArmed} shortcut="→" />
        </div>

        {/* Pitch Controls */}
        <div className="flex justify-evenly h-14">
          <ControlButton label="Pitch Up" command="PITCH_UP" sendCommand={() => handleControl("pitch", "up")} isEnabled={isConnected && isArmed} shortcut="↑" />
          <ControlButton label="Pitch Down" command="PITCH_DOWN" sendCommand={() => handleControl("pitch", "down")} isEnabled={isConnected && isArmed} shortcut="↓" />
        </div>

        {/* Land & SetAlt Controls */}
        <div className="flex justify-evenly h-14">
          <ControlButton label="Land" command="LAND" sendCommand={() => handleControl("land", "land")} isEnabled={isConnected && isArmed} shortcut="L" />
          <ControlButton label="Set Alt" command="SET_ALT" sendCommand={() => handleControl("setAlt", "setalt")} isEnabled={isConnected && isArmed} shortcut="F" />
        </div>

      </div>
    </div>
  );
}

export default FlightControlPannel;
