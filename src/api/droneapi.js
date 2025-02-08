import { ColorRing } from "react-loader-spinner";

// import {endPoint} from './api';
const endPoint = "http://192.168.29.13:5000/api/";
let droneConnectionStatus = false;

export const isDroneConnected = () => droneConnectionStatus;

export const connectDrone = async () => {
  try {
    const response = await fetch(`${endPoint}connection`, { method: "POST" });
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (data.message === true) {
      droneConnectionStatus = true;
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error connecting drone:", error);
    return { success: false, error };
  }
};

export const disconnectDrone = async () => {
  try {
    const response = await fetch(`${endPoint}disconnection`, {
      method: "POST",
    });
    console.log("disconnect = ", response);
    const data = await response.json();
    console.log(data);
    if (data.message === true) {
      droneConnectionStatus = false;
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error disconnecting drone:", error);
    return { success: false, error };
  }
};

export const armDrone = async () => {
  try {
    const response = await fetch(`${endPoint}arm`, { method: "POST" });
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error("Error arming drone:", error);
    return { success: false, error };
  }
};

export const disarmDrone = async () => {
  try {
    const response = await fetch(`${endPoint}disarm`, { method: "POST" });
    return await response.json();
  } catch (error) {
    console.error("Error disarming drone:", error);
    return { success: false, error };
  }
};

// ✅ Throttle Control
export const controlThrottle = async (direction) => {
  try {
    const response = await fetch(`${endPoint}throttle${direction}`, {
      method: "POST",
    });
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error("Error controlling throttle:", error);
    return { success: false, error };
  }
};

// ✅ Yaw Control
export const controlYaw = async (direction) => {
  try {
    const response = await fetch(`${endPoint}yaw/${direction}`, {
      method: "POST",
    });
    return await response.json();
  } catch (error) {
    console.error("Error controlling yaw:", error);
    return { success: false, error };
  }
};

// ✅ Height Control
export const controlHeight = async (direction) => {
  try {
    const response = await fetch(`${endPoint}height/${direction}`, {
      method: "POST",
    });
    return await response.json();
  } catch (error) {
    console.error("Error controlling height:", error);
    return { success: false, error };
  }
};

// ✅ Roll Control
export const controlRoll = async (direction) => {
  try {
    const response = await fetch(`${endPoint}roll/${direction}`, {
      method: "POST",
    });
    return await response.json();
  } catch (error) {
    console.error("Error controlling roll:", error);
    return { success: false, error };
  }
};

// ✅ Pitch Control
export const controlPitch = async (direction) => {
  try {
    const response = await fetch(`${endPoint}pitch/${direction}`, {
      method: "POST",
    });
    return await response.json();
  } catch (error) {
    console.error("Error controlling pitch:", error);
    return { success: false, error };
  }
};

export const getTelemetry = async () => {
  try {
    const response = await fetch(`${endPoint}telemetry`, {
      method: "GET",
    });

    const data = await response.json();
    console.log("Telemetry: ", data);
    console.log("Telemetry data: ", data.message);

    if (data.message != null) {
      console.log("inside this if block");
      return data.message; // Assuming telemetry data is in data.telemetry
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching telemetry data:", error);
    return null;
  }
};
