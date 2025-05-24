// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Map, { Marker, Source, Layer, useControl } from "react-map-gl";
// import MapboxDraw from "@mapbox/mapbox-gl-draw";
// import * as turf from '@turf/turf';
// import "mapbox-gl/dist/mapbox-gl.css";
// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
// import droneSvg from "../../assets/Svg/DroneSvg.svg";
// import useTelemetry from "../../Global/centralTelemetry";
// import MapControls from "./MapControls";
// import Compass from "./compass";
// import { sendCommandWithPayload } from "../../api/api";

// // MapboxDraw Control Component
// function MapboxDrawControl(props) {
//   useControl(
//     () => new MapboxDraw(props),
//     ({ map }) => {
//       map.on('draw.create', props.onCreate);
//       map.on('draw.update', props.onUpdate);
//       map.on('draw.delete', props.onDelete);
//     },
//     ({ map }) => {
//       map.off('draw.create', props.onCreate);
//       map.off('draw.update', props.onUpdate);
//       map.off('draw.delete', props.onDelete);
//     },
//     { position: props.position }
//   );
//   return null;
// }

// const DEFAULT_LOCATION = {
//   longitude: 77.5083,
//   latitude: 28.4829,
// };

// const roundTo4 = (num) => (num ? parseFloat(num.toFixed(4)) : 0);

// const MapComponent = () => {
//   const telemetry = useTelemetry();
//   const isConnected = telemetry?.nav?.longitude !== undefined && telemetry?.nav?.latitude !== undefined;

//   const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
//   const [followDrone, setFollowDrone] = useState(true);
//   const [viewState, setViewState] = useState({
//     longitude: DEFAULT_LOCATION.longitude,
//     latitude: DEFAULT_LOCATION.latitude,
//     zoom: 17,
//     pitch: 0,
//     bearing: 0,
//     mapStyle: "mapbox://styles/mapbox/satellite-v9",
//   });

//   const [geofenceData, setGeofenceData] = useState(null);
//   const [centerPoint, setCenterPoint] = useState(null);
//   const [altitude, setAltitude] = useState(50);
//   const [horizontalFov, setHorizontalFov] = useState(60);
//   const [waypoints, setWaypoints] = useState([]);
//   const mapRef = useRef();

//   // Track drone position
//   useEffect(() => {
//     if (isConnected && telemetry?.nav) {
//       const newPos = {
//         longitude: roundTo4(telemetry.nav.longitude || DEFAULT_LOCATION.longitude),
//         latitude: roundTo4(telemetry.nav.latitude || DEFAULT_LOCATION.latitude),
//       };
//       setUserLocation(newPos);

//       if (followDrone && mapRef.current) {
//         mapRef.current.flyTo({
//           center: [newPos.longitude, newPos.latitude],
//           speed: 1.2,
//           curve: 1,
//           essential: true
//         });
//       }
//     }
//   }, [telemetry?.nav?.longitude, telemetry?.nav?.latitude, isConnected, followDrone]);

//   // Drawing handlers
//   const onDrawCreate = useCallback((event) => {
//     const features = event.features;
//     if (features.length > 0 && features[0].geometry.type === 'Polygon') {
//       const polygonFeature = features[0];
//       setGeofenceData(polygonFeature);
//       const center = turf.centerOfMass(polygonFeature);
//       setCenterPoint(center);
//       setWaypoints([]);
//     }
//   }, []);

//   const onDrawUpdate = useCallback((event) => {
//     const features = event.features;
//     if (features.length > 0 && features[0].geometry.type === 'Polygon') {
//       const polygonFeature = features[0];
//       setGeofenceData(polygonFeature);
//       const center = turf.centerOfMass(polygonFeature);
//       setCenterPoint(center);
//       setWaypoints([]);
//     }
//   }, []);

//   const onDrawDelete = useCallback(() => {
//     setGeofenceData(null);
//     setCenterPoint(null);
//     setWaypoints([]);
//   }, []);

//   // Generate waypoints in a grid pattern within the geofence
//   const generateWaypoints = useCallback(() => {
//     if (!geofenceData) {
//       alert('Please draw a geofence area first.');
//       return;
//     }

//     try {
//       const polygon = turf.polygon(geofenceData.geometry.coordinates);
//       const bbox = turf.bbox(polygon);
//       const fovRadians = (horizontalFov * Math.PI) / 180;
//       const groundWidth = 2 * altitude * Math.tan(fovRadians / 2);
//       const spacing = groundWidth * 0.8; // 80% overlap

//       // Generate scan lines
//       const minLat = bbox[1];
//       const maxLat = bbox[3];
//       const minLng = bbox[0];
//       const maxLng = bbox[2];

//       const generatedWaypoints = [];
//       let currentLat = maxLat;
//       let goingDown = true;

//       while (currentLat >= minLat) {
//         const line = turf.lineString([
//           [minLng, currentLat],
//           [maxLng, currentLat]
//         ]);

//         // Calculate distance in meters
//         const lineLength = turf.length(line, { units: 'meters' });
//         const numPoints = Math.ceil(lineLength / spacing);
//         const step = lineLength / numPoints;

//         // Generate points along the line
//         for (let i = 0; i <= numPoints; i++) {
//           const distance = i * step;
//           const point = turf.along(line, distance, { units: 'meters' });
          
//           if (turf.booleanPointInPolygon(point, polygon)) {
//             generatedWaypoints.push(point.geometry.coordinates);
//           }
//         }

//         currentLat -= spacing / 111319.9; // Convert meters to degrees
//         goingDown = !goingDown;
//       }

//       setWaypoints(generatedWaypoints);
//     } catch (error) {
//       console.error('Error generating waypoints:', error);
//       alert('Error generating waypoints. See console for details.');
//     }
//   }, [geofenceData, altitude, horizontalFov]);

//   // Send data to backend
//   const sendGeofenceData = async () => {
//     if (!geofenceData || !centerPoint) {
//       alert('Please draw a geofence area first.');
//       return;
//     }

//     const payload = {
//       geofenceBoundary: geofenceData.geometry.coordinates,
//       center: centerPoint.geometry.coordinates,
//       waypoints: waypoints,
//     };

//     try {
//       const response = await sendCommandWithPayload('geofence', payload);
//       alert(response ? 'Data sent successfully!' : 'Failed to send data');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to send data');
//     }
//   };

//   return (
//     <div className="relative w-full h-full">
//       {/* Compass */}
//       <div className="absolute z-10 bottom-16 right-14 w-[100px] h-[100px]">
//         <Compass direction={telemetry?.attitude?.yaw} />
//       </div>

//       {/* Map */}
//       <Map
//         {...viewState}
//         ref={mapRef}
//         mapboxAccessToken="pk.eyJ1IjoicmFuamFuLTk4MzciLCJhIjoiY200eno4ZnBoMThzZTJpc2Nia2Zma2gyNiJ9.hszQOHoScU6INliFAnReZA"
//         onMove={(evt) => {
//           setViewState(evt.viewState);
//           if (evt.viewState.longitude !== userLocation.longitude || 
//               evt.viewState.latitude !== userLocation.latitude) {
//             setFollowDrone(false);
//           }
//         }}
//         style={{ width: "100%", height: "100%" }}
//         mapStyle={viewState.mapStyle}
//       >
//         {/* Drone Marker */}
//         <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}>
//           <div className="relative">
//             <img
//               src={droneSvg}
//               alt="Drone"
//               className="w-12 h-12 drop-shadow-lg"
//               style={{ transform: `rotate(${telemetry?.attitude?.yaw || 0}deg)` }}
//             />
//           </div>
//         </Marker>

//         {/* Drawing Control */}
//         <MapboxDrawControl
//           position="top-left"
//           displayControlsDefault={false}
//           controls={{ polygon: true, trash: true }}
//           onCreate={onDrawCreate}
//           onUpdate={onDrawUpdate}
//           onDelete={onDrawDelete}
//         />

//         {/* Geofence Area */}
//         {geofenceData && (
//           <Source
//             type="geojson"
//             data={geofenceData}
//           >
//             <Layer
//               id="geofence-area"
//               type="fill"
//               paint={{
//                 "fill-color": "#088",
//                 "fill-opacity": 0.2,
//                 "fill-outline-color": "#0ff"
//               }}
//             />
//           </Source>
//         )}

//         {/* Waypoints */}
//         {waypoints.length > 0 && (
//           <>
//             <Source
//               type="geojson"
//               data={{
//                 type: "Feature",
//                 properties: {},
//                 geometry: {
//                   type: "LineString",
//                   coordinates: waypoints
//                 }
//               }}
//             >
//               <Layer
//                 id="waypoints-line"
//                 type="line"
//                 paint={{
//                   "line-color": "#007cbf",
//                   "line-width": 3
//                 }}
//               />
//             </Source>
//             {waypoints.map((coord, index) => (
//               <Marker key={index} longitude={coord[0]} latitude={coord[1]}>
//                 <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//               </Marker>
//             ))}
//           </>
//         )}
//       </Map>

//       {/* Controls Panel */}
//       <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded shadow-md z-10">
//         <div className="flex flex-col space-y-3">
//           {/* Follow Controls */}
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setFollowDrone(true)}
//               className={`px-3 py-1 rounded ${followDrone ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             >
//               Follow Drone
//             </button>
//             <button
//               onClick={() => setFollowDrone(false)}
//               className={`px-3 py-1 rounded ${!followDrone ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             >
//               Free View
//             </button>
//           </div>

//           {/* Mission Parameters */}
//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <label className="block text-sm font-medium">Altitude (m)</label>
//               <input
//                 type="number"
//                 value={altitude}
//                 onChange={(e) => setAltitude(Number(e.target.value))}
//                 className="w-full border rounded px-2 py-1 text-sm"
//                 min="10"
//                 step="5"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">FOV (°)</label>
//               <input
//                 type="number"
//                 value={horizontalFov}
//                 onChange={(e) => setHorizontalFov(Number(e.target.value))}
//                 className="w-full border rounded px-2 py-1 text-sm"
//                 min="30"
//                 max="120"
//                 step="5"
//               />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <button
//             onClick={generateWaypoints}
//             disabled={!geofenceData}
//             className={`px-3 py-1.5 rounded text-sm ${!geofenceData ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
//           >
//             Generate Waypoints
//           </button>
//           <button
//             onClick={sendGeofenceData}
//             disabled={!geofenceData || waypoints.length === 0}
//             className={`px-3 py-1.5 rounded text-sm ${!geofenceData || waypoints.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
//           >
//             Send Mission Data
//           </button>
//         </div>
//       </div>

//       {/* Map Controls (Zoom, etc.) */}
//       <div className="absolute bottom-4 right-4 z-10">
//         <MapControls setViewState={setViewState} />
//       </div>

//       {/* Status Display */}
//       {geofenceData && (
//         <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-2 rounded shadow text-sm z-10">
//           <p><strong>Geofence:</strong> Active</p>
//           <p><strong>Waypoints:</strong> {waypoints.length}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapComponent;

