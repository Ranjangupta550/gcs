import React, { useEffect } from "react";
import connectionStatus from "../../Global/connectionStatus";
import ControlButton from "../utils/ControlButton.jsx";
import { armStatus } from "../../Global/armStatus.js";
import Text from "./Text"

import {
  controlThrottle,
  controlYaw,
  controlHeight,
  controlRoll,
  controlPitch,
  controlLand,
  controlSetAlt,
  sendAltitude,
} from "../../api/droneapi.js";

function FlightControlPannel() {
  const isConnected = connectionStatus((state) => state.isConnected);
  const isArmed = armStatus((state) => state.isArmed);
  const handleArm = armStatus((state) => state.handleArm);
  const handleDisarm = armStatus((state) => state.handleDisarm);

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
        controlFunction = controlSetAlt;
        break;
      case "Altitide":
        controlFunction = sendAltitude;
        break;
      default:
        console.error("Invalid control action");
        return;
    }

    try {
      const response = await controlFunction(action);
      if (!response || response.error) {
        console.error(`${actionType} control failed:`, response?.error || "Unknown error");
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
          handleControl("yaw", "left");
          break;
        case "d":
          handleControl("yaw", "right");
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
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isConnected, isArmed]);

  return (
    <div className="relative grid grid-rows-3 grid-cols-5  items-center pl-2 pr-2 h-full w-full  border-4 border-opacity-15 border-white rounded-md bg-navbar bg-opacity-50">

     
          <ControlButton
            label={isArmed ? "Disarm" : "Arm"}
            command="ARM"
            sendCommand={isArmed ? handleDisarm : handleArm}
            isEnabled={isConnected}
            shortcut="P"
          />
      {/* ✅ All Flight Controls (always visible) */}
    
        {/* Throttle */}
     
          <ControlButton label="Throttle +" command="THROTTLE_UP" sendCommand={() => handleControl("throttle", "up")} isEnabled={isConnected && isArmed} shortcut="W" />
          <ControlButton label="Throttle -" command="THROTTLE_DOWN" sendCommand={() => handleControl("throttle", "down")} isEnabled={isConnected && isArmed} shortcut="S" />
        

        {/* Yaw */}

          <ControlButton label="Yaw Left" command="YAW_LEFT" sendCommand={() => handleControl("yaw", "left")} isEnabled={isConnected && isArmed} shortcut="A" />
          <ControlButton label="Yaw Right" command="YAW_RIGHT" sendCommand={() => handleControl("yaw", "right")} isEnabled={isConnected && isArmed} shortcut="D" />
       

        {/* Roll */}

          <ControlButton label="Roll Left" command="ROLL_LEFT" sendCommand={() => handleControl("roll", "left")} isEnabled={isConnected && isArmed} shortcut="←" />
          <ControlButton label="Roll Right" command="ROLL_RIGHT" sendCommand={() => handleControl("roll", "right")} isEnabled={isConnected && isArmed} shortcut="→" />
      

        {/* Pitch */}
  
          <ControlButton label="Pitch Up" command="PITCH_UP" sendCommand={() => handleControl("pitch", "forward")} isEnabled={isConnected && isArmed} shortcut="↑" />
          <ControlButton label="Pitch Down" command="PITCH_DOWN" sendCommand={() => handleControl("pitch", "backward")} isEnabled={isConnected && isArmed} shortcut="↓" />
     

        {/* Landing + Set Altitude */}
 
          <ControlButton label="Land" command="LAND" sendCommand={() => handleControl("land", "land")} isEnabled={isConnected && isArmed} shortcut="H" />
          <ControlButton label="Auto Takeoff" command="SET_ALT" sendCommand={() => handleControl("setAlt", "setalt")} isEnabled={isConnected && isArmed} shortcut="L" />
     
        {/* <ControlButton label="Altitude" command="Altitide" sendCommand={() => handleControl("Altitide", "2")} isEnabled={isConnected && isArmed} shortcut="T" /> */}

         

    </div>
  );
}

export default FlightControlPannel;
