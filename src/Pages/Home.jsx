import React, { useCallback, useEffect } from "react";
import { useState } from "react";

import ToggleBar from "../Components/ToggleBar/ToggleBar";
import Navbar from "../Components/Navbar/Navbar";
import DroneParameter from "../Components/DroneParameter/DroneParameter";
import FlightControlPannel from "../Components/FlightControlPannel/FlightControlPannel";
import Map from "../Components/Map/Map";
import StatusBox from "../Components/Statusbox/Statusbox";
import ConnectionButton from "../Components/Navbar/ConnectionButton/ConnectionButton";
// import InputParameter from "../Components/InputParameter/InputParameter";
import connectionStatus from "../Global/connectionStatus";
import Compass from "../Components/Map/compass";
// import Text from "../api/text";
import useTelemetry from "../Global/centralTelemetry";
import { use } from "react";
function MainPage() {
  const [count, setCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const telemetry = useTelemetry();
  // console.log("telemetry", telemetry);

 
  // const isConnected = connectionStatus((state) => state.isConnected); // ✅ Global Drone 

  return (
      <div id="main" className="flex font-robotoMono flex-col h-screen w-screen  bg-backgroundPrimary gap-y-1 overflow-hidden">
        <div id="navbar" className="bg-[#00000] h-11 ml-2 mr-2 mt-1 rounded-md ">
          <Navbar />

        </div>
        <div className=" h-full relative  ml-2 mr-2 rounded-md flex justify-between overflow-hidden gap-2">

          <div id="leftside" className="bg-[#1c1c1e] h-[99%]  w-96  rounded-md relative left-0 overflow-hidden">
            <div id="sidebar" className="bg-black h-[100%] w-14 flex flex-col gap-y-2 overflow-hidden">
              <div className="bg-[#1c1c1e] h-full w-[90%] flex flex-col gap-y-2 overflow-hidden">
                Ranjan
              </div>
            </div>
          </div>
          <div id="middle" className="bg-[#1c1c1e] w-[65%] h-[70%] font-custom rounded-md"
          >
            <Map />
          </div>
          <div id="rightside" className=" w-80 h-[99%] p-2 items-center flex-col flex  rounded-md relative right-0">
            <div className="w-full">
            <DroneParameter />
            </div>
            <div className="w-full">
              <StatusBox/>
            </div>
            <div className="absolute bottom-1">
            <Compass direction={telemetry?.attitude?.yaw} />
            </div>
            
          </div>
        </div>

       
      </div> 
  );
}
export default MainPage;
