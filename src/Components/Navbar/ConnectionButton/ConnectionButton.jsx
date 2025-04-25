
import React, { useState } from "react";
import connectionStatus from "../../../Global/connectionStatus.js";
import Loader from "../../utils/Loader.jsx";
import powerOff from "../../../assets/Svg/disconnectDrone.svg";
import powerOn from "../../../assets/Svg/connectDrone.svg";
import { toast } from "react-hot-toast";
import successAnim from "../../../assets/animation/sucessAnimation.json";
import Lottie from "lottie-react";
import notify from "../../utils/Notification/notify.jsx";

const ConnectionButton = () => {
    const { isConnected, connect, disconnect } = connectionStatus();
    const monitor = connectionStatus.getState().monitor;  // Access monitor correctly

    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);

/*     const handleClick = async () => {
        setIsLoading(true);
        let response = isConnected ? await disconnect() : await connect();

       if (response.message) {
            if(isConnected&&response.message===true){
                 notify("Drone Disconnected", "The drone has been successfully disconnected.", "success")
            } else {
                 notify("Drone Connected", "The drone has been successfully connected.", "success")      
            }
            if (!isConnected) {  // Only start monitoring after connecting
                monitorDrone();
            }
        } 

        setIsLoading(false);
    };
 */

const handleClick = async () => {
  const action = isConnected ? 'Disconnecting' : 'Connecting';
  const successMsg = isConnected ? 'Drone Disconnected Successfully' : 'Drone Connected Successfully';
  const descMsg = isConnected
    ? 'The drone has been successfully disconnected.'
    : 'The drone has been successfully connected.';
    setIsLoading(true);
    const promise = isConnected ? disconnect() : connect();

    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("error")), 20000)
    );

    toast.promise(
      Promise.race([promise, timeout]),
      {
        loading: `${action}...`,
        success: () => {
          if (!isConnected) monitorDrone();
          return notify(successMsg, "success");
        },
        error: (err) => {
          notify(
            err.message === "error"
              ? "Connection Timeout"
              : "Unable to connect/disconnect the drone.",
            "error"
          );
        },
      }
    );

    try {
      await Promise.race([promise, timeout]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
};


    const monitorDrone = async () => {
        let response = await monitor();
        console.log("Monitoring response recived: ", response);
        if (response) {
            // setNotification({
            //     title: "Drone Disconnected",
            //     message: "The drone disconnected unexpectedly.",
            //     type: "error",
            // });
        }
    };

    return (
        <div
        onClick={handleClick}
        className={`
          flex items-center space-x-2 rounded-md pl-2 w-40 shadow-md cursor-pointer
          transition-all duration-300
          ${isConnected ? "bg-green-100 hover:bg-green-200" : "bg-red-100 hover:bg-red-200"}
          ${isLoading ? "opacity-70 pointer-events-none" : ""}
        `}
      >
        {/* Text Label */}
        <span
          className={`text-sm font-semibold w-28 ${
            isLoading
              ? "text-yellow-600"
              : isConnected
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {isLoading
            ? "Waiting..."
            : isConnected
            ? "Connected"
            : "Disconnected"}
        </span>
      
        {/* Power Icon */}
        <div
          className={`
            flex items-center justify-center w-10 h-10 rounded-full
            transition-all duration-300
            ${
              isLoading
                ? "bg-yellow-100 animate-pulse"
                : isConnected
                ? "bg-green-100"
                : "bg-red-100"
            }
          `}
        >
          {isLoading ? (
            <div className="scale-[0.4]">
              <Loader />
            </div>
          ) : (
            <img
              src={isConnected ? powerOff : powerOn}
              alt="Power"
              className="w-5 h-5"
            />
          )}
        </div>
      </div>
      
        );
};

export default ConnectionButton;
