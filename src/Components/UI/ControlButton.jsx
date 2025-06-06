import React, { useState } from "react";
import Loader from "./Loader";

function ControlButton({
  label,
  command,
  sendCommand,
  isEnabled,
  shortcut,
  isConnectionButton,
  className = "",
}) {
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
      className={`p-1 border-2 border-borderColor text-white text-[11px] rounded-lg  font-bold  transition-all duration-200 w-[100px] h-10  flex items-center justify-center
        ${
          isEnabled
            ? isConnectionButton
              ? "bg-backgroundSecondary hover:bg-[#2a2a2a] active:bg-[#333333] text-white transition-colors duration-200"
              : "bg-backgroundQuaternary hover:bg-[#3a3a3a] active:bg-[#454545] text-white transition-colors duration-200"
            : "bg-[#000000] border-black cursor-not-allowed opacity-50 text-gray-400"
        } ${className} ${isLoading ? "cursor-wait" : ""}`}
    >
      {isLoading ? <Loader /> : label} {/* Show Loader if loading */}
      {!isLoading && shortcut && (
        <span className="text-[10px]">[{shortcut}]</span>
      )}
    </button>
  );
}

export default ControlButton;
