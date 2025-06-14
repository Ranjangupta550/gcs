import React, { useState } from "react";
import { Button } from "../../index.js";
import { armStatus, connectionStatus, AutoTakeoffModal} from "../../index.js";
import icons from "../../assets/icons";
import { controlLand, sendAutoTakeoff } from "../../services/emitHandler.js";


function LandTakeoffControl() {
  const isConnected = connectionStatus((state) => state.isConnected);
  const isArmed = armStatus((state) => state.isArmed);
  const [showModal, setShowModal] = useState(false);
  const [autoTakeoffStarted, setAutoTakeoffStarted] = useState(false);

  const handleControl = async (actionType, action) => {
    if (!isConnected) return;

    try {
      let response;
      if (actionType === "land") {
        response = await controlLand(action);
      } else if (actionType === "autoTakeoff") {
        response = await sendAutoTakeoff(action);
        setAutoTakeoffStarted(true);
      }

      if (!response || response.error) {
        console.error(
          `${actionType} failed:`,
          response?.error || "Unknown error"
        );
      }
    } catch (error) {
      console.error(`Error in ${actionType}:`, error);
    }
  };

  const handleAutoTakeoff = async (altitude) => {
    try {
      await handleControl("autoTakeoff", altitude);
      setShowModal(false);
    } catch (err) {
      console.error("Takeoff failed:", err);
    }
  };

  return (
    <>
      <div className="absolute top-20 left-1 flex flex-col items-center gap-y-1 bg-backgroundSecondary rounded-lg p-1 ">
        <Button
          onClick={() => handleControl("land", "land")}
          disabled={!isConnected}
          className={`w-8 h-8  shadow-sm shadow-black rounded-md border border-black ${isConnected
            ? "bg-white opacity-100 hover:bg-gray-100 text-white"
            : "bg-white opacity-50 cursor-not-allowed"
          }`}
          useBaseStyles={false} // This disables the default base styles
            title="Land (L)"
            tooltipPlacement="right"

        >
            <img src={icons.land} alt="land" />
        </Button>
        
        <Button
          onClick={() => setShowModal(true)}
          disabled={!isConnected}
          className={`w-8 h-8 shadow-sm shadow-black border-black  rounded-md border ${isConnected
            ? autoTakeoffStarted
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-white hover:bg-gray-100 text-white opacity-100"
            : "bg-white opacity-50 cursor-not-allowed"
          }`}
          useBaseStyles={false} // This disables the default base styles
          title="Auto Takeoff (A)"
            tooltipPlacement="right"
        >
          <img src={icons.takeoff} alt="autotakeoff" />

        </Button>
      </div>

      {showModal && (
        <AutoTakeoffModal
          onConfirm={handleAutoTakeoff}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default LandTakeoffControl;