import React, { useState, useEffect } from "react";
import connectionStatus from "../../Store/connectionStatus";
import ControlButton from "../UI/ControlButton.jsx";

import Text from "./Text";
import { Button, armStatus,AutoTakeoffModal } from "../../index.js";

import {
  controlThrottle,
  controlYaw,
  controlHeight,
  controlRoll,
  controlPitch,
  controlLand,
  controlSetAlt,
  sendAltitude,
  sendAutoTakeoff,
} from "../../services/emitHandler.js";
import { use } from "react";

function FlightControlPannel() {
  const isConnected = connectionStatus((state) => state.isConnected);
  const isArmed = armStatus((state) => state.isArmed);
  const handleArm = armStatus((state) => state.arm);
  const handleDisarm = armStatus((state) => state.disArm);
  4;
  const [Height, setAltHeight] = useState(true);
  // const [altitudeInput, setAltitudeInput] = useState("");


   const [showModal, setShowModal] = useState(false);
  const [autoTakeoffStarted, setAutoTakeoffStarted] = useState(false);

  const handleAutoTakeoff = async (altitude) => {
    try {
      await sendAutoTakeoff(altitude); // 👈 backend call
      setAutoTakeoffStarted(true);     // ✅ 
      setShowModal(false);             // Close modal
    } catch (err) {
      console.error("Takeoff failed:", err);
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
        console.error(
          `${actionType} control failed:`,
          response?.error || "Unknown error"
        );
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
    const keydownHandler = (event) => {
      if (/^[a-z]$/i.test(event.key)) {
        handleKeyPress(event);
      }
    };

    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [isConnected, isArmed]);

  return (
    <div className="relative border-2 h-full overflow-y-auto rounded-md border-borderColor flex flex-col w-full  ">
      <div className="w-full h-14 flex items-center justify-evenly border-b-2 border-borderColor ">
        <div>Drone Control</div>
        <ControlButton
          label={isArmed ? "Disarm" : "Arm"}
          command="ARM"
          sendCommand={isArmed ? handleDisarm : handleArm}
          isEnabled={isConnected}
          shortcut="P"
          className={{
            backgroundColor: isArmed ? "#FF9999" : "#22c55e", // red if armed, green if not
            color: "white",
            borderColor: "border-borderColor",
            hover: isArmed ? "hover:bg-[#FF6666]" : "hover:bg-[#16a34a]", // red hover if armed, green hover if not
            active: isArmed ? "active:bg-[#FF3333]" : "active:bg-[#15803d]", // red active if armed, green active if not
          }}
        />
      </div>

      {/* ✅ All Flight Controls (always visible) */}

      {/* Throttle */}

      <div className="w-full h-14 flex items-center justify-center ">
        <ControlButton
          label="Throttle +"
          command="THROTTLE_UP"
          sendCommand={() => handleControl("throttle", "up")}
          isEnabled={isConnected && isArmed}
          shortcut="W"
        />
        <div className="h-1 w-12  bg-borderColor"></div>
        <ControlButton
          label="Throttle -"
          command="THROTTLE_DOWN"
          sendCommand={() => handleControl("throttle", "down")}
          isEnabled={isConnected && isArmed}
          shortcut="S"
        />
      </div>

      {/* Yaw */}

      <div className="w-full h-14 flex items-center justify-center ">
        <ControlButton
          label="Yaw Right"
          command="YAW_RIGHT" 
          sendCommand={() => handleControl("yaw", "right")} 
          isEnabled={isConnected && isArmed}  
          shortcut="D"
        />
        <div className="h-1 w-12  bg-borderColor"></div>
        <ControlButton
          label="Yaw Left"
          command="YAW_LEFT"
          sendCommand={() => handleControl("yaw", "left")}
          isEnabled={isConnected && isArmed}
          shortcut="A"
        />

      </div>

      {/* Roll */}

      
      <div className="w-full h-14 flex items-center justify-center ">
        
      <ControlButton
        label="Roll Left"
        command="ROLL_LEFT"
        sendCommand={() => handleControl("roll", "left")}
        isEnabled={isConnected && isArmed}
        shortcut="←"
      />

      <div className="h-1 w-12  bg-borderColor"></div>

      <ControlButton
        label="Roll Right"
        command="ROLL_RIGHT"
        sendCommand={() => handleControl("roll", "right")}
        isEnabled={isConnected && isArmed}
        shortcut="→"
      />


      </div>
      {/* Pitch */}



     <div className="w-full h-14 flex items-center justify-center ">
        <ControlButton
        label="Pitch Up"
        command="PITCH_UP"
        sendCommand={() => handleControl("pitch", "forward")}
        isEnabled={isConnected && isArmed}
        shortcut="↑"
      />
      <div className="h-1 w-12  bg-borderColor"></div>
      <ControlButton
        label="Pitch Down"
        command="PITCH_DOWN"
        sendCommand={() => handleControl("pitch", "backward")}
        isEnabled={isConnected && isArmed}
        shortcut="↓"
      />

     </div>

      {/* Landing + Set Altitude */}

      <div className="w-full h-14 flex items-center justify-center ">
            <ControlButton
        label="Land"
        command="LAND"
        sendCommand={() => handleControl("land", "land")}
        isEnabled={isConnected && isArmed}
        shortcut="H"
      />
      {/* <ControlButton label="Auto Takeoff" command="SET_ALT" sendCommand={() => handleControl("setAlt", "setalt")} isEnabled={isConnected && isArmed} shortcut="L" /> */}

      <div className="h-1 w-12  bg-borderColor"></div>

     <ControlButton
        label="Auto Takeoff"
        command="SET_ALT"
        sendCommand={() => setShowModal(true)}
        isEnabled={isConnected && isArmed}
        shortcut="L"
        className={
          autoTakeoffStarted
            ? "bg-green-600 hover:bg-green-700 active:bg-green-800"
            : "bg-backgroundSecondary hover:bg-backgroundTertiary active:bg-backgroundQuaternary"
        }
      />

         </div>

{showModal && (
        <AutoTakeoffModal
          onConfirm={handleAutoTakeoff}
          onClose={() => setShowModal(false)}
        />
      )}

  
    </div>
  );
}

export default FlightControlPannel;
