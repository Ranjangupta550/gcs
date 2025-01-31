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