import React, { useState, useEffect } from "react";
import { connectDrone, disconnectDrone, isDroneConnected } from "../../../api/droneapi.js";
import Loader from "../../Common/Loader.jsx";
import Notification from "../../../utils/Notification.jsx";
import useTelemetry from "../../../Global/centralTelemetry.js";
import { use } from "react";

const ConnectionButton = ({ isConnected, setIsConnected }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const checkConnection = () => setIsConnected(isDroneConnected());
    

    // const intervalId = setInterval(checkConnection, 1000);

    // return () => clearInterval(intervalId);
  }, [setIsConnected]);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      let response;
      if (isConnected) {
        response = await disconnectDrone();
      } else {
        response = await connectDrone();

      }

      console.log("Drone Response:", response);

      if (response.message) {
        setIsConnected(!isConnected);
        setNotification({
          title: isConnected ? "Drone Disconnected" : "Drone Connected",
          message: isConnected
            ? "The drone has been successfully disconnected."
            : "The drone has been successfully connected.",
          type: isConnected ? "disconnect" : "success",
        });
      } else {
        setNotification({
          title: "Connection Failed",
          message: "Unable to connect/disconnect the drone.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        title: "Connection Error",
        message: "An error occurred while connecting/disconnecting the drone.",
        type: "error",
      });
      console.error("Connection error:", error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <button
        className="flex items-center space-x-1 rounded-md border transition-colors duration-300 h-full p-2 font-bold w-32 justify-center"
        style={{
          backgroundColor: isConnected ? "#FF0000" : "#00FF00",
          color: "#FFFFFF",
        }}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : isConnected ? "Disconnect" : "Connect"}
      </button>

      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default ConnectionButton;
