import React from "react";

function ControlButton({ label, command, sendCommand, isEnabled, shortcut, isConnectionButton }) {
  return (
    <button
      onClick={() => sendCommand(command)}
      disabled={!isEnabled}
      className={`px-1 py-2 m-2 text-white font-bold rounded transition-all duration-200 w-36 h-18
        ${isEnabled
          ? (isConnectionButton ? "bg-green-500 hover:bg-green-700 active:bg-green-900" : "bg-blue-500 hover:bg-blue-700 active:bg-blue-900")
          : "bg-red-500 cursor-not-allowed opacity-50"
        }`}
    >
      {label} {shortcut && <span className="text-xs">[{shortcut}]</span>}
    </button>
  );
}

export default ControlButton;