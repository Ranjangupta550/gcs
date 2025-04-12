import React, { useState, useEffect, useRef, useCallback } from "react";
import Map, { Marker, useControl } from "react-map-gl"; // <-- Import useControl
import MapboxDraw from "@mapbox/mapbox-gl-draw"; // <-- Import Draw
import * as turf from '@turf/turf'; // <-- Import Turf.js
import "mapbox-gl/dist/mapbox-gl.css"; // Already imported globally usually
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css"; // Already imported globally usually
import droneSvg from "../../assets/Svg/DroneSvg.svg";
import useTelemetry from "../../Global/centralTelemetry";
import MapControls from "./MapControls";
import Compass from "./compass";
import { socket,sendCommandWithPayload } from "../../api/api";

// MapboxDrawControl component to integrate Draw with react-map-gl
function MapboxDrawControl(props) {
  useControl(
    () => new MapboxDraw(props),
    ({ map }) => { // onAdd
      map.on('draw.create', props.onCreate);
      map.on('draw.update', props.onUpdate);
      map.on('draw.delete', props.onDelete);
    },
    ({ map }) => { // onRemove
      map.off('draw.create', props.onCreate);
      map.off('draw.update', props.onUpdate);
      map.off('draw.delete', props.onDelete);
    },
    {
      position: props.position // e.g., 'top-left'
    }
  );
  return null;
}


const DEFAULT_LOCATION = {
  longitude: 77.5083,
  latitude: 28.4829,
};

const roundTo4 = (num) => (num ? parseFloat(num.toFixed(4)) : 0);

const MapComponent = () => {
  const telemetry = useTelemetry();
  const isConnected = telemetry?.nav?.longitude !== undefined && telemetry?.nav?.latitude !== undefined;

  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [followDrone, setFollowDrone] = useState(true);
  const [viewState, setViewState] = useState({
    longitude: DEFAULT_LOCATION.longitude,
    latitude: DEFAULT_LOCATION.latitude,
    zoom: 17,
    pitch: 0,
    bearing: 0,
    mapStyle: "mapbox://styles/mapbox/satellite-v9",
  });

  // State for Geofencing
  const [geofenceData, setGeofenceData] = useState(null); // Store drawn polygon GeoJSON
  const [centerPoint, setCenterPoint] = useState(null); // Store calculated center point GeoJSON
  const drawRef = useRef(); // Ref specifically for the draw instance if needed externally, though useControl handles internal map refs

  // Update user location from telemetry & auto-follow if enabled
  useEffect(() => {
    if (isConnected && telemetry?.nav) {
      const newUserLocation = {
        longitude: roundTo4(telemetry.nav.longitude || DEFAULT_LOCATION.longitude),
        latitude: roundTo4(telemetry.nav.latitude || DEFAULT_LOCATION.latitude),
      };
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

  // --- Geofence Drawing Event Handlers ---
  const onDrawCreate = useCallback((event) => {
    const features = event.features;
     // Get the MapboxDraw instance via the ref from useControl hook if needed
     // const draw = drawRef.current; // Not strictly needed here with useControl handling it
    if (features.length > 0 && features[0].geometry.type === 'Polygon') {
      const polygonFeature = features[0];

      // Clear previous drawings if only one geofence is allowed
      // Note: Accessing draw instance might be tricky here, check react-map-gl docs or manage feature IDs
      // This part needs careful handling with react-map-gl's control management
      console.log('Polygon Drawn (GeoJSON):', polygonFeature);
      setGeofenceData(polygonFeature);

      const center = turf.centerOfMass(polygonFeature.geometry);
      console.log('Calculated Center (GeoJSON Point):', center);
      setCenterPoint(center);
    }
  }, []); // Empty dependency array

  const onDrawUpdate = useCallback((event) => {
    const features = event.features;
    if (features.length > 0 && features[0].geometry.type === 'Polygon') {
      const polygonFeature = features[0];
      console.log('Polygon Updated (GeoJSON):', polygonFeature);
      setGeofenceData(polygonFeature);

      const center = turf.centerOfMass(polygonFeature.geometry);
      console.log('Updated Center (GeoJSON Point):', center);
      setCenterPoint(center);
    }
  }, []); // Empty dependency array

  const onDrawDelete = useCallback(() => {
    console.log('Polygon Deleted');
    setGeofenceData(null);
    setCenterPoint(null);
  }, []); // Empty dependency array


  // --- Function to Send Data to Backend ---
  const sendGeofenceData = async () => {
    if (!geofenceData || !centerPoint) {
      alert('Please draw a geofence area on the map first.');
      return;
    }

    const payload = {
      geofenceBoundary: geofenceData.geometry.coordinates, // Array of coordinates [[lng, lat], ...]
      center: centerPoint.geometry.coordinates, // Array [lng, lat]
    };

    console.log('Sending data to backend:', payload);

    try {
        const response = await sendCommandWithPayload('geofence', payload); // Adjust event name as needed
        console.log('Response from backend:', response);
        if (response) {
            alert('Geofence data sent successfully!');
        } else {
            alert('Failed to send geofence data.');
        }
       
    } catch (error) {
        console.error('Error sending geofence data:', error);
        alert('Failed to send geofence data.');
    }

  };


  return (
    <div className="relative w-full h-full">
      {/* Compass - positioned absolutely */}
      <div id="compass" className="absolute z-10 bottom-16 right-14 w-[100px] h-[100px]">
        <Compass direction={telemetry?.attitude?.yaw} />
      </div>

      {/* Map Container */}
      <Map
        {...viewState}
        mapboxAccessToken="pk.eyJ1IjoicmFuamFuLTk4MzciLCJhIjoiY200eno4ZnBoMThzZTJpc2Nia2Zma2gyNiJ9.hszQOHoScU6INliFAnReZA" // Use your token
        onMove={(evt) => {
          setViewState((prev) => ({
            ...prev,
            ...evt.viewState,
            mapStyle: prev.mapStyle,
          }));
          // Only disable follow if the move wasn't triggered by the follow useEffect
          if (
            evt.viewState.longitude !== userLocation.longitude ||
            evt.viewState.latitude !== userLocation.latitude
          ) {
             setFollowDrone(true);
          }
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={viewState.mapStyle} // Ensure mapStyle is passed correctly
      >
        {/* Drone Marker */}
        <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}>
          <div className="relative cursor-pointer"> {/* Added cursor-pointer for interaction hint */}
            <img
              src={droneSvg}
              alt="Drone"
              className="w-12 h-12 drop-shadow-lg transition-transform duration-500"
              // Add rotation based on yaw if desired (adjust origin if needed)
              style={{ transform: `rotate(${telemetry?.attitude?.yaw || 0}deg)` }}
            />
            {/* Ping animation - consider if needed */}
            {/* <div className="absolute w-16 h-16 bg-blue-200 opacity-30 rounded-full animate-ping -top-2 -left-2"></div> */}
          </div>
        </Marker>

        {/* Geofence Drawing Control */}
        <MapboxDrawControl
            position="top-left"
            displayControlsDefault={false}
            controls={{
                polygon: true,
                trash: true
            }}
            // defaultMode="draw_polygon" // Optional: Start in drawing mode
            onCreate={onDrawCreate}
            onUpdate={onDrawUpdate}
            onDelete={onDrawDelete}
         />

      </Map>

      {/* Map Control Buttons (Your existing component) */}
      <MapControls setViewState={setViewState} />

      {/* Recenter Button (Follow Drone) */}
      <button
        onClick={() => setFollowDrone(true)}
        disabled={followDrone} // Disable if already following
        className={`absolute top-4 right-4 bg-blue-500 text-white px-3 py-1.5 rounded-md shadow-md transition-opacity duration-300 ${followDrone ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
      >
        Follow Drone
      </button>

       {/* Send Geofence Button */}
       <button
        onClick={sendGeofenceData}
        disabled={!geofenceData} // Disable if no geofence drawn
        className={`absolute top-16 right-4 bg-green-500 text-white px-3 py-1.5 rounded-md shadow-md transition-opacity duration-300 ${!geofenceData ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
       >
        Send Geofence
       </button>

       {/* Display Geofence Info (Optional for Debugging) */}
       
       <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-2 rounded shadow max-w-xs max-h-40 overflow-auto text-xs">
           {geofenceData ? (
                <>
                    <p><strong>Geofence Drawn:</strong> Yes</p>
                    <p><strong>Center:</strong> {centerPoint ? centerPoint.geometry.coordinates.map(c => c.toFixed(4)).join(', ') : 'N/A'}</p>
                </>
            ) : (
                <p>Draw a geofence polygon.</p>
            )}
       </div>
      

    </div>
  );
};

export default MapComponent;