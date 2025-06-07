import React, { useState, useEffect, useRef, useCallback } from "react";
import Map, { Marker, Source, Layer, useControl } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import droneSvg from "../../assets/Svg/DroneSvg.svg";
import useTelemetry from "../../Store/centralTelemetry";
import MapControls from "./MapControls";3.
import { sendCommandWithPayload } from "../../services/api";
import notify from "../UI/notify";
import connectionStatus from "../../Store/connectionStatus";
import { sendWaypoints ,icons, Button} from "../../index";
import Drone from "../../assets/Svg/Drone.png"
function MapboxDrawControl(props) {
  useControl(
    () => new MapboxDraw(props),
    ({ map }) => {
      map.on("draw.create", props.onCreate);
      map.on("draw.update", props.onUpdate);
      map.on("draw.delete", props.onDelete);
    },
    ({ map }) => {
      map.off("draw.create", props.onCreate);
      map.off("draw.update", props.onUpdate);
      map.off("draw.delete", props.onDelete);
    },
    { position: props.position }
  );
  return null;
}

const DEFAULT_LOCATION = {
  longitude: 77.5083,
  latitude: 28.4829,
};

const MapComponent = ({toggleSideBar}) => {
  const telemetry = useTelemetry();
  const isConnected =
    telemetry?.nav?.longitude !== undefined &&
    telemetry?.nav?.latitude !== undefined;
  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [speed, setSpeed] = useState(5); // Default speed in m/s
  const [followDrone, setFollowDrone] = useState(true); // Auto-follow enabled initially
  const [waypointSelectionIsOpen, setWaypointSelectionIsopen] = useState(false);
  const roundTo4 = (num) => (num ? parseFloat(num.toFixed(4)) : 0);
  const [waypointsSaved, setWaypointsSaved] = useState(false);
  const toggleSidebarr = toggleSideBar;


  const [viewState, setViewState] = useState({
    longitude: DEFAULT_LOCATION.longitude,
    latitude: DEFAULT_LOCATION.latitude,
    zoom: 15,
    pitch: 0,
    bearing: 0,
    mapStyle: "mapbox://styles/mapbox/satellite-streets-v11",

  });
  // Track drone position
  useEffect(() => {
    if (isConnected && telemetry?.nav) {
      const newUserLocation = {
        longitude: roundTo4(
          telemetry.nav.longitude || DEFAULT_LOCATION.longitude
        ),
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
  }, [
    telemetry?.nav?.longitude,
    telemetry?.nav?.latitude,
    isConnected,
    followDrone,
  

 
  ]);
  // In MapComponent.jsx


// Add this effect to handle sidebar toggle
useEffect(() => {
  if (mapRef.current) {
    setTimeout(() => {
      const map = mapRef.current?.getMap();
      if (map) {
        map.resize(); // Force map to recalculate dimensions
        if (followDrone) {
          map.flyTo({
            center: [userLocation.longitude, userLocation.latitude],
            essential: true
          });
        }
      }
    }, 100); // Small delay to allow DOM update
  }
}, [toggleSideBar, followDrone, userLocation]);

  const [geofenceData, setGeofenceData] = useState(null);
  const [altitude, setAltitude] = useState(5);
  const [horizontalFov, setHorizontalFov] = useState(60);
  const [waypoints, setWaypoints] = useState([]);
  const mapRef = useRef();
  const [showMissionControls, setShowMissionControls] = useState(false);
  
  // Area in square meters
  const polygon = geofenceData
    ? turf.polygon(geofenceData.geometry.coordinates)
    : null;
  const areaSqMeters = polygon ? turf.area(polygon) : 0;
  const areaSqKm = (areaSqMeters / 1_000_000).toFixed(2);

  // Total distance of the waypoints path
  const pathLine = waypoints.length > 1 ? turf.lineString(waypoints) : null;
  const totalDistance = pathLine
    ? turf.length(pathLine, { units: "kilometers" }) * 1000
    : 0; // in meters
  const estimatedTimeSec = speed > 0 ? totalDistance / speed : 0;
  const estimatedTimeMin = (estimatedTimeSec / 60).toFixed(1);

  // Drawing handlers
  const onDrawCreate = useCallback((event) => {
    const features = event.features;
    if (features.length > 0 && features[0].geometry.type === "Polygon") {
      setGeofenceData(features[0]);
      setWaypoints([]);
      setShowMissionControls(true); // Show mission controls when a polygon is drawn
    }
  }, []);

  const onDrawUpdate = useCallback((event) => {
    const features = event.features;
    if (features.length > 0 && features[0].geometry.type === "Polygon") {
      setGeofenceData(features[0]);
      setWaypoints([]);
      setShowMissionControls(true);
    }
  }, []);

  const onDrawDelete = useCallback(() => {
    setGeofenceData(null);
    setWaypoints([]);
    setShowMissionControls(false); // Hide mission controls when polygon is deleted
  }, []);

  // Generate grid-based waypoints
  const generateWaypoints = useCallback(async () => {
    if (!geofenceData) {
      alert("Please draw a geofence area first.");
      return;
    }

    try {
      const polygon = turf.polygon(geofenceData.geometry.coordinates);
      const bbox = turf.bbox(polygon);

      // Calculate sub-square size based on FOV and altitude
      const fovRadians = (horizontalFov * Math.PI) / 180;
      const groundWidth = 2 * altitude * Math.tan(fovRadians / 2);
      const subSquareSize = groundWidth * 0.8; // 20% overlap

      // Calculate number of rows and columns
      const width = turf.distance([bbox[0], bbox[1]], [bbox[2], bbox[1]], {
        units: "meters",
      });
      const height = turf.distance([bbox[0], bbox[1]], [bbox[0], bbox[3]], {
        units: "meters",
      });

      const cols = Math.ceil(width / subSquareSize);
      const rows = Math.ceil(height / subSquareSize);

      // Generate grid points
      const generatedWaypoints = [];
      const lngStep = (bbox[2] - bbox[0]) / cols;
      const latStep = (bbox[3] - bbox[1]) / rows;

      for (let row = 0; row < rows; row++) {
        const currentLat = bbox[1] + row * latStep + latStep / 2;

        // Alternate direction for each row
        const colStart = row % 2 === 0 ? 0 : cols - 1;
        const colEnd = row % 2 === 0 ? cols : -1;
        const colStep = row % 2 === 0 ? 1 : -1;

        for (let col = colStart; col !== colEnd; col += colStep) {
          const currentLng = bbox[0] + col * lngStep + lngStep / 2;
          const point = turf.point([currentLng, currentLat]);

          if (turf.booleanPointInPolygon(point, polygon)) {
            generatedWaypoints.push([currentLng, currentLat]);
          }
        }
      }

      setWaypoints(generatedWaypoints);
    } catch (error) {
      console.error("Error generating waypoints:", error);
      alert("Error generating waypoints. See console for details.");
    }
  }, [geofenceData, altitude, horizontalFov]);

  // Send data to backend
  const sendGeofenceData = async () => {
    if (!geofenceData || waypoints.length === 0) {
      alert("Please generate waypoints first.");
      return;
    }

    const payload = {
      geofenceBoundary: geofenceData.geometry.coordinates,
      waypoints: waypoints.map(([lon, lat]) => [lat, lon, altitude]),
      speed: speed, // added
    };

    try {
      setShowMissionControls(false); // Hide mission controls after sending
      notify("Scanning started", "info");
      // const response = await sendCommandWithPayload("start_scan", payload);\
      const response = await sendWaypoints(payload);
      console.log("Response from backend:", response);
      // alert(response ? "Mission sent successfully!" : "Failed to send mission");
      if (response?.message) {
        // setGeofenceData(null); // Clear geofence data after sending
        // setWaypoints([]); // Clear waypoints after sending
        notify("Scanning successful", "success");
      }
    } catch (error) {
      console.error("Error:", error);
      // alert("Failed to send mission");
    }
  };
  return (
    <div className="relative w-full h-full">
      <Map
        {...viewState}
        ref={mapRef}
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
        mapStyle={viewState.mapStyle}
      >
        {/* Drone Marker */}
        <Marker
          longitude={userLocation.longitude}
          latitude={userLocation.latitude}
        >
          <div className="relative">
            <img
              src={Drone}
              alt="Drone"
              className="w-14 h-14 drop-shadow-lg transition-transform duration-500"
              style={{
                transform: `rotate(${telemetry?.attitude?.yaw || 0}deg)`,
              }}
            />
          </div>
        </Marker>

        {/* Drawing Control */}
        <MapboxDrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{ polygon: true, trash: true }}
          onCreate={onDrawCreate}
          onUpdate={onDrawUpdate}
          onDelete={onDrawDelete}
        />

        {/* Geofence Area */}
        {geofenceData && (
          <Source type="geojson" data={geofenceData}>
            <Layer
              id="geofence-area"
              type="fill"
              paint={{
                "fill-color": "#088",
                "fill-opacity": 0.2,
                "fill-outline-color": "#0ff",
              }}
            />
          </Source>
        )}

        {/* Waypoints */}
        {waypoints.length > 0 && (
          <>
            <Source
              type="geojson"
              data={{
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: waypoints,
                },
              }}
            >
              <Layer
                id="waypoints-line"
                type="line"
                paint={{
                  "line-color": "#007cbf",
                  "line-width": 3,
                }}
              />
            </Source>
            {waypoints.map((coord, index) => (
              <Marker key={index} longitude={coord[0]} latitude={coord[1]}>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </Marker>
            ))}
          </>
        )}
      </Map>
      <div className="absolute right-8 top-4  z-10">
        <Button
          onClick={() => setFollowDrone(true)}
          className="z-50 bg-black bg-opacity-60 h-10 w-10 flex items-center justify-center  text-white rounded-full shadow-md"
          title="Follow Drone"
          useBaseStyles={false}
          tooltipPlacement="left"
        >
          <img src={icons.followLocation} width={29} alt="" />
      </Button>
        </div>

      {/* Controls Panel */}
      {showMissionControls && (
        <div className="absolute top-52 w-72 left-4 bg-backgroundSecondary bg-opacity-100 text-white p-3 rounded shadow-md z-10">
          <div className="flex flex-col space-y-3">
            {/* Mission Parameters */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium">
                  Altitude (m)
                </label>
                <input
                  type="number"
                  value={altitude}
                  onChange={(e) => setAltitude(Number(e.target.value))}
                  className="w-full border-2 border-white border-opacity-35 bg-backgroundPrimary  rounded px-2 py-1 text-sm"
                  min="1"
                  step="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">FOV (°)</label>
                <input
                  type="number"
                  value={horizontalFov}
                  onChange={(e) => setHorizontalFov(Number(e.target.value))}
                  className="w-full bg-backgroundPrimary border-2 border-opacity-35 border-white rounded px-2 py-1 text-sm"
                  min="10"
                  max="120"
                  step="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Speed (m/s)</label>
                <input
                  type="number"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full border-2 border-white border-opacity-35 bg-backgroundPrimary  rounded px-2 py-1 text-sm"
                  min="1"
                  step="1"
                />
              </div>
            </div>

            {/* Action Buttons */}

            <button
              onClick={generateWaypoints}
              disabled={!geofenceData}
              className={`px-3 py-1.5 rounded text-sm ${
                !geofenceData
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              Generate Grid Waypoints
            </button>
            <button
              onClick={() => {
                const csvHeader = "latitude,longitude,altitude,speed\n";
                const csvRows = waypoints
                  .map(([lon, lat]) => `${lat},${lon},${altitude},${speed}`)
                  .join("\n");

                const csvContent = csvHeader + csvRows;
                const blob = new Blob([csvContent], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "waypoints.csv";
                link.click();
                URL.revokeObjectURL(url);
                console.log("Waypoints saved to waypoints.csv");
                setShowMissionControls(false);
                setWaypointsSaved(true);
              // Hide mission controls after saving
                notify("Waypoints saved successfully", "success");


                
              }}
              disabled={waypoints.length === 0}
              className={`px-3 py-1.5 rounded text-sm ${
                waypoints.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Save Waypoints
            </button>
           
          </div>
        </div>
      )}

      {/* Map Controls (Zoom, etc.) */}
      <div className="absolute top-12 right-4 z-10">
        <MapControls setViewState={setViewState} />
      </div>

      {/* Status Display */}
      {geofenceData && (
        <div className="absolute bottom-4  right-0 bg-backgroundSecondary text-white p-2 rounded shadow text-sm z-10">
          <p>
            <strong>Grid Waypoints:</strong> {waypoints.length}
          </p>
          <p>
            <strong>Altitude:</strong> {altitude}m | <strong>FOV:</strong>{" "}
            {horizontalFov}°
          </p>
          <p>
            <strong>Area:</strong> {areaSqKm} km²
          </p>
          <p>
            <strong>Total Distance:</strong> {(totalDistance / 1000).toFixed(2)}{" "}
            km
          </p>
          <p>
            <strong>Estimated Time:</strong> {estimatedTimeMin} min at {speed}{" "}
            m/s
          </p>
        </div>
      )}
     {waypointsSaved &&  (
  <div className="absolute bottom-2 left-4 z-20 ">
    <button
    // disabled={!droneConnected}

      onClick={() => {
        setWaypointsSaved(false); // Reset the state to hide the button
        sendGeofenceData(); // Send geofence data to backend
      }}
      className={`px-4 py-2 text-white rounded duration-300 ${
           "bg-green-600 text-white hover:bg-green-700"
      } `}
    >
      Start Mission
    </button>
  </div>
)}
    </div>
  );
};

export default MapComponent;