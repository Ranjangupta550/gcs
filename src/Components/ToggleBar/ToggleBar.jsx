import React, { useState, useEffect } from "react";
import MinimizeSvg from "../../assets/ToogleBarSvg/MinimizeSvg.svg";
import CloseSvg from "../../assets/ToogleBarSvg/CloseSvg.svg";
import MaximizeSvg from "../../assets/ToogleBarSvg/MaximizeSquare.svg";
import RestoreSvg from "../../assets/ToogleBarSvg/RestoreSvg.svg";

function ToggleBar() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (window.api && window.api.receive) {
      window.api.receive("window-state-change", (state) => {
        setIsMaximized(state === "maximized");
      });
    } else {
      // alert("window.api.receive is not defined");
    }
  }, []);
  const handleMinimize = () => {
    window.api.send("minimize");
  };

  const handleMaximizeRestore = () => {
    if (isMaximized) {
      window.api.send("restore");
    } else {
      window.api.send("maximize");
    }
  };

  const handleClose = () => {
    window.api.send("close");
  };

  return (
    <div
      className="bg-togglebar flex items-center h-6 justify-between pl-2 border-b-2 border-zinc-500 "
      style={{ WebkitAppRegion: "drag" }} // Enable drag behavior
    >
      <p className="font-bold text-white">Sidak Ground Control Software</p>
      <div className="Togglemenu w-28 h-6 flex items-center justify-between"
      style={{ WebkitAppRegion: "no-drag" }} // Disable drag behavior
      >
        {/* Minimize Button */}
        <button
          id="minimizeButton"
          className="flex items-center justify-center h-full w-1/3 hover:bg-red-600 transition duration-300 ease-in-out active:bg-red-800"
          onClick={handleMinimize}
        >
          <img src={MinimizeSvg} alt="Minimize" className="w-6" />
        </button>
        {/* Maximize/Restore Button */}
        <button
          id="maximizeButton"
          className="flex items-center justify-center h-full w-1/3 hover:bg-red-600 transition duration-300 ease-in-out active:bg-red-800"
          onClick={handleMaximizeRestore}
        >
          <img src={isMaximized ? RestoreSvg : MaximizeSvg} alt="Maximize " className="w-5" />
        </button>
        {/* Close Button */}
        <button
          id="closeMenu"
          className="flex items-center justify-center h-full w-1/3 hover:bg-red-600 transition duration-300 ease-in-out active:bg-red-800"
          onClick={handleClose}
        >
          <img src={CloseSvg} alt="Close" className="w-4" />
        </button>
      </div>
    </div>
  );
}

export default ToggleBar;
