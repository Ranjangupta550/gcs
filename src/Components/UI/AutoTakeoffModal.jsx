import React, { useState } from "react";
import {Button,showMessageBox} from "../../index";


export const AutoTakeoffModal = ({ onConfirm, onClose }) => {
  const [altitude, setAltitude] = useState("");
  const [duration,setDuration]=useState({
    hours:0,
    minutes:0,
    seconds:0
  });

  const handleSubmit = async () => {

    if (!altitude&&duration){
      await showMessageBox({
        title:"Enter Parameters properly",
        detail:"Enter valid altitude and time"
      })
       return
    };
    console.log("altitude" , altitude , "duration ", duration)
    onConfirm(Number(altitude),{...duration}); // pass altitude to parent
    setAltitude("");
    setDuration({
      hours: 0,
      minutes: 0,
      seconds: 0
    });

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
        <label className="mb-2 font-semibold text-white">Enter Flight Time:</label>
        
        <div className="flex gap-2 mb-4">
          <div className="flex flex-col items-center">
            <label className="text-white text-sm mb-1">Hours</label>
            <input 
              type="number"
              min="0"
              max="23"
              value={duration.hours || 0}
              onChange={(e) => setDuration({...duration, hours: parseInt(e.target.value) || 0})}
              className="p-2 border border-gray-500 rounded w-16 text-black text-center"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-white text-sm mb-1">Minutes</label>
            <input 
              type="number"
              min="0"
              max="59"
              value={duration.minutes || 0}
              onChange={(e) => setDuration({...duration, minutes: parseInt(e.target.value) || 0})}
              className="p-2 border border-gray-500 rounded w-16 text-black text-center"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-white text-sm mb-1">Seconds</label>
            <input 
              type="number"
              min="0"
              max="59"
              value={duration.seconds || 0}
              onChange={(e) => setDuration({...duration, seconds: parseInt(e.target.value) || 0})}
              className="p-2 border border-gray-500 rounded w-16 text-black text-center"
            />
          </div>
        </div>
   
        <div className="flex gap-2">
          <Button onClick={handleSubmit}>Start Takeoff</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
