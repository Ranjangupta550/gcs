import { sendGpsData } from "../../services/emitHandler";

// --- THE SWITCH ---
// Set this to 'false' when you have your real GPS module ready.
const USE_SIMULATOR = true;

// --- SIMULATOR LOGIC ---
const INDIA_GATE = { lat: 28.6129, lon: 77.2295 };
const NOIDA_SEC_132 = { lat: 28.5173, lon: 77.3688 };
const SIMULATION_SPEED_KMH = 20; // Average speed of 20 km/h
const UPDATE_INTERVAL_MS = 1000; // 1 second

let simulationInterval = null;
let currentLat = INDIA_GATE.lat;
let currentLon = INDIA_GATE.lon;

function startSimulation(targetAltitude) {
  // Stop any previously running simulation
  if (simulationInterval) clearInterval(simulationInterval);
  
  // Reset starting position
  currentLat = INDIA_GATE.lat;
  currentLon = INDIA_GATE.lon;

  console.log(`[SIMULATOR] Starting GPS simulation from India Gate to Noida.`);

  simulationInterval = setInterval(() => {
    // Simple straight-line movement logic
    const remainingLat = NOIDA_SEC_132.lat - currentLat;
    const remainingLon = NOIDA_SEC_132.lon - currentLon;

    // Check if we've arrived
    if (Math.abs(remainingLat) < 0.0001 && Math.abs(remainingLon) < 0.0001) {
      stopGpsProvider();
      console.log("[SIMULATOR] Reached destination.");
      return;
    }

    // Move a small fraction of the remaining distance
    currentLat += remainingLat / 100;
    currentLon += remainingLon / 100;
    
    // Add a tiny random offset to mimic human movement
    const latOffset = (Math.random() - 0.5) * 0.0001;
    const lonOffset = (Math.random() - 0.5) * 0.0001;

    const gpsData = {
      latitude: currentLat + latOffset,
      longitude: currentLon + lonOffset,
      altitude: targetAltitude,
    };

    // Send the simulated GPS data
    sendGpsData(gpsData);
    console.log("[SIMULATOR] Sent GPS update:", gpsData);

  }, UPDATE_INTERVAL_MS);
}

// --- REAL GPS LOGIC (FOR THE FUTURE) ---
function startRealGps(targetAltitude) {
  console.log("[REAL GPS] Starting to read from USB GPS module...");
  //
  // In the future, you will add your code here to:
  // 1. Connect to the serial port of your USB GPS.
  // 2. Read the NMEA sentences.
  // 3. Parse the data.
  // 4. Create a gpsData object.
  // 5. Call `sendGpsUpdate(gpsData)` inside a loop.
  //
}

function stopRealGps() {
  console.log("[REAL GPS] Stopping the GPS reader.");
  // In the future, add your code here to close the serial port connection.
}

// --- EXPORTED FUNCTIONS ---
// These are the only functions your React component will use.

export const startGpsProvider = (altitude) => {
  if (USE_SIMULATOR) {
    startSimulation(altitude);
  } else {
    startRealGps(altitude);
  }
};

export const stopGpsProvider = () => {
  if (USE_SIMULATOR) {
    if (simulationInterval) {
       clearInterval(simulationInterval);
       simulationInterval = null;
       console.log("[SIMULATOR] Stopped.");
    }
  } else {
    stopRealGps();
  }
};