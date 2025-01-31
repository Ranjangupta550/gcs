import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import droneSvg from "../../assets/DroneSvg.svg"; // Ensure the correct path

const getRandomLocation = (baseLongitude, baseLatitude) => {
    const randomOffset = () => (Math.random() - 0.5) * 0.005; // Small random movement
    return {
        longitude: baseLongitude + randomOffset(),
        latitude: baseLatitude + randomOffset(),
    };
};

const MapComponent = () => {
    const [userLocation, setUserLocation] = useState({
        longitude: 28.509937, // Gurgaon, India
        latitude: 77.37992                                          ,
    });

    const [viewState, setViewState] = useState({
        longitude: 28.5099,
        latitude: 77.37992,
        zoom: 10, // Higher zoom for navigation feel
        pitch: 60                                            , // Tilt view for better navigation perspective
        bearing: 0, // Rotation (can be dynamic in the future)
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newLocation = getRandomLocation(77.3910, 28.5355);
            setUserLocation(newLocation);

            // Automatically update map view to follow the location
            setViewState((prevState) => ({
                ...prevState,
                longitude: newLocation.longitude,
                latitude: newLocation.latitude,
            }));
        },1000); // Update every 3 seconds

        return () => clearInterval(intervalId); // Cleanup interval
    }, []);

    return (
        <div className="w-full h-full">
            <Map
                {...viewState}
                mapboxAccessToken="pk.eyJ1IjoicmFuamFuLTk4MzciLCJhIjoiY200eno4ZnBoMThzZTJpc2Nia2Zma2gyNiJ9.hszQOHoScU6INliFAnReZA"
                onMove={(evt) => setViewState(evt.viewState)} // Allow manual map movement
                style={{ width: "100%", height: "100%" }}
                 mapStyle="mapbox://styles/mapbox/navigation-night-v1"// Better for navigation mode
            >
                {/* User Location Marker */}
                <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}>
                    <div className="relative">
                        <img
                            src={droneSvg}
                            alt="Drone"
                            className="w-12 h-12 drop-shadow-lg transform rotate-[viewState.bearing] transition-transform duration-500"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/e/ec/Location_dot_red.svg"; }}
                        />
                        <div className="absolute w-16 h-16 bg-blue-200 opacity-30 rounded-full animate-ping -top-2 -left-2"></div>
                    </div>
                </Marker>
            </Map>
        </div>
    );
};

export default MapComponent;





// Map Style Name	Mapbox Style URL
// Streets (default, detailed)	mapbox://styles/mapbox/streets-v11
// Outdoor (terrain, parks, trails)	mapbox://styles/mapbox/outdoors-v11
// Light (minimal, grayscale)	mapbox://styles/mapbox/light-v10
// Dark (night mode)	mapbox://styles/mapbox/dark-v10
// Satellite (imagery)	mapbox://styles/mapbox/satellite-v9
// Satellite Streets (hybrid)	mapbox://styles/mapbox/satellite-streets-v11
// Navigation Day (for navigation apps)	mapbox://styles/mapbox/navigation-day-v1
// Navigation Night (dark mode for navigation)	mapbox://styles/mapbox/navigation-night-v1