import React, { useState, useEffect } from "react";
import { connectDrone, disconnectDrone, isDroneConnected } from "../../../api/droneapi.js";
import Loader from "../../Common/Loader.jsx"; // Import the Loader component
import Notification from "../../../utils/Notification"; // Import Notification component

const ConnectionButton = ({ isConnected, setIsConnected }) => {
  const [isLoading, setIsLoading] = useState(false); // State for showing loader
  const [notification, setNotification] = useState(null); // State for managing notification

  useEffect(() => {
    const checkConnection = () => setIsConnected(isDroneConnected());
    checkConnection(); // Initial check
    const interval = setInterval(checkConnection, 1000); // Auto-update every second

    return () => clearInterval(interval);
  }, [setIsConnected]);

  const handleClick = async () => {
    setIsLoading(true); // Show loader while connecting/disconnecting
    let response;
    try {
      if (isConnected) {
        response = await disconnectDrone();
    
        console.log(response.success);
        if (response.success) {
          setIsConnected(false);
          setNotification({
            title: "Drone Disconnected",
            message: "The drone has been successfully disconnected.",
            type: "disconnect",
          });
        } else {
          setNotification({
            title: "Failed to disconnect",
            message: "Unable to disconnect the drone.",
            type: "error",
          });
        }
      } else {
        response = await connectDrone();
        console.log(response.success);
        if (response.success) {
          setIsConnected(true);
          setNotification({
            title: "Drone Connected",
            message: "The drone has been successfully connected.",
            type: "success",
          });
        } else {
          setNotification({
            title: "Connection Failed",
            message: "Unable to connect to the drone.",
            type: "error",
          });
        }
      }
    } catch (error) {
      // Handle errors gracefully
      setNotification({
        title: "Connection Error",
        message: "An error occurred while connecting/disconnecting the drone.",
        type: "error",
      });
      console.error("Connection error:", error);
    }
    setIsLoading(false); // Hide loader after response
  };

  return (
    <>
      <button
        className="flex items-center space-x-1 rounded-md border transition-colors duration-300 h-full p-2 font-bold w-32 justify-center"
        style={{
          backgroundColor: isConnected ? "#FF0000" : "#00FF00",
          color: isConnected ? "FFFFFF" : "#FFFFFF",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = isConnected ? "#CC0000" : "#00CC00")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = isConnected ? "#FF0000" : "#00FF00")}
        onMouseDown={(e) => (e.target.style.backgroundColor = isConnected ? "#009900" : "#990000")}
        onMouseUp={(e) => (e.target.style.backgroundColor = isConnected ? "#00CC00" : "#CC0000")}
        onClick={handleClick}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? <Loader /> : isConnected ? "Disconnect" : "Connect"}
      </button>

      {/* Display notification if exists */}
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)} // Close the notification after it disappears
        />
      )}
    </>
  );
};

export default ConnectionButton;


/*
import React, { useEffect, useState } from "react";
import { connectDrone, disconnectDrone, isDroneConnected } from "../../../api/droneapi.js";

const ConnectionButton = ({ isConnected, setIsConnected }) => {
    
    useEffect(() => {
        const fetchConnectionStatus = async () => {
            setIsConnected(await isDroneConnected());
        };

        fetchConnectionStatus(); // Initial check
        const interval = setInterval(fetchConnectionStatus, 2000); // Update every 2s

        return () => clearInterval(interval);
    }, [setIsConnected]);

    const handleClick = async () => {
        if (isConnected) {
            const response = await disconnectDrone();
            if (response.success) setIsConnected(false);
        } else {
            const response = await connectDrone();
            if (response.success) setIsConnected(true);
        }
    };

    return (
        <button onClick={handleClick} style={{ background: isConnected ? "green" : "red" }}>
            {isConnected ? "Disconnect" : "Connect"}
        </button>
    );
};

export default ConnectionButton;

*/