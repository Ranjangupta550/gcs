import { sendCommand } from "./api"; // Import reusable function

// ✅ Get Drone Connection Status
let droneConnectionStatus = false;
export const isDroneConnected = () => droneConnectionStatus;

// ✅ Connect Drone
export const connectDrone = async () => {
  try {
    const response = await sendCommand("connection");
    console.log(response);
    if (response.message) droneConnectionStatus = true;
    return response;
  }
  catch (error) {
    console.error("Error connecting drone:", error);
    return { message: false, error };
  }
};

export const handshake = async () => {
  const response = await sendCommand("handshake");
  console.log("Handshake response: ");  
  console.log(response);
  if (response.message) console.log("Handshake successful");
  return response;
};
// handshake();  

// ✅ Disconnect Drone
export const disconnectDrone = async () => {
  try {
    const response = await sendCommand("disconnection");
    console.log(response);
    console.log(response.message);
    if (response.message) droneConnectionStatus = false;
    return response;
  }
  catch (error) {
    console.error("Error disconnecting drone:", error);
    return { message: false, error };
  }

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
export const getTelemetry = () => sendCommand("telemetry");
