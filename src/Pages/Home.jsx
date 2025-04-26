import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div
      id="main"
      className="flex font-robotoMono flex-col h-screen w-screen  bg-backgroundPrimary gap-y-1 overflow-hidden"
    >
      <div id="navbar" className="bg-[#00000] h-11 ml-2 mr-2 mt-1 rounded-md ">
        <Navbar />
      </div>
      <div className=" h-full relative  ml-2 mr-2 rounded-md flex justify-between overflow-hidden gap-2">
        <div
          id="leftside"
          className="bg-[#1c1c1e] h-[99%]  w-96  rounded-md relative left-0 overflow-hidden"
        >
          <div
            id="sidebar"
            className="bg-black h-[100%] w-14 flex flex-col gap-y-2 overflow-hidden"
          >
            <div className="bg-[#1c1c1e] h-full w-[90%] flex flex-col gap-y-2 overflow-hidden">
              Ranjan
            </div>
          </div>
        </div>
        <div
          id="middle"
          className=" w-[65%] h-[99%] p-1 flex flex-col item-center  overflow-hidden bg-backgroundPrimary rounded-md relative  gap-y-1"
        >
          <div id="map" className="w-full h-[65%] rounded-md  overflow-hidden">
            <Map />

          </div>
          <div id="control" className="w-full bg-backgroundPrimary h-[35%]">
            <FlightControlPannel />
          </div>
        </div>

        <div
          id="rightside"
          className=" w-80 h-[99%]  items-center  justify-evenly flex-col gap-y-1 flex  rounded-md relative right-0"
        >
          <div className="w-full ">
            <DroneParameter />
          </div>
          <div className="w-full  flex items-center justify-center">
            <StatusBox />
          </div>
          <div className="relative bottom-1 w-full border-white  rounded-md border-opacity-45">
            <Compass direction={telemetry?.attitude?.yaw} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainPage;
