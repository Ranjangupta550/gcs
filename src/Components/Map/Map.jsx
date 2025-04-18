
import React, { useState, useEffect, useRef, useCallback } from "react";
import Map, { Marker, Source, Layer, useControl } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from '@turf/turf';
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import droneSvg from "../../assets/Svg/DroneSvg.svg";
import useTelemetry from "../../Global/centralTelemetry";
import MapControls from "./MapControls";
import Compass from "./compass";
import { sendCommandWithPayload } from "../../api/api";


function MapboxDrawControl(props) {
  useControl(
    () => new MapboxDraw(props),
    ({ map }) => {
      map.on('draw.create', props.onCreate);
      map.on('draw.update', props.onUpdate);
      map.on('draw.delete', props.onDelete);
    },
    ({ map }) => {
      map.off('draw.create', props.onCreate);
      map.off('draw.update', props.onUpdate);
      map.off('draw.delete', props.onDelete);
    },
    { position: props.position }
  );
  return null;
}

const DEFAULT_LOCATION = {
  longitude: 77.5083,
  latitude: 28.4829,
};

const MapComponent = () => {
  const telemetry = useTelemetry();
  const isConnected = telemetry?.nav?.longitude !== undefined && telemetry?.nav?.latitude !== undefined;
  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [followDrone, setFollowDrone] = useState(true); // Auto-follow enabled initially

  const [viewState, setViewState] = useState({
    longitude: DEFAULT_LOCATION.longitude,
    latitude: DEFAULT_LOCATION.latitude,
    zoom: 17,
    pitch: 0,
    bearing: 0,
    mapStyle: "mapbox://styles/mapbox/satellite-v9",
  });
    // Track drone position
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

  const [geofenceData, setGeofenceData] = useState(null);
  const [altitude, setAltitude] = useState(50);
  const [horizontalFov, setHorizontalFov] = useState(60);
  const [waypoints, setWaypoints] = useState([]);
  const mapRef = useRef();




  // Drawing handlers
  const onDrawCreate = useCallback((event) => {
    const features = event.features;
    if (features.length > 0 && features[0].geometry.type === 'Polygon') {
      setGeofenceData(features[0]);
      setWaypoints([]);
    }
  }, []);

  const onDrawUpdate = useCallback((event) => {
    const features = event.features;
    if (features.length > 0 && features[0].geometry.type === 'Polygon') {
      setGeofenceData(features[0]);
      setWaypoints([]);
    }
  }, []);

  const onDrawDelete = useCallback(() => {
    setGeofenceData(null);
    setWaypoints([]);
  }, []);

  // Generate grid-based waypoints
  const generateWaypoints = useCallback(() => {
    if (!geofenceData) {
      alert('Please draw a geofence area first.');
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
      const width = turf.distance(
        [bbox[0], bbox[1]],
        [bbox[2], bbox[1]],
        { units: 'meters' }
      );
      const height = turf.distance(
        [bbox[0], bbox[1]],
        [bbox[0], bbox[3]],
        { units: 'meters' }
      );

      const cols = Math.ceil(width / subSquareSize);
      const rows = Math.ceil(height / subSquareSize);

      // Generate grid points
      const generatedWaypoints = [];
      const lngStep = (bbox[2] - bbox[0]) / cols;
      const latStep = (bbox[3] - bbox[1]) / rows;

      for (let row = 0; row < rows; row++) {
        const currentLat = bbox[1] + (row * latStep) + (latStep / 2);
        
        // Alternate direction for each row
        const colStart = row % 2 === 0 ? 0 : cols - 1;
        const colEnd = row % 2 === 0 ? cols : -1;
        const colStep = row % 2 === 0 ? 1 : -1;

        for (let col = colStart; col !== colEnd; col += colStep) {
          const currentLng = bbox[0] + (col * lngStep) + (lngStep / 2);
          const point = turf.point([currentLng, currentLat]);

          if (turf.booleanPointInPolygon(point, polygon)) {
            generatedWaypoints.push([currentLng, currentLat]);
          }
        }
      }

      setWaypoints(generatedWaypoints);
    } catch (error) {
      console.error('Error generating waypoints:', error);
      alert('Error generating waypoints. See console for details.');
    }
  }, [geofenceData, altitude, horizontalFov]);

  // Send data to backend
  const sendGeofenceData = async () => {
    if (!geofenceData || waypoints.length === 0) {
      alert('Please generate waypoints first.');
      return;
    }

    const payload = {
      geofenceBoundary: geofenceData.geometry.coordinates,
      waypoints: waypoints,
    };

    try {
      const response = await sendCommandWithPayload('geofence', payload);
      alert(response ? 'Mission sent successfully!' : 'Failed to send mission');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send mission');
    }
  };

//   // Fix for black map issue
//   useEffect(() => {
//     if (mapRef.current) {
//       const map = mapRef.current.getMap();
//       map.on('render', () => {
//         if (map.isStyleLoaded()) {
//           map.resize();
//         }
//       });
//     }
//   }, []);

  return (
    <div className="relative w-full h-full">
      {/* Compass */}
      <div className="absolute z-10 bottom-16 right-14 w-[100px] h-[100px]">
        <Compass direction={telemetry?.attitude?.yaw} />
      </div>

      {/* Map */}
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
        <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}>
          <div className="relative">
            <img
              src={droneSvg}
              alt="Drone"
              className="w-12 h-12 drop-shadow-lg transition-transform duration-500"
              style={{ transform: `rotate(${telemetry?.attitude?.yaw || 0}deg)` }}
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
                "fill-outline-color": "#0ff"
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
                  coordinates: waypoints
                }
              }}
            >
              <Layer
                id="waypoints-line"
                type="line"
                paint={{
                  "line-color": "#007cbf",
                  "line-width": 3
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
      <button
                onClick={() => setFollowDrone(true)}
                className="absolute top-5 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
            >
                Follow Drone
            </button>

      {/* Controls Panel */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded shadow-md z-10">
        <div className="flex flex-col space-y-3">
          {/* Mission Parameters */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium">Altitude (m)</label>
              <input
                type="number"
                value={altitude}
                onChange={(e) => setAltitude(Number(e.target.value))}
                className="w-full border rounded px-2 py-1 text-sm"
                min="10"
                step="5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">FOV (°)</label>
              <input
                type="number"
                value={horizontalFov}
                onChange={(e) => setHorizontalFov(Number(e.target.value))}
                className="w-full border rounded px-2 py-1 text-sm"
                min="30"
                max="120"
                step="5"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <button
            onClick={generateWaypoints}
            disabled={!geofenceData}
            className={`px-3 py-1.5 rounded text-sm ${!geofenceData ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
          >
            Generate Grid Waypoints
          </button>
          <button
            onClick={sendGeofenceData}
            disabled={!geofenceData || waypoints.length === 0}
            className={`px-3 py-1.5 rounded text-sm ${!geofenceData || waypoints.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
          >
            Send Mission
          </button>
        </div>
      </div>

      {/* Map Controls (Zoom, etc.) */}
      <div className="absolute bottom-4 right-4 z-10">
        <MapControls setViewState={setViewState} />
      </div>

      {/* Status Display */}
      {geofenceData && (
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-2 rounded shadow text-sm z-10">
          <p><strong>Grid Waypoints:</strong> {waypoints.length}</p>
          <p><strong>Altitude:</strong> {altitude}m | <strong>FOV:</strong> {horizontalFov}°</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;

