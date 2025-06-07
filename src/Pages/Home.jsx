import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import DroneParameter from "../Components/DroneParameter/DroneParameter";
import FlightControlPannel from "../Components/FlightControlPannel/FlightControlPannel";
import Map from "../Components/Map/Map";
import StatusBox from "../Components/Statusbox/Statusbox";

import useTelemetry from "../Store/centralTelemetry";
import icons from "../assets/icons";
import { SidebarTogglePanel, SideBarComponents,Compass } from "../index";

function Home() {
  const [count, setCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const telemetry = useTelemetry();
  const [toggleSideBar, setToggleSidebar] = useState(false);

  const handleToggleBar = () => {
    setToggleSidebar(!toggleSideBar);
  };

  return (
    <div
      id="main"
      className="flex font-robotoMono flex-col h-screen w-screen  bg-backgroundPrimary gap-y-1 overflow-hidden "
    >
      <div id="navbar" className="bg-[#00000] h-11 ml-2 mr-2 mt-1 rounded-md ">
        <Navbar />
      </div>
      <div id="main-content" className="flex relative h-full w-full">
        <div className="h-[99%] w-[100%] relative border-borderColor border-2   ml-2 mr-2 rounded-md flex justify-between overflow-hidden pr-1  ">
          <div className=" w-[95%] h-full flex ">
            <SidebarTogglePanel
              isOpen={toggleSideBar}
              onToggle={handleToggleBar}
              children={<SideBarComponents />}
            />

            <div
              id="map-win"
              className={`${
                toggleSideBar ? "w-[80%]" : "w-full"
              } border-2 border-borderColor flex items-center relative rounded-lg overflow-hidden m-1 `}
            >
              <Map toggleSideBar={toggleSideBar} />
            </div>
          </div>

          <div
            id="rightside"
            className=" w-[20%]  h-[99%] border-2 border-borderColor  items-center flex-col justify-around  flex   rounded-md  right-0 mt-1 mb-1"
          >
            <div className="w-full border ">
              <DroneParameter />
            </div>
            <div className="w-full   flex-col flex items-center justify-center">
              <StatusBox />
            </div>
            <div className="relative bottom-1 w-full border-borderColor  rounded-md ">
              <Compass direction={telemetry?.attitude?.yaw} />
            </div>
          </div>
        </div>
      </div>
    </div>
    //
  );
}
export default Home;
