// const socketUrl = "http://localhost:5000"; // Adjust the URL as needed
// let socket = null;
// let isConnected = false; // Tracks WebSocket connection status
// let droneConnected = false; // Tracks drone connection status
// let pendingRequests = {}; // Stores pending requests waiting for a response

// // Function to create a WebSocket connection when called
// export const connectWebSocket = () => {
//   return new Promise((resolve, reject) => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       console.log("WebSocket already connected.");
//       resolve({ success: true });
//       return;
//     }

//     socket = new WebSocket(socketUrl);

//     socket.onopen = () => {
//       console.log("WebSocket Connected!");
//       isConnected = true;
//       resolve({ success: true });
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Received WebSocket Message:", data);

//       // Update drone connection status
//       if (data.type === "connection_status") {
//         droneConnected = data.connected;
//       }

//       // Resolve pending request based on response ID
//       if (data.requestId && pendingRequests[data.requestId]) {
//         pendingRequests[data.requestId].resolve(data);
//         delete pendingRequests[data.requestId];
//       }
//     };

//     socket.onerror = (error) => {
//       console.error("WebSocket Error:", error);
//       reject({ success: false, error });
//     };

//     socket.onclose = () => {
//       console.log("WebSocket Disconnected.");
//       isConnected = false;
//     };
//   });
// };

// // Function to close the WebSocket connection
// export const disconnectWebSocket = () => {
//   return new Promise((resolve) => {
//     if (socket) {
//       socket.close();
//       socket = null;
//       isConnected = false;
//       resolve({ success: true });
//     } else {
//       resolve({ success: false });
//     }
//   });
// };

// // Function to send WebSocket message and return a Promise
// const sendWebSocketRequest = (command, payload = {}) => {
//   return new Promise((resolve, reject) => {
//     if (!socket || !isConnected) {
//       reject(new Error("WebSocket Not Connected"));
//       return;
//     }

//     const requestId = Math.random().toString(36).substr(2, 9);
//     const message = JSON.stringify({ requestId, command, ...payload });

//     pendingRequests[requestId] = { resolve, reject };

//     socket.send(message);
//     console.log("Sent WebSocket Command:", message);
//   });
// };

// // **Drone Connection Functions**
// export const connectDrone = async () => {
//   const connectionStab=await connectWebSocket(); // First, establish WebSocket connection
//   console.log(connectionStab);

//   const response = sendWebSocketRequest(`connection`); // Then, send connection command
//   return response;
// };

// export const disconnectDrone = async () => {
//   const response = await sendWebSocketRequest("disconnect"); // Send disconnect command first
//   await disconnectWebSocket(); // Then, close WebSocket connection
//   return response;
// };

// // **Drone Control Commands**
// export const armDrone = () => sendWebSocketRequest("arm");
// export const disarmDrone = () => sendWebSocketRequest("disarm");
// export const controlThrottle = (direction) => sendWebSocketRequest("throttle", { direction });
// export const controlYaw = (direction) => sendWebSocketRequest("yaw", { direction });
// export const controlHeight = (direction) => sendWebSocketRequest("height", { direction });
// export const controlRoll = (direction) => sendWebSocketRequest("roll", { direction });
// export const controlPitch = (direction) => sendWebSocketRequest("pitch", { direction });
// export const controlLand = () => sendWebSocketRequest("land");
// export const controlSetAlt = (altitude) => sendWebSocketRequest("set_altitude", { altitude });
// export const getTelemetry = () => sendWebSocketRequest("get_telemetry");
// export const getFlightMode = () => sendWebSocketRequest("get_flight_mode");

// // Check if drone is connected
// export const isDroneConnected = () => droneConnected;
