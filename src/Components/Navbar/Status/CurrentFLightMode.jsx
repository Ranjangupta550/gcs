import React, { useState, useEffect } from "react";
import { chnageFlightMode } from "../../../services/emitHandler";
import {connectionStatus,notify} from "../../../index"
const FLIGHT_MODES = [
  "STABILIZE",
  "ACRO",
  "ALT_HOLD",
  "AUTO",
  "GUIDED",
  "LOITER",
  "RTL",
  "CIRCLE",
  "LAND",
  "DRIFT",
  "SPORT",
  "FLIP",
  "AUTOTUNE",
  "POSHOLD",
  "BRAKE",
  "THROW",
  "AVOID_ADSB",
  "GUIDED_NOGPS",
  "SMART_RTL",
  "FLOWHOLD",
  "FOLLOW",
  "ZIGZAG",
  "SYSTEMID",
  "AUTOROTATE",
  "NEW_MODE",
];

function CurrentFlightMode({ mode = "NONE" }) {
  const [flightMode, setMode] = useState("N/A");
  const [showDropdown, setShowDropdown] = useState(false);
  const isConnected = connectionStatus((state) => state.isConnected);

  useEffect(() => {
    setMode(mode);
  }, [mode]);

  const handleModeChange = async (newMode) => {
    setShowDropdown(false); // Close the dropdown
    console.log("Selected flight mode:", newMode);
    const response = await chnageFlightMode(newMode);
    console.log("Response from flight mode change:", response);
    if (response) {
      notify(`Flight mode changed to ${newMode}`, "info");
    } else {
      notify(`Failed to change flight mode to ${newMode}`, "error");
    }
  };

  return (
    <div className="relative  inline-block text-white font-bold">
      <div
        className="flex items-center gap-2 cursor-pointer rounded-lg"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <button className="flex justify-center items-center text-center text-white w-14 h-7 px-1 py-1 rounded-lg border border-white border-opacity-80 hover:bg-red-600 transition-all duration-200
       "
       style={{ backgroundColor: isConnected ? "#FF0000" : "#000000" }}
          disabled={!isConnected}
          title="Change Flight Mode"  >
          Mode
        </button>
        <p className="text-gray-500 font-custom w-20 text-center">
          {flightMode}
        </p>
      </div>
      {(showDropdown && isConnected) && (
        <div className="absolute bg-backgroundSecondary text-white shadow-lg rounded-lg mt-2 z-10 w-48 max-h-64 overflow-y-auto">
          {FLIGHT_MODES.map((item) => (
            <div
              key={item}
              className={`px-4 py-2 mx-2 border-b border-opacity-20 border-white cursor-pointer text-[13px] text-center transition-all duration-200 ${
                item === flightMode
                  ? "bg-backgroundTertiary font-bold"
                  : "hover:bg-gray-600"
              }`}
              onClick={() => handleModeChange(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrentFlightMode;
