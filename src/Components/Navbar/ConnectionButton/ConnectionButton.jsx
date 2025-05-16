
import React, { useState } from "react";
import connectionStatus from "../../../Global/connectionStatus.js";
import Loader from "../../utils/Loader.jsx";
import powerOff from "../../../assets/Svg/disconnectDrone.svg";
import powerOn from "../../../assets/Svg/connectDrone.svg";

import notify from "../../utils/Notification/notify.jsx";
import DroneAnimation from "../../../assets/animation/DroneAnimation.json";
import ConnectedAnimation from "../../../assets/animation/Tick.json";
import DisconnectedAnimation from "../../../assets/animation/Cross.json";
import Lottie from "lottie-react";

const ConnectionButton = () => {
    const { isConnected, connect, disconnect } = connectionStatus();
    const monitor = connectionStatus.getState().monitor;  // Access monitor correctly

    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    const handleClick = async () => {
      setIsLoading(true);
      try {
        let response = isConnected ? await disconnect() : await connect();
        console.log("Connection response received: ", response, "isConnected", isConnected);

        if (response.message) {
          console.log("Connection message: ", response.message);
          if (isConnected && response.message) {
            notify("Drone Disconnected", "success");
          } else {
            notify("Drone Connected", "success");
            monitorDrone();
          }
         
        } else {
          notify("Unable to connect/disconnect the drone.", "error");
        }
      } catch (error) {
        console.error("Error during connection handling: ", error);
        notify("An unexpected error occurred.", "error");
      } finally {
        setIsLoading(false);
      }
    };


// const handleClick = async () => {
//   const action = isConnected ? 'Disconnecting' : 'Connecting';
//   const successMsg = isConnected ? 'Drone Disconnected Successfully' : 'Drone Connected Successfully';
//   const descMsg = isConnected
//     ? 'The drone has been successfully disconnected.'
//     : 'The drone has been successfully connected.';
//     setIsLoading(true);
//     const promise = isConnected ? disconnect() : connect();

//     const timeout = new Promise((_, reject) =>
//       setTimeout(() => reject(new Error("error")), 20000)
//     );

//     toast.promise(
//       Promise.race([promise, timeout]),
//       {
//         loading: `${action}...`,
//         success: () => {
//           if (!isConnected) monitorDrone();
//           return notify(successMsg, "success");
//         },
//         error: (err) => {
//           notify(
//             err.message === "error"
//               ? "Connection Timeout"
//               : "Unable to connect/disconnect the drone.",
//             "error"
//           );
//         },
//       }
//     );

//     try {
//       await Promise.race([promise, timeout]);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
// };


    const monitorDrone = async () => {
        let responseMonitor = await monitor();
        console.log("Monitoring response received: ", responseMonitor);
        if (responseMonitor) {
            notify("Drone Disconnected Unexpectedly", "warning");
        }
    };

    return (
        <div
        onClick={handleClick}
        className={`
          flex items-center gap-1 justify-center rounded-md w-28  cursor-pointer
          transition-all duration-300 bg-[#1E1E1E] p-1 h-4/5
          hover:bg-[#2D2D2D] text-white border border-gray-300 border-opacity-65 group relative
        `}
      >
        <div>

        {!isLoading && (
          <Lottie
          animationData={isConnected? ConnectedAnimation : DisconnectedAnimation}
          alt="Power Icon"
          className="w-10 h-8  transition duration-300"
          loop={false}
          />
        )}
         {isLoading && (
           <Lottie
           animationData={DroneAnimation}
           alt="Power Icon"
           className="w-10 h-8 transition duration-300"
           loop={true}
           />
          )}

          </div>

     
        <span
          className={` font-semibold text-[8px]  pr-2 ${
            isLoading
              ? "text-yellow-600"
              : isConnected
              ? "text-white opacity-100 text-[10px]"
              : "text-white opacity-90"
          }`}
        >
          {isLoading
            ? "Waiting..."
            : isConnected
            ? "Drone Connected"
            : "Drone Disconnected"}
        </span>

        {isConnected&&(
         <div className="z-10 absolute w-28 top-11 right-0 text-center text-white bg-[#1E1E1E] text-[8px] px-2 py-1 rounded-md 
                    opacity-0 scale-95 transition-all duration-500 delay-200 
                    group-hover:opacity-100 group-hover:scale-100">
      click to Disconnect
    </div>
        )}
        {!isConnected && (
    <div className="z-10 absolute w-28 top-11 right-0 text-center text-white bg-[#1E1E1E] text-[8px] px-2 py-1 rounded-md 
                    opacity-0 scale-95 transition-all duration-500 delay-200 
                    group-hover:opacity-100 group-hover:scale-100">
      click to connect
    </div>
  )}


      
        {/* Power Icon */}
      </div>
      
        );
};

export default ConnectionButton;
