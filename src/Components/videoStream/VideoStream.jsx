import React, { useState } from "react";
import ToggleBar from "../ToggleBar/ToggleBar";

function VideoStream() {
  const [showControls, setShowControls] = useState(true);

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
     

      {/* Close Button */}
      {/* <button
        onClick={() => window.api.send("close-video-window")}
        className="absolute top-4 left-4 bg-red-500 px-4 py-2 rounded"
      >
        Close
      </button> */}

      {/* Toggle Controls Button */}
      {/* <button
        onClick={toggleControls}
        className="absolute top-4 right-4 bg-blue-500 px-4 py-2 rounded"
      >
        {showControls ? "Hide Controls" : "Show Controls"}
      </button> */}

      {/* Video Stream (Updated YouTube Embed Link) */}
      <iframe
        src="http://192.168.29.102"
        className="w-[98%] h-[98%] border-2 border-gray-500"
        allowFullScreen
      ></iframe>

      {/* Custom Controls */}
      {/* {showControls && (
        <div className="mt-4 flex gap-4">
          <button className="bg-green-500 px-4 py-2 rounded">Start Stream</button>
          <button className="bg-red-500 px-4 py-2 rounded">Stop Stream</button>
          <button className="bg-yellow-500 px-4 py-2 rounded">Record</button>
        </div>
      )} */}
    </div>
  );
}

export default VideoStream;
