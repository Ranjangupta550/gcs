import React, { useState } from "react";
import Loader from "./Loader";

function ControlButton({ label, command, sendCommand, isEnabled, shortcut, isConnectionButton }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!isEnabled || isLoading) return;

    setIsLoading(true); // Start loading animation
    await sendCommand(command);
    setIsLoading(false); // Stop loading animation when done
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isEnabled || isLoading}
      className={`px-1 py-2 m-2 text-white font-bold rounded transition-all duration-200 w-36 h-18 flex items-center justify-center
        ${isEnabled
          ? (isConnectionButton ? "bg-green-500 hover:bg-green-700 active:bg-green-900" : "bg-blue-500 hover:bg-blue-700 active:bg-blue-900")
          : "bg-red-500 cursor-not-allowed opacity-50"
        }`}
    >
      {isLoading ? <Loader /> : label} {/* Show Loader if loading */}
      {!isLoading && shortcut && <span className="text-xs ml-2">[{shortcut}]</span>}
    </button>
  );
}

export default ControlButton;
