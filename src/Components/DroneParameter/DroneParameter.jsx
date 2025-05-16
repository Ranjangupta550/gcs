import { useEffect } from "react";
import ParaCard from "../utils/ParameterCard";
import useTelemetry from "../../Global/centralTelemetry";
import useGlobalDroneStore from "../../Global/connectionStatus";

function DroneParameter() {

    const telemetry = useTelemetry();
    // const telemetry=useGlobalDroneStore((state)=>state.telemetry); 
    const isConnected = useGlobalDroneStore((state) => state.isConnected);

    const formatValue = (value) => (value !== undefined && value !== null ? value.toFixed(2) : "0.00");

    return (
        <div className="grid grid-cols-2 gap-1 bg-[#1A1A1D]  p-2 rounded-lg w-full max-w-4xl mx-auto shadow-lg">
            <ParaCard title="Altitude" value={formatValue(telemetry?.nav?.altitude)} unit="m" />
            <ParaCard title="Yaw" value={formatValue(telemetry?.attitude?.yaw)} unit="deg" />
            <ParaCard title="Longitude" value={formatValue(telemetry?.nav?.longitude)} unit="deg" />
            <ParaCard title="Latitude" value={formatValue(telemetry?.nav?.latitude)} unit="deg" />
            <ParaCard title="Vertical Speed" value={formatValue(telemetry?.nav?.climb_rate)} unit="m/s" />
         
            <ParaCard title="Ground Speed" value={formatValue(telemetry?.nav?.groundspeed)} unit="m/s" />
            <ParaCard title="Speed" value={formatValue(telemetry?.nav?.airspeed)} unit="km/h" />
            <ParaCard title="Battery_Current" value={formatValue(telemetry?.battery?.current)} unit="Amp" />
            <ParaCard title="Battery_Level" value={formatValue(telemetry?.battery?.level)} unit="%6" />
            <ParaCard title="Battery_Voltage" value={formatValue(telemetry?.battery?.voltage)} unit="volts" />
            {/* <ParaCard title="Battery" value={formatValue(telemetry?.battery?.current)} unit="Amp" /> */}
            {/* <ParaCard title="Battery" value={formatValue(telemetry?.battery?.current)} unit="Amp" /> */}

        </div>
    );
}

export default DroneParameter;
