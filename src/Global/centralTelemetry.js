import { useState, useEffect } from "react";
import { isDroneConnected, getTelemetry } from "../api/droneapi";
const useTelemetry = () => {
    const [telemetry, setTelemetry] = useState(null);

    useEffect(async() => {
        // const interval = setInterval(async () => {
           
        // },); // Check every 1 second
        if (isDroneConnected()) {
            const data = await getTelemetry();
            setTelemetry(data);
        } else {
            setTelemetry(null); // Reset telemetry if drone disconnects
        }
        // return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    if (!isDroneConnected()) {
        return null;
    }

    return telemetry?.message;
};

export default useTelemetry;
