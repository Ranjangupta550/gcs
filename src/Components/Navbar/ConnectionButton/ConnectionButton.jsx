
import React, { useState } from "react";
import connectionStatus from "../../../Store/connectionStatus.js";
import notify from "../../UI/notify.jsx";
import DroneAnimation from "../../../assets/animation/DroneAnimation.json";
import ConnectedAnimation from "../../../assets/animation/Tick.json";
import DisconnectedAnimation from "../../../assets/animation/Cross.json";
import Lottie from "lottie-react";
import { useServerStatus } from "../../../index.js";

const ConnectionButton = () => {
  const isConnected = connectionStatus((state) => state.isConnected);
  const connect = connectionStatus((state) => state.connect);
  const disconnect = connectionStatus((state) => state.disconnect);
  const isLoading = connectionStatus((state) => state.isLoading);

  const isServerConnected = useServerStatus().getServerStatus();

  const handleClick = async () => {

    if (isConnected) {
      await disconnect();
    } else {
      if (isServerConnected) {
        await connect();
      } else {
        notify("Server is not connected, please try again later", "error");
      }
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
