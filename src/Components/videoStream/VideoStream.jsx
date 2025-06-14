
import React, { useState, useEffect } from "react";

function VideoStream() {
  const [frame, setFrame] = useState(null);
  const [qrData, setQrData] = useState("");
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    console.log("🔄 Connecting to WebSocket...");
   

    

    ws.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
      setStatus("Error");
    };

    ws.onclose = () => {
      console.log("❌ WebSocket Disconnected");
      setStatus("Disconnected");
    };

    return () => {
      console.log("🔄 Cleaning up WebSocket...");
      ws.close();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h2 className="text-xl mb-4">Live Video Stream ({status})</h2>

      {frame ? (
        <img src={frame} alt="Processed Video Stream" className="w-[98%] h-[80%] border-2 border-gray-500" />
      ) : (
        <p>Waiting for video stream...</p>
      )}

      {qrData && (
        <div className="mt-4 p-2 bg-green-600 rounded">
          <p>QR Code Data: {qrData}</p>
        </div>
      )}
    </div>
  );
}

export default VideoStream;