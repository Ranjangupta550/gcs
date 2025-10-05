import React, { useState, useEffect, useRef } from "react";
import { sendFollowMeStart,sendFollowMeStop,sendFollowMeLand,sendRTL } from "../../services/emitHandler";
import MissionStatus from "../UI/MissionStatus";

import { X } from "lucide-react"; // simple close icon

const FollowMe = () => {
  const [altitude, setAltitude] = useState("");
  const [isFollowActive, setIsFollowActive] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const gpsInterval = useRef(null);

  const confirmAction = async (message, type = "question") => {
    const result = await window.api.showMessageBox({
      type,
      buttons: ["Yes", "Cancel"],
      defaultId: 0,
      cancelId: 1,
      title: "Confirm Action",
      message,
    });
    return result.response === 0;
  };

  const handleStartFollowMe = async () => {
    const confirmed = await confirmAction("Start Follow Me mode?");
    if (!confirmed) return;

    if (!altitude) {
      await window.api.showMessageBox({
        type: "error",
        title: "Missing Altitude",
        message: "Please enter altitude before starting Follow Me.",
      });
      return;
    }
    setIsPopupOpen(false);
    
    const success = await sendFollowMeStart(parseFloat(altitude));
    if (!success) return;
    setIsFollowActive(true);


   // ✅ Auto close popup after starting

    gpsInterval.current = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const gpsData = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            altitude: pos.coords.altitude || parseFloat(altitude),
          };
        //   socket.emit("follow_me/gps_update", gpsData);
        });
      }
    }, 2000);
  };

  const handleStopFollowMe = async () => {
    const confirmed = await confirmAction("Stop Follow Me mode?");
    if (!confirmed) return;

    if (gpsInterval.current) clearInterval(gpsInterval.current);
    await sendFollowMeStop();
    setIsFollowActive(false);
  };

  const handleRTL = async () => {
    const confirmed = await sendRTL();
    if (!confirmed) return;
  };

  const handleLand = async () => {
    const confirmed = await sendFollowMeLand();
    if (!confirmed) return;

   
  };

  useEffect(() => {
    return () => {
      if (gpsInterval.current) clearInterval(gpsInterval.current);
    };
  }, []);

return (
    <>
      {/* 🔹 Small Toggle Button on Map Left Toolbar */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="absolute top-48 left-2 bg-gray-900 text-white p-2 rounded-lg shadow-md hover:bg-gray-700"
        title="Follow Me"
      >
        📡
      </button>

      {/* 🔹 Center Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="p-4 bg-gray-900 text-white rounded-2xl shadow-lg w-[300px] relative">
            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-red-400"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Follow Me Mode
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="number"
                value={altitude}
                onChange={(e) => setAltitude(e.target.value)}
                placeholder="Enter Altitude (m)"
                className="p-2 rounded-md text-black"
              />

              {!isFollowActive ? (
                <button
                  onClick={handleStartFollowMe}
                  className="bg-green-600 hover:bg-green-700 rounded-md py-2 transition"
                >
                  Start Follow Me
                </button>
              ) : (
                <button
                  onClick={handleStopFollowMe}
                  className="bg-red-600 hover:bg-red-700 rounded-md py-2 transition"
                >
                  Stop Follow Me
                </button>
              )}

              <button
                onClick={handleRTL}
                className="bg-blue-600 hover:bg-blue-700 rounded-md py-2 transition"
              >
                Return to Launch
              </button>

              <button
                onClick={handleLand}
                className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-md py-2 transition"
              >
                Land
              </button>
            </div>
          </div>
        </div>
      )}

      {isFollowActive && (
        <div className="absolute w-52 h-5 left-0 bottom-16 z-50">
          <MissionStatus status={"follow me in progress"} />
        </div>
      )}
    </>
  );
};

export default FollowMe;
