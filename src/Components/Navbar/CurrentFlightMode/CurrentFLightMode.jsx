import React, { useEffect } from "react";
import { useState,useCallback } from "react"; 
import ModeSvg from "../../../assets/Mode.svg";
function CurrentFlightMode({ mode }) {
  const [flightMode, setMode] = useState("N/A");
  useEffect(() => {
    setMode(mode);
  }, [mode]);
  return (
    <div className="flex relative items-center  text-white gap-2 w-">
        <div className="flex items-center">
            <img src={ModeSvg} alt="" className="w-10" />
            
        </div>
      <p className="text-white font-bold  w-16 flex items-center justify-center">{flightMode}</p>
    </div>
  );
}
export default CurrentFlightMode;