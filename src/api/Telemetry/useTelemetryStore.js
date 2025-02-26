import { useState, useEffect } from "react";
import { isDroneConnected, getTelemetry } from "../droneapi";
const useTelemetry = () => {
    const [telemetry, setTelemetry] = useState(null);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (isDroneConnected()) {
                const data = await getTelemetry();
                setTelemetry(data);
            } else {
                setTelemetry(null); // Reset telemetry if drone disconnects
            }
        }, 500); // Check every 1 second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    if (!isDroneConnected()) {
        return null;
    }

    return telemetry?.message;
};

export default useTelemetry;
