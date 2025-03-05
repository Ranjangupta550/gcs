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
export const armDrone = async () => {
  const response = await sendCommand("arm");
  console.log("Arm response: ", response);
  return response.message;
};

export const disarmDrone = async () => {
  const response = await sendCommand("disarm");
  console.log("Disarm response: ", response);
  return response.message;
};

// ✅ Drone Controls
export const controlThrottle = (direction) => {
  console.log("Throttle direction: ", direction);
  return sendCommand("throttle", { direction });
};
export const controlYaw = (direction) => {
  console.log("Yaw direction: ", direction);
  return sendCommand("controlYaw", { direction });
};
export const controlHeight = (direction) => {
  console.log("Height direction: ", direction);
  return sendCommand("controlHeight", { direction });
};
export const controlRoll = (direction) => {
  console.log("Roll direction: ", direction);
  return sendCommand("controlRoll", { direction });
};
export const controlPitch = (direction) => {
  console.log("Pitch direction: ", direction);
  return sendCommand("controlPitch", { direction });
};
export const controlLand = () => {
  console.log("Landing drone");
  return sendCommand("controlLand");
};
export const controlSetAlt = (altitude) => {
  console.log("Altitude: ", altitude);
  return sendCommand("controlSetAlt", { altitude });
};
// ✅ Flight Modes
export const getFlightMode = () => {
  console.log("Getting flight mode");
  return sendCommand("getFlightMode");
};
export const setFlightMode = (mode) => {
  console.log("Setting flight mode: ", mode);
  return sendCommand("setFlightMode", { mode });
};

// ✅ Get Telemetry Data

// export const getTelemetry =async () => {
//   const telemetryData = await sendCommand("telemetry");
//   // console.log("Telemetry data requested",telemetryData);
//   return telemetryData;
// }