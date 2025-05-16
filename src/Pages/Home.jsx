import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import DroneParameter from "../Components/DroneParameter/DroneParameter";
import FlightControlPannel from "../Components/FlightControlPannel/FlightControlPannel";
import Map from "../Components/Map/Map";
import StatusBox from "../Components/Statusbox/Statusbox";

import Compass from "../Components/Map/compass";
// import Text from "../api/text";
import useTelemetry from "../Global/centralTelemetry";
import icons from "../assets/icons";
import { SidebarTogglePanel } from "../index";

function MainPage() {
  const [count, setCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const telemetry = useTelemetry();
  const [toggleSideBar, setToggleSidebar] = useState(false);
  console.log(toggleSideBar);
  const handleToggleBar = () => {
    console.log("click on toggle bar");
    setToggleSidebar(!toggleSideBar);
  };

  return (
    <div
      id="main"
      className="flex font-robotoMono flex-col h-screen w-screen  bg-backgroundPrimary gap-y-1 overflow-hidden"
    >
      <div id="navbar" className="bg-[#00000] h-11 ml-2 mr-2 mt-1 rounded-md ">
        <Navbar />
      </div>
      <div id="main-content" className="flex relative h-full w-full">

      <div className="h-[99%] w-[100%] relative border   ml-2 mr-2 rounded-md flex justify-between overflow-hidden  ">
        <div className=" w-[80%] h-full flex ">
          <SidebarTogglePanel
            isOpen={toggleSideBar}
            onToggle={handleToggleBar}
            />

          <div
            id="map-win"
            className={`${toggleSideBar? "w-[80%]":"w-full"} border flex items-center relative `}
          >
            <Map />
          </div>
        </div>

        <div
          id="rightside"
          className=" w-[20%]  h-[100%] border  items-center  justify-evenly flex-col gap-y-1 flex  rounded-md  right-0"
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
    </div>
  );
}
export default MainPage;

/* 
  console.log("telemetry", telemetry);
  const isConnected = connectionStatus((state) => state.isConnected);  ✅ Global Drone
 */
