import React from "react";
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
// import Text from "../api/text";
function MainPage() {
  const [count, setCount] = useState(0);
  // const isConnected = connectionStatus((state) => state.isConnected); // ✅ Global Drone 

  return (
    <>
    {/* <div className=" absolute z-10  right-1 top-7">
    <ConnectionButton />
    </div> */}
     
      <div className="flex flex-col w-screen h-screen bg-MainBackground relative">
        <div id="Togglebar" className="h-auto">
          {/* <ToggleBar /> */}
        </div>
        <div id="Navbar" className="h-auto">
          <Navbar />
        </div>
        <div
          id="main"
          className="h-[calc(100vh-50px)] flex w-screen gap-2 p-1 pl-2 pr-2"
        >
          <div className="w-[30%] overflow-hidden rounded-md bg-ParameterBox opacity-80">
            <DroneParameter />
            <div className="w-full h-[50%] flex justify-center items-center p-2 overflow-hidden">
              <FlightControlPannel />
            </div>
          </div>
          <div className="w-[70%] overflow-hidden rounded-md border-4 relative border-ParameterBox border-opacity-100">
            <div className="w-auto h-auto  z-10 bottom-0 left-1 absolute">
              <StatusBox />
            </div>
            <Map />
          </div>
        </div>
        <div
          id="footer"
          className="w-screen h-[30px] border-2 relative bottom-0"
        ></div>
      </div>
    </>
  );
}
export default MainPage;
