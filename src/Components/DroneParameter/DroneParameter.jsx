import  {useEffect,useState} from "react";
import ParaCard from "../Common/ParameterCard";
import useTelemetry from "../../Global/centralTelemetry";
import { isDroneConnected } from "../../api/droneapi";


function DroneParameter() {
  const [telemetry, setTelemetry] = useState({});
  const checkDroneConnection = () => {
    if (isDroneConnected()) {
      setTelemetry(useTelemetry());
    } else {
      setTelemetry({});
    }
  };

  useEffect(() => {
    const interval = setInterval(checkDroneConnection, 1000); // Check every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formatValue = (value) => (value !== undefined && value !== null ? value.toFixed(4) : "0");

  return (
    <div>
      {/* Show Drone Connection Status */}

      {/* Display Telemetry Data */}
     
        <div className="h-[50%] grid grid-cols-2 justify-center items-center p-2 gap-1">
          <ParaCard title="Altitude" value={formatValue(telemetry?.nav?.altitude)} unit="m" />
          <ParaCard title="Yaw" value={formatValue(telemetry?.attitude?.yaw)} unit="deg" />
          <ParaCard title="Longitude" value={formatValue(telemetry?.nav?.longitude)} unit="deg" />
          <ParaCard title="Latitude" value={formatValue(telemetry?.nav?.latitude)} unit="deg" />
          <ParaCard title="Vertical Speed" value={formatValue(telemetry?.nav?.climb_rate)} unit="m/s" />
          <ParaCard title="Ground Speed" value={formatValue(telemetry?.nav?.groundspeed)} unit="m/s" />
          <ParaCard title="Speed" value={formatValue(telemetry?.nav?.airspeed)} unit="km/h" />
          <ParaCard title="Battery Consumption" value={formatValue(telemetry?.battery?.current)} unit="Amp" />
        </div>
    </div>
  );
}

export default DroneParameter;
