import React, { useState, useEffect } from "react";
import { isDroneConnected } from "../../api/droneapi";
import ConnectDisconnectButton from "./ConnectionButton/ConnectionButton";
import useTelemetry from "../../Global/centralTelemetry";
import BatteryStatus from "./Status/BatteryStatus";
import CurrentFlightMode from "./Status/CurrentFlightMode";
import GpsStatus from "./Status/GpsStatus";
import NetworkStatus from "./Status/NetworkStatus";
import SatelliteCount from "./Status/SattelliteCount";


function Navbar() {
   const  telemetry=null
    const [isConnected, setIsConnected] = useState(isDroneConnected());

    useEffect(() => {
        setIsConnected(isDroneConnected());
    }, []);

    return (
        <>
            <div id="Navbar" className="bg-navbar h-18 w-full flex items-center justify-between relative">
                <div className="Status-bar border-white h-full flex items-center justify-center">
                    <div id="GPS" className="flex w-28 justify-evenly items-center column pt-1">
                        <GpsStatus level={telemetry?.gpsStrength || 0} />
                    </div>

                    <div id="Network" className="flex w-28 justify-evenly pt-1">
                        <NetworkStatus level={telemetry?.networkStrength || 0} />
                    </div>

                    <div id="Battery" className="flex w-28 justify-evenly pt-1">
                        <BatteryStatus level={telemetry?.batteryLevel || 0} />
                    </div>

                    <div id="SatelliteCount" className="flex w-28 justify-evenly pt-1">
                        <SatelliteCount count={telemetry?.gps.satellites ?? 0} />
                    </div>

                    <div id="CurrentFlightMode" className="flex w-28 justify-evenly items-center pt-1">
                        <CurrentFlightMode mode={telemetry?.system.flight_mode || "N/A"} />
                    </div>
                </div>

                <div className="LeftSidebar w-auto pr-2 flex">
                    <ConnectDisconnectButton isConnected={isConnected} setIsConnected={setIsConnected} />
                </div>
            </div>
        </>
    );
}

export default Navbar;
