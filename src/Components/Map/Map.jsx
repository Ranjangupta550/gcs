import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import droneSvg from "../../assets/Svg/DroneSvg.svg";
import useTelemetry from "../../Global/centralTelemetry";
import MapControls from "./MapControls";
import Compass from "./compass";

const DEFAULT_LOCATION = {
    longitude: 77.5083, // Default location
    latitude: 28.4829,
};

const roundTo4 = (num) => (num ? parseFloat(num.toFixed(4)) : 0);
// const roundTo2 = (num) => (num ? parseFloat(num.toFixed(0)) : 0);

const MapComponent = () => {
    const telemetry = useTelemetry();
    // console.log("Telemetry data yaw:", telemetry?.attitude?.yaw || "No telemetry available");

  
    const isConnected = telemetry?.nav?.longitude !== undefined && telemetry?.nav?.latitude !== undefined;

    const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
    const [followDrone, setFollowDrone] = useState(true); // Auto-follow enabled initially

    const [viewState, setViewState] = useState({
        longitude: DEFAULT_LOCATION.longitude,
        latitude: DEFAULT_LOCATION.latitude,
        zoom: 17,
        pitch: 0,
        bearing: 0,
        mapStyle: "mapbox://styles/mapbox/satellite-v9", // Default map style
    });

    // Update user location from telemetry & auto-follow if enabled
    useEffect(() => {
        if (isConnected && telemetry?.nav) {
            const newUserLocation = {
                longitude: roundTo4(telemetry.nav.longitude || DEFAULT_LOCATION.longitude),
                latitude: roundTo4(telemetry.nav.latitude || DEFAULT_LOCATION.latitude),
            };
            // console.log("New User Location: ", newUserLocation);
            setUserLocation(newUserLocation);

            if (followDrone) {
                setViewState((prevState) => ({
                    ...prevState,
                    longitude: newUserLocation.longitude,
                    latitude: newUserLocation.latitude,
                   
                }));
            }
        }
    }, [telemetry?.nav?.longitude, telemetry?.nav?.latitude, isConnected, followDrone]);

    return (
        <div className="relative w-full h-full">
            <div id="compass" className="absolute z-10 bottom-16 right-14 w-[100px] h-[100px]">
                <Compass direction={telemetry?.attitude?.yaw} />
            </div>
            <Map
                {...viewState}
                mapboxAccessToken="pk.eyJ1IjoicmFuamFuLTk4MzciLCJhIjoiY200eno4ZnBoMThzZTJpc2Nia2Zma2gyNiJ9.hszQOHoScU6INliFAnReZA"
                onMove={(evt) => {
                    setViewState((prev) => ({
                        ...prev,
                        ...evt.viewState, // Ensure all properties are updated
                        mapStyle: prev.mapStyle, // Keep map style persistent
                    }));
                    setFollowDrone(false); // Stop auto-follow on user movement
                }}
                style={{ width: "100%", height: "100%" }}
            >
                {/* Drone Marker */}
                <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}>
                    <div className="relative">
                        <img
                            src={droneSvg}
                            alt="Drone"
                            className="w-12 h-12 drop-shadow-lg transition-transform duration-500"
                        />
                        <div className="absolute w-16 h-16 bg-blue-200 opacity-30 rounded-full animate-ping -top-2 -left-2"></div>
                    </div>
                </Marker>
            </Map>

            {/* Map Control Buttons */}
            <MapControls setViewState={setViewState} />

            {/* Recenter Button (Follow Drone) */}
            <button
                onClick={() => setFollowDrone(true)}
                className="absolute top-5 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
            >
                Follow Drone
            </button>


        </div>
    );
};

export default MapComponent;
