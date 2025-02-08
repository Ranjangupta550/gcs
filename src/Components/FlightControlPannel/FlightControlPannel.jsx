import React, { useState, useEffect } from "react";
import ControlButton from "../Common/ControlButton";
import { 
  connectDrone, 
  disconnectDrone, 
  armDrone, 
  disarmDrone, 
  controlThrottle, 
  controlYaw, 
  controlHeight, 
  controlRoll, 
  controlPitch, 
  isDroneConnected 
} from "../../api/droneapi.js";

function FlightControlPannel() {
  const [isArmed, setIsArmed] = useState(false);
  const [isConnected, setIsConnected] = useState(isDroneConnected());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected(isDroneConnected());
      if (!isDroneConnected() && isArmed) {
        handleDisarm();
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleArm = async () => {
    if (!isConnected) return;
    try {
      const response = await armDrone();
      if (response.message === true) setIsArmed(true);
    } catch (error) {
      console.error("Error while arming:", error);
    }
  };

  const handleDisarm = async () => {
    if (!isConnected) return;
    try {
      const response = await disarmDrone();
      if (response.message === true) setIsArmed(false);
    } catch (error) {
      console.error("Error while disarming:", error);
    }
  };

  const handleConnectDisconnect = async () => {
    if (isConnected) {
      await handleDisarm();
      await disconnectDrone();
      setIsConnected(false);
    } else {
      await connectDrone();
      setIsConnected(true);
    }
  };

  const handleControl = async (actionType, value) => {
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
      default:
        console.error("Invalid control action");
        return;
    }
    try {
      const response = await controlFunction(value);
      if (!response.success) {
        console.error("Control action failed");
      }
    } catch (error) {
      console.error(`Error controlling ${actionType}:`, error);
    }
  };

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
            shortcut="A"
          />
        </div>
      </div>

      <div className="flex w-full h-full flex-col">
        {/* Throttle Controls */}
        <div className="flex justify-evenly h-14">
          <ControlButton
            label="Throttle +"
            command="THROTTLE_UP"
            sendCommand={() => handleControl("throttle", 1)}
            isEnabled={isConnected && isArmed}
            shortcut="↑"
          />
          <ControlButton
            label="Throttle -"
            command="THROTTLE_DOWN"
            sendCommand={() => handleControl("throttle", 0)}
            isEnabled={isConnected && isArmed}
            shortcut="↓"
          />
        </div>
        {/* Yaw Controls */}
        <div className="flex justify-evenly h-14">
          <ControlButton
            label="Yaw Left"
            command="YAW_LEFT"
            sendCommand={() => handleControl("yaw", 1)}
            isEnabled={isConnected && isArmed}
            shortcut="←"
          />
          <ControlButton
            label="Yaw Right"
            command="YAW_RIGHT"
            sendCommand={() => handleControl("yaw", 0)}
            isEnabled={isConnected && isArmed}
            shortcut="→"
          />
        </div>
        {/* Height Controls */}
        <div className="flex justify-evenly h-14">
          <ControlButton
            label="Height +"
            command="HEIGHT_UP"
            sendCommand={() => handleControl("height", 1)}
            isEnabled={isConnected && isArmed}
            shortcut="H"
          />
          <ControlButton
            label="Height -"
            command="HEIGHT_DOWN"
            sendCommand={() => handleControl("height", 0)}
            isEnabled={isConnected && isArmed}
            shortcut="L"
          />
        </div>
        {/* Roll Controls */}
        <div className="flex justify-evenly h-14">
          <ControlButton
            label="Roll Left"
            command="ROLL_LEFT"
            sendCommand={() => handleControl("roll", 1)}
            isEnabled={isConnected && isArmed}
            shortcut="Q"
          />
          <ControlButton
            label="Roll Right"
            command="ROLL_RIGHT"
            sendCommand={() => handleControl("roll", 0)}
            isEnabled={isConnected && isArmed}
            shortcut="E"
          />
        </div>
        {/* Pitch Controls */}
        <div className="flex justify-evenly h-14">
          <ControlButton
            label="Pitch Up"
            command="PITCH_UP"
            sendCommand={() => handleControl("pitch", 1)}
            isEnabled={isConnected && isArmed}
            shortcut="W"
          />
          <ControlButton
            label="Pitch Down"
            command="PITCH_DOWN"
            sendCommand={() => handleControl("pitch", 0)}
            isEnabled={isConnected && isArmed}
            shortcut="S"
          />
        </div>
      </div>
    </div>
  );
}

export default FlightControlPannel;
