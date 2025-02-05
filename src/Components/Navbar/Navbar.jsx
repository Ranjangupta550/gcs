import React, { useState, useEffect } from "react";
import GpsStatus from "./Status/GpsStatus";
import NetworkStatus from "./Status/NetworkStatus"; 
import BatteryStatus from "./Status/BatteryStatus";
import SatelliteCount from "./Status/SattelliteCount";
import CurrentFlightMode from "./Status/CurrentFLightMode";
import { isDroneConnected, getTelemetry } from "../../api/droneapi";
import ConnectDisconnectButton from "./ConnectionButton/ConnectDisconnectButton";

function Navbar() {
    const [isConnected, setIsConnected] = useState(isDroneConnected());
    const [telemetry, setTelemetry] = useState(null);

    useEffect(() => {
        if (isConnected) {
            // Fetch telemetry data when the drone is connected
            const fetchTelemetryData = async () => {
                const data = await getTelemetry();
                setTelemetry(data); // Set telemetry data
            };

            fetchTelemetryData();
        } else {
            setTelemetry(null); // Reset telemetry data when disconnected
        }
    }, [isConnected]); // Re-run when the connection status changes

    return (
        <>
            <div id="Navbar" className="bg-navbar h-18 w-full flex items-center justify-between">
                <div className="Status-bar border-white h-full flex items-center justify-center">
                    {/* GPS Status */}
                    <div id="GPS" className="flex w-28 justify-evenly items-center column pt-1">
                        <GpsStatus level={telemetry?.gpsStrength || 0} /> {/* Show GPS Strength */}
                    </div>

                    {/* Network Status */}
                    <div id="Network" className="flex w-28 justify-evenly pt-1">
                        <NetworkStatus level={telemetry?.networkStrength || 0} /> {/* Show Network Strength */}
                    </div>

                    {/* Battery Status */}
                    <div id="Battery" className="flex w-28 justify-evenly pt-1">
                        <BatteryStatus level={telemetry?.batteryLevel || 0} /> {/* Show Battery Level */}
                    </div>

                    {/* Satellite Count */}
                    <div id="SatelliteCount" className="flex w-28 justify-evenly pt-1">
                        <SatelliteCount count={telemetry?.satelliteCount || 0} /> {/* Show Satellite Count */}
                    </div>

                    {/* Flight Mode */}
                    <div id="CurrentFlightMode" className="flex w-28 justify-evenly items-center pt-1">
                        <CurrentFlightMode mode={telemetry?.flightMode || "N/A"} /> {/* Show Flight Mode */}
                    </div>
                </div>

                {/* Connect/Disconnect Button */}
                <div className="LeftSidebar w-56 pr-2 flex items-end justify-end h-10">
                    <ConnectDisconnectButton isConnected={isConnected} setIsConnected={setIsConnected} />
                </div>
            </div>
        </>
    );
}

export default Navbar;
