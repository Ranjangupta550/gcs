




import React, { useState, useEffect } from "react";
import { chnageFlightMode } from "../../../api/droneapi";
// import Notification from "../../../utils/Notification";

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

function CurrentFlightMode({ mode="NONE" }) {
  const [flightMode, setMode] = useState("N/A");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setMode(mode);
  }, [mode]);

  const handleModeChange = async (newMode) => {
    setShowDropdown(false); // Close the dropdown
    console.log("Selected flight mode:", newMode);
    const response = await chnageFlightMode(newMode);

    if (response) {
      Notification("success", `Flight mode changed to ${newMode}`);
    } else {
      Notification("error", `Failed to change flight mode to ${newMode}`);
    }
  };

  return (
    <div className="relative  inline-block text-gray-500 font-bold">
      <div
        className="flex items-center gap-2 cursor-pointer rounded-lg"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <button className="bg-red-500 flex justify-center items-center text-center text-white w-14 h-7 px-1 py-1 rounded-lg hover:bg-red-600 transition-all duration-200">
          Mode
        </button>
        <p className="text-gray-500 font-custom w-20 text-center">{flightMode}</p>
      </div>
      {showDropdown && (
        <div className="absolute bg-black text-white shadow-lg rounded-lg mt-2 z-10 w-48 max-h-64 overflow-y-auto">
          {FLIGHT_MODES.map((item) => (
            <div
              key={item}
              className={`px-4 py-2 cursor-pointer text-sm text-center transition-all duration-200 ${
                item === flightMode ? "bg-gray-600 font-bold" : "hover:bg-gray-600"
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


