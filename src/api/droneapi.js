import { sendCommand, sendCommandWithPayload } from "./api"; // ✅ Import reusable function
import connectionStatus from "../Global/connectionStatus"; // ✅ Import Global Store
import { socket } from "./api"; // ✅ Import reusable function

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
  return sendCommand(`throttle${ direction }`);
};
export const controlYaw = (direction) => {
  console.log("Yaw direction: ", direction);
  return sendCommand(`yaw${ direction }`);
};
export const controlHeight = (direction) => {
  console.log("Height direction: ", direction);
  return sendCommand(`${ direction }`);
};
export const controlRoll = (direction) => {
  console.log("Roll direction: ", direction);
  return sendCommand(`roll${ direction }`);
};
export const controlPitch = (direction) => {
  console.log("Pitch direction: ", direction);
  return sendCommand(`pitch${ direction }`);
};
export const controlLand = (land) => {
  console.log("Landing drone");
  return sendCommand(`${land}`);
};
export const controlSetAlt = (altitude) => {
  console.log("Altitude: ", altitude);
  return sendCommand(`${ altitude }`);
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
export const monitoring= async()=>{
  const response = await sendCommand("monitoring");
  console.log("monotring response: ", response);
  return response.message;
}




export const  chnageFlightMode = async (mode)=>{
  console.log("Changing flight mode to: ", mode);
  socket.emit("mode_switch", { mode }, (response) => {
    console.log("Change flight mode response: ", response);
    return response.message;
  });
}
export const sendAltitude = async (altitude) => {
  try {
    console.log("Sending altitude: ", altitude);
    socket.emit("setAlt", { height: parseFloat(altitude) });
    console.log("Altitude sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending altitude: ", error);
    return false;
  }
};
export const sendAutoTakeoff = async (altitude) => {
  try {
    altitude=Number(altitude);
    console.log("Sending altitude: ", typeof( altitude));
    await sendCommandWithPayload("setAlt", { height: altitude });
    console.log("Altitude sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending altitude: ", error);
    return false;
  }
};
