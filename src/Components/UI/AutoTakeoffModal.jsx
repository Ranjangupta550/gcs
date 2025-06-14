import React, { useState } from "react";
import {Button} from "../../index";

export const AutoTakeoffModal = ({ onConfirm, onClose }) => {
  const [altitude, setAltitude] = useState("");

  const handleSubmit = () => {
    if (!altitude) return;
    onConfirm(Number(altitude)); // pass altitude to parent
    setAltitude("");
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-backgroundQuaternary p-4 rounded shadow-md flex flex-col items-center">
        <label className="mb-2 font-semibold text-white">Enter Altitude (m):</label>
        <input
          type="number"
          value={altitude}
          onChange={(e) => setAltitude(e.target.value)}
          className="p-2 border border-gray-500 rounded w-48 text-black mb-4"
        />
        <div className="flex gap-2">
          <Button onClick={handleSubmit}>Start Takeoff</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
