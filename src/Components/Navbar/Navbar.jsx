import React from "react";
import connectionStatus from "../../Store/connectionStatus"; // ✅ Import Global Store
import ConnectDisconnectButton from "./ConnectionButton/ConnectionButton";
import useTelemetry from "../../Store/centralTelemetry";
import BatteryStatus from "./Status/BatteryStatus";
import CurrentFlightMode from "./Status/CurrentFLightMode";
import GpsStatus from "./Status/GpsStatus";
import NetworkStatus from "./Status/NetworkStatus";
import SatelliteCount from "./Status/SattelliteCount";
import CameraWindow from "../../Pages/CameraWindow";
import { ServerStatus } from "../../index.js";
// import MissionUpload from "../utils/UploadFiles";
// import text from "../../assets/text.json"; // ✅ Import text file
import PilotDashboard from "../../auth/PilotDashboard"


function Navbar() {

    const telemetry = useTelemetry(); // ✅ Global Telemetry
    const isConnected = connectionStatus((state) => state.isConnected); // ✅ Global Drone Status

    return (
        <>
            <div id="Navbar" className="bg-navbar h-11 w-full flex items-center justify-between  relative">
                <div className="Status-bar h-full flex items-center justify-center">
                    <div id="GPS" className="flex w-20 h-full justify-evenly items-center column pt-1">
                        <GpsStatus level={telemetry?.gps?.fixtype || 0} />
                    </div>

                    <div id="Network" className="flex  w-20 h-full justify-evenly pt-1">
                        <NetworkStatus level={telemetry?.networkStrength || 0} />
                    </div>

                    <div id="Battery" className="flex w-20 h-full justify-evenly pt-1">
                        <BatteryStatus level={telemetry?.battery.level || 0} />
                    </div>

                    <div id="SatelliteCount" className="flex w-20 h-full justify-evenly pt-1">
                        <SatelliteCount count={telemetry?.gps?.satellites ?? 0} />
                    </div>

                    <div id="CurrentFlightMode" className="flex w-44  items-center  justify-evenly ">
                        <CurrentFlightMode mode={telemetry?.system?.flight_mode} />
                    </div>
                </div>

                <div className="LeftSidebar w-auto pr-2 flex gap-4 justify-center items-center">
                    <div className="flex item-center justify-center">
                    {/* <PilotDashboard /> ✅ No need to pass props */}

                    </div>

                   
                    {/* <MissionUpload /> ✅ No need to pass props */}
                    <div className="flex item-center justify-center flex-col text-gray-500 font-bold text-[10px]">
                    <CameraWindow /> {/* ✅ No need to pass props */}

                   
                 </div>
                    <ServerStatus /> {/* ✅ No need to pass props */}
                    <ConnectDisconnectButton /> {/* ✅ No need to pass props */}
                </div>
            </div>
        </>
    );
}

export default Navbar;
