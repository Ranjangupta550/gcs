import { sendCommand } from "./api"; // ✅ Import reusable function
import connectionStatus from "../Global/connectionStatus"; // ✅ Import Global Store

export const connectDrone = async () => {
    return await connectionStatus.getState().connect(); // ✅ Call Zustand function
};

export const disconnectDrone = async () => {
    return await connectionStatus.getState().disconnect(); // ✅ Call Zustand function
};

export const isDroneConnected = () => {
    return connectionStatus.getState().isDroneConnected();
};


// ✅ Arm & Disarm
export const armDrone = () => sendCommand("arm");
export const disarmDrone = () => sendCommand("disarm");

// ✅ Drone Controls
export const controlThrottle = (direction) => sendCommand("throttle", { direction });
export const controlYaw = (direction) => sendCommand("controlYaw", { direction });
export const controlHeight = (direction) => sendCommand("controlHeight", { direction });
export const controlRoll = (direction) => sendCommand("controlRoll", { direction });
export const controlPitch = (direction) => sendCommand("controlPitch", { direction });
export const controlLand = () => sendCommand("controlLand");
export const controlSetAlt = (altitude) => {
  console.log("Altitude: ", altitude);
 sendCommand( altitude );
}
// ✅ Flight Modes
export const getFlightMode = () => sendCommand("getFlightMode");
export const setFlightMode = (mode) => sendCommand("setFlightMode", { mode });

// ✅ Get Telemetry Data

export const getTelemetry =async () => {
  const telemetryData = await sendCommand("telemetry");
  // console.log("Telemetry data requested",telemetryData);
  return telemetryData;
}