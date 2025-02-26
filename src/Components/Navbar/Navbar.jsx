import React, { useState, useEffect } from "react";
import GpsStatus from "./Status/GpsStatus";
import NetworkStatus from "./Status/NetworkStatus";
import BatteryStatus from "./Status/BatteryStatus";
import SatelliteCount from "./Status/SattelliteCount";
import CurrentFlightMode from "./Status/CurrentFLightMode";
import { isDroneConnected, getTelemetry,getFlightMode } from "../../api/droneapi";
import ConnectDisconnectButton from "./ConnectionButton/ConnectDisconnectButton";
import InputParameter from "../inputParameter/inputParameter";
import useTelemetry from "../../api/Telemetry/useTelemetryStore";



function Navbar() {
    const telemetry = useTelemetry();
  const [isConnected, setIsConnected] = useState(isDroneConnected());
    const [formData, setFormData] = useState(false);


return (
    <>
        <div
            id="Navbar"
            className="bg-navbar h-18 w-full flex items-center justify-between relative"
        >
            <div className="Status-bar border-white h-full flex items-center justify-center">
                {/* GPS Status */}
                <div
                    id="GPS"
                    className="flex w-28 justify-evenly items-center column pt-1"
                >
                    <GpsStatus level={telemetry?.gpsStrength || 0} />{" "}
                    {/* Show GPS Strength */}
                </div>

                {/* Network Status */}
                <div id="Network" className="flex w-28 justify-evenly pt-1">
                    <NetworkStatus level={telemetry?.networkStrength || 0} />{" "}
                    {/* Show Network Strength */}
                </div>

                {/* Battery Status */}
                <div id="Battery" className="flex w-28 justify-evenly pt-1">
                    <BatteryStatus level={telemetry?.batteryLevel || 0} />{" "}
                    {/* Show Battery Level */}
                </div>

                {/* Satellite Count */}
                <div id="SatelliteCount" className="flex w-28 justify-evenly pt-1">
                    <SatelliteCount count={telemetry?.gps.satellites || 0} />{" "}
                    {/* Show Satellite Count */}
                </div>

                {/* Flight Mode */}
                <div
                    id="CurrentFlightMode"
                    className="flex w-28 justify-evenly items-center pt-1"
                >
                    <CurrentFlightMode mode={telemetry?.system.flight_mode || "N/A"} />{" "}
                   
                </div>
            </div>

            {/* Connect/Disconnect Button */}
            <div className="LeftSidebar w-auto pr-2 flex">
                <div className="flex items-center justify-center gap-2">
                    <div
                        className="text-white font-semibold w-40 border-2 border-white rounded-md flex text-center items-center justify-center cursor-pointer"
                        onClick={() => setFormData(!formData)}
                    >
                        Upload Mission
                    </div>
                    <ConnectDisconnectButton
                        isConnected={isConnected}
                        setIsConnected={setIsConnected}
                    />
                </div>
            </div>
        </div>
        {formData && (
           <div className="z-10 h-52  w-52  flex top-20 right-4 absolute bg-gray-500 rounded-md"> 
           <InputParameter />
           </div>
        )}
    </>
);
}

export default Navbar;
