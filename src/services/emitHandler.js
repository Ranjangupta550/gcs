import { sendCommand, sendCommandWithPayload } from "./api"; // ✅ Import reusable function

import { socket } from "./api"; // ✅ Import reusable function
import {connectionStatus, notify, startTimeout ,armStatus} from "../index";

export const connectDrone = async () => {
  sendCommand("connection"); 
  startTimeout("connection",20000,()=>{
    console.log ("Connection failed Timeout");
    notify("Connection timeout","error");
    connectionStatus.getState().setConnectionandLoading(false,false)
  })

};

export const disconnectDrone = async () => {
  sendCommand("disconnection");
   startTimeout("disconnection",20000,()=>{
    console.log ("disconnection failed Timeout");
    notify("Connection timeout","error");
    if(connectionStatus.getState().isDroneConnected()){
      notify("Drone is still connected, please try again","error");
      connectionStatus.getState().setLoading(false);
    }

   
  })

};

export const sendWaypoints = async (payload) => {
try {
  await sendCommandWithPayload("start_scan", payload);
} catch (error) {
  console.error("Error sending waypoints: ", error);
  notify("Failed to send waypoints", "error");
}

};

export const isDroneConnected = () => {
    return connectionStatus.getState().isDroneConnected();
};


// ✅ Arm & Disarm
export const armDrone = async () => {
  sendCommand("arm");
  startTimeout("arm",10000,()=>{
    console.log ("Arm failed Timeout");
    notify("Arm timeout","error");
    armStatus.getState().setArmandLoading(false,false);
  })

};

export const disarmDrone = async () => {
  sendCommand("disarm");
  startTimeout("disarm",10000,()=>{
    console.log ("Disarm failed Timeout");
    notify("Disarm timeout","error");
    armStatus.getState().setArmandLoading(false,false);
  })
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
    socket.emit("setalt", { height: parseFloat(altitude) });
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
    await sendCommandWithPayload("setalt", { height: altitude });
    console.log("Altitude sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending altitude: ", error);
    return false;
  }
};
