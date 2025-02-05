import React, { useState, useEffect } from "react";
import ParaCard from "../Common/ParameterCard"; // Custom card component
import { isDroneConnected, getTelemetry } from "../../api/droneapi"; // Import telemetry API
import Loader from "../Common/Loader"; // Custom loader component

function DroneParameter() {
  const [telemetry, setTelemetry] = useState(null); // Store telemetry data, initially null
  const [isConnected, setIsConnected] = useState(isDroneConnected()); // Check drone connection status
  const [loading, setLoading] = useState(false); // For showing loading state

  // Function to format values (limits float values to 4 decimal places)
  const formatValue = (value) => {
    return value !== undefined && value !== null ? value.toFixed(4) : "0";
  };

  // Function to fetch telemetry data when the drone is connected
  const fetchTelemetryData = async () => {
    setLoading(true); // Start loading
    try {
      const data = await getTelemetry(); // Fetch telemetry from backend
      console.log("Received telemetry data:", data);
      setTelemetry(data); // Store fetched telemetry data
    } catch (error) {
      console.error("Error fetching telemetry data:", error);
      setTelemetry(null); // Reset telemetry in case of error
    }
    setLoading(false); // Stop loading
  };

  // Effect to fetch telemetry data when the drone is connected
  useEffect(() => {
    if (isConnected) {
      fetchTelemetryData(); // Fetch telemetry data when connected
    } else {
      setTelemetry(null); // Reset telemetry when drone disconnects
    }
  }, [isConnected]); // Re-run if the connection status changes

  // Periodically check if the drone is connected
  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected(isDroneConnected()); // Update connection status every second
    }, 1000);
    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <div>
      {/* Show loading spinner while fetching telemetry */}
      {loading && <Loader />}

      {/* Display the telemetry data with formatted values */}
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
