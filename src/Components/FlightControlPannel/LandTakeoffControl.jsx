import React, { useState } from "react";
import { Button, showMessageBox } from "../../index.js";
import { armStatus, connectionStatus, AutoTakeoffModal } from "../../index.js";
import icons from "../../assets/icons";
import { controlLand, sendAutoTakeoff } from "../../services/emitHandler.js";
import MissionStatus from "../UI/MissionStatus.jsx";

function LandTakeoffControl() {
  const isConnected = connectionStatus((state) => state.isConnected);
  const isArmed = armStatus((state) => state.isArmed);
  const [showModal, setShowModal] = useState(false);
  const [autoTakeoffStarted, setAutoTakeoffStarted] = useState(false);
  const [missionStatus, setMissionStatus] = useState("");

  const handleControl = async (actionType, action) => {
    if (!isConnected) return;
    try {
      if (actionType === "land") {
        const conformationMessage = await showMessageBox({
          type: "warning",
          message: "Are you sure you want to land?",
        });
        if (conformationMessage.response === 0) {
          await controlLand(action);
        }
      } else if (actionType === "autoTakeoff") {
        // 🚀 show mission started
        setMissionStatus("Mission Started");
        setAutoTakeoffStarted(true);

        // small delay before "in progress"
        setTimeout(() => setMissionStatus("Mission in progress, please wait..."), 1000);

        const response = await sendAutoTakeoff(action);

        if (response === true) {
          // ✅ show completed before removing
          // setMissionStatus("Mission Completed ✅");
          setTimeout(() => {
            setMissionStatus("");
            setAutoTakeoffStarted(false);
          }, 2000);
        } else {
          setAutoTakeoffStarted(false);
          setMissionStatus("Mission Failed ❌");
          setTimeout(() => setMissionStatus(""), 1000);
        }
      }
    } catch (error) {
      console.error(`Error in ${actionType}:`, error);
      setMissionStatus("Mission Failed ❌");
      setTimeout(() => setMissionStatus(""), 2000);
    }
  };

  const handleAutoTakeoff = async (altitude, duration) => {
    try {
      const conformationMessage = await showMessageBox({
        type: "warning",
        message: "Are you sure you want to take-off?",
        detail: `Drone will automaticaly airborn at given ${altitude} altitude for ${duration?.hours} hour ${duration?.minutes} minute ${duration?.seconds} seconds`,
      });
      if (conformationMessage.response === 0) {
        setShowModal(false);
        await handleControl("autoTakeoff", { altitude, duration });
      }
    } catch (err) {
      console.error("Takeoff failed:", err);
    }
  };

  return (
    <>
      <div className="absolute top-20 left-1 flex flex-col items-center gap-y-1 bg-backgroundSecondary rounded-lg p-1 ">
        {/* Land button */}
        <Button
          onClick={() => handleControl("land", "land")}
          disabled={!isConnected}
          className={`w-8 h-8 shadow-sm shadow-black rounded-md border border-black ${
            isConnected
              ? "bg-white opacity-100 hover:bg-gray-100 text-white"
              : "bg-white opacity-50 cursor-not-allowed"
          }`}
          useBaseStyles={false}
          title="Land (L)"
          tooltipPlacement="right"
        >
          <img src={icons.land} alt="land" />
        </Button>

        {/* Auto takeoff button */}
        <Button
          onClick={async () => {
            const conformationMessage = await showMessageBox({
              type: "warning",
              message: "Are you sure you want to use Auto-takeoff?",
              detail:
                "You have to enter Altiitude and time then your drone will Auto-takeoff at given height for given time",
            });
            if (conformationMessage.response === 0) {
              setShowModal(true);
            }
          }}
          disabled={!isConnected}
          className={`w-8 h-8 shadow-sm shadow-black border-black rounded-md border ${
            isConnected
              ? autoTakeoffStarted
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-white hover:bg-gray-100 text-white opacity-100"
              : "bg-white opacity-50 cursor-not-allowed"
          }`}
          useBaseStyles={false}
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

      {/* MissionStatus in top-right */}
      {missionStatus && <MissionStatus status={missionStatus} />}
    </>
  );
}

export default LandTakeoffControl;
