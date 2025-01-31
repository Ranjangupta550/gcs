import React from "react";
import ParameterStatusIcon from "../ParameterStatus/ParameterStatusIcon";
import GpsStatus from "./GpsStatus/GpsStatus";
import NetworkStatus from "./NetworkSatus/NetworkStatus"; 
import BatteryStatus from "./BatteryStatus/BatteryStatus";
import SatelliteCount from "./SatelliteCount/SattelliteCount";
import CurrentFlightMode from "./CurrentFlightMode/CurrentFLightMode";
import useStatusSimulation from "../../useSum";
import ConnectionStatus from "./ConnectionStatus/ConnectionStatus";
function Navbar() {
    const { gpsLevel,networkLevel , batteryLevel, satelliteCount, flightMode } = useStatusSimulation();
  return (
    <>
      <div id="Navbar" className="bg-navbar h-18 w-full flex items-center justify-between">
        <div className="Status-bar border-white h-full  flex items-center justify-center">
          <div id="GPS" className=" flex w-28 justify-evenly items-center column pt-1">
            <GpsStatus level={gpsLevel} />
           
          </div>
          <div id="Network" className=" flex w-28 justify-evenly pt-1">
            <NetworkStatus level={networkLevel} />
          </div>
          <div id="Battery" className=" flex w-28 justify-evenly pt-1">
            <BatteryStatus level={batteryLevel} />
          </div>
          <div id="SatelliteCount" className=" flex w-28 justify-evenly pt-1">
            <SatelliteCount count={satelliteCount} />
          </div>
          <div id="CurrentFlightMode" className=" flex w-28 justify-evenly items-center pt-1">
            <CurrentFlightMode mode={flightMode} />
          </div>

        </div>

        <div className="LeftSidebar w-56 pr-2 flex items-end justify-end h-10 border">
        <ConnectionStatus />
        </div>
      </div>

     
    </>
  );
}

export default Navbar;
