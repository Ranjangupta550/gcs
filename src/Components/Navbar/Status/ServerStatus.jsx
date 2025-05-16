import icons from "../../../assets/icons";
import { useState } from "react";
import { useServerStatus } from "../../../index";
import Lottie from "lottie-react";
import serverConnected from "../../../assets/animation/Tick.json"
import serverDisconnected from "../../../assets/animation/Cross.json";



function ServerStatus (){
    const isServerConnected = useServerStatus().getServerStatus();
    return (
        <div className="flex items-center justify-evenly gap-1 bg-[#1E1E1E] w-28 rounded-md p-1   h-4/5">
            <Lottie
                animationData={isServerConnected ? serverConnected : serverDisconnected}
                alt="Server Status"
                className="w-8  h-8 transition duration-300 "
                loop={false}
            />
            <span className="text-[8px]  font-medium transition duration-300 test-gray-300">
                {isServerConnected ? " Server Connected" : " Server Disconnected"}
            </span>
        </div>
    );
}
export default ServerStatus;