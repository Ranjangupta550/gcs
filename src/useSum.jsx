import { useState, useEffect } from "react";

function useStatusSimulation() {
    // Navbar data
    const [gpsLevel, setGpsLevel] = useState(75);
    const [networkLevel, setNetworkLevel] = useState(100);
    const [batteryLevel, setBatteryLevel] = useState(10);
    const [satelliteCount, setSatelliteCount] = useState(40);
    const [flightMode, setFlightMode] = useState("Manual");

    // Additional drone parameters
    const [altitude, setAltitude] = useState(275);
    const [yaw, setYaw] = useState(50);
    const [verticalSpeed, setVerticalSpeed] = useState(40);
    const [groundSpeed, setGroundSpeed] = useState(20);
    const [speed, setSpeed] = useState(80);
    const [latitude, setLatitude] = useState(80);
    const [longitude, setLongitude] = useState(80);

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate changing levels
            setGpsLevel(prev => Math.max(1, Math.min(100, Math.round(prev + (Math.random() * 10 - 5)))));
            setLatitude(prev => Math.max(1, Math.min(100, Math.round(prev + (Math.random() * 10 - 5)))));
            setLongitude(prev => Math.max(1, Math.min(100, Math.round(prev + (Math.random() * 10 - 5)))));
            setNetworkLevel(prev => Math.max(1, Math.min(100, Math.round(prev + (Math.random() * 10 - 5)))));
            setBatteryLevel(prev => Math.max(1, Math.min(100, Math.round(prev + (Math.random() * 5 - 2)))));
            setSatelliteCount(prev => Math.max(1, Math.min(50, Math.round(prev + Math.floor(Math.random() * 3 - 1)))));

            // Simulate random flight mode changes
            const flightModes = ["Manual", "Auto", "Hovering", "Landing"];
            setFlightMode(flightModes[Math.floor(Math.random() * flightModes.length)]);

            // Simulate additional parameters
            setAltitude(prev => Math.max(0, Math.round(prev + (Math.random() * 10 - 5))));
            setYaw(prev => Math.max(0, Math.min(360, Math.round(prev + (Math.random() * 10 - 5)))));
            setVerticalSpeed(prev => Math.max(-50, Math.min(50, Math.round(prev + (Math.random() * 5 - 2.5)))));
            setGroundSpeed(prev => Math.max(0, Math.round(prev + (Math.random() * 5 - 2.5))));
            setSpeed(prev => Math.max(0, Math.round(prev + (Math.random() * 10 - 5))));
        }, 1000); // Update every 3 seconds

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []);

    return {
        // Navbar data
        gpsLevel,
        networkLevel,
        batteryLevel,
        satelliteCount,
        flightMode,

        // DroneParameter data
        altitude,
        yaw,
        verticalSpeed,
        groundSpeed,
        speed,
        latitude,
        longitude,
    };
}

export default useStatusSimulation;
