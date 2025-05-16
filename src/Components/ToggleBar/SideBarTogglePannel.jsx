import React from "react";
import icons from "../../assets/icons";

const SidebarTogglePanel = ({ isOpen, onToggle, children }) => {
  return (
    <div
      id="leftSide"
      className={`${isOpen ? "w-[25%] relative" : "w-0"} z-5 transition-all duration-800`}
    >
      <button
        onClick={onToggle}
        className={`absolute w-5 top-64 h-20 z-10 bg-backgroundSecondary ${
          isOpen ? "right-0 rounded-tl-md rounded-bl-md" : "rounded-tr-md rounded-br-md"
        }`}
      >
        <img
          src={icons.arrowToggle}
          alt="arrow"
          className={`w-5 h-5 transition duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Sidebar content goes here */}
      {isOpen && (
        <div className="p-2 overflow-y-auto h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default SidebarTogglePanel;
