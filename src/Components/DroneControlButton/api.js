// api.js

const apiBaseUrl = "http://192.168.29.13:5000/";

const handleResponse = async (response) => {
  // console.log(response)
  if (response.status==200) {
    // console.log("success")
    const data = await response;
    return { success: true, data };
  } else {
    const error = await response.text();
    return { success: false, error: `Server error: ${error}` };
  }
};

export const connectDrone = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}connection`, {
      method: "POST",
    });
    return await handleResponse(response);
  } catch (error) {
    return { success: false, error: `Connection error: ${error.message}` };
  }
};

export const disconnectDrone = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}disconnect`, {
      method: "POST",
    });
    return await handleResponse(response);
  } catch (error) {
    return { success: false, error: `Disconnect error: ${error.message}` };
  }
};

export const armDrone = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}arm`, {
      method: "POST",
    });
    return await handleResponse(response);
  } catch (error) {
    return { success: false, error: `Arm error: ${error.message}` };
  }
};

export const disarmDrone = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}disarm`, {
      method: "POST",
    });
    return await handleResponse(response);
  } catch (error) {
    return { success: false, error: `Disarm error: ${error.message}` };
  }
};

export const controlThrottle = async (action) => {
  try {
    const response = await fetch(`${apiBaseUrl}throttl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    });
    return await handleResponse(response);
  } catch (error) {
    return { success: false, error: `Throttle control error: ${error.message}` };
  }
};

export const controlYaw = async (action) => {
  try {
    const response = await fetch(`${apiBaseUrl}yaw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    });
    return await handleResponse(response);
  } catch (error) {
    return { success: false, error: `Yaw control error: ${error.message}` };
  }
};