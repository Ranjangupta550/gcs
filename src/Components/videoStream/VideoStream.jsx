
import React, { useState, useEffect } from "react";

function VideoStream() {
  const [frame, setFrame] = useState(null);
  const [qrData, setQrData] = useState("");
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    console.log("🔄 Connecting to WebSocket...");
    const ws = new WebSocket("ws://localhost:3000"); // Instead of 0.0.0.0
    // Match Python WebSocket port

    ws.onopen = () => {
      console.log("✅ WebSocket Connected");
      setStatus("Connected");
      ws.send(JSON.stringify({ message: "Hello from React!" })); // Test message to Python
    };

    ws.onmessage = (event) => {
      console.log("📩 Message received from WebSocket:", event.data);
      const data = JSON.parse(event.data);

      if (data.type === "frame") {
        setFrame(data.data); // Set video frame
        if (data.qr_data) {
          setQrData(data.qr_data); // Extracted QR code data
        }
      }
    };

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