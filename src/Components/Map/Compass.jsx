import React, { useState, useEffect } from "react";

const ReactCompass = ({ direction = 0 }) => {
  const [heading, setHeading] = useState(0);

  const directionNames = ["N", "E", "S", "W"];

  // Convert yaw (-180 to 180) into (0 to 360)
  const normalizeYaw = (yaw) => {
    if (yaw === undefined || yaw === null) return 0; // Default case
    let normalized = yaw % 360;
    return normalized < 0 ? normalized + 360 : normalized; // Ensure 0° to 359°
};

  useEffect(() => {
    const newHeading = normalizeYaw(direction);
    if (newHeading !== heading) {
      setHeading(newHeading);
    }
  }, [direction]); // Update only when direction changes

  // Get direction name (N, E, S, W)
  const directionName = (dir) => {
    let sections = directionNames.length;
    let sect = 360 / sections;
    let x = Math.floor((dir + sect / 2) / sect);
    return directionNames[x >= sections ? 0 : x];
  };

  return (
    <div className="w-[140px] h-[140px] relative flex items-center justify-center">
      {/* Outer Compass Ring */}
      <div
        className="w-full h-full rounded-full bg-[#2c332bdb] border-[4px] border-[#07060862] shadow-inner relative transition-transform duration-300 flex items-center justify-center"
        style={{ transform: `rotate(-${heading}deg)` }} // Rotate properly
      >
        {[...Array(36)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[8px] bg-white"
            style={{
              transform: `rotate(${i * 10}deg) translateY(-65px)`,
              transformOrigin: "center center",
            }}
          ></div>
        ))}
        {[0, 90, 180, 270].map((angle, i) => (
          <div
            key={angle}
            className="absolute text-white text-[15px] font-bold"
            style={{
              transform: `rotate(${angle}deg) translateY(-50px) rotate(-${angle}deg)`,
              transformOrigin: "center center",
            }}
          >
            {directionNames[i]}
          </div>
        ))}
      </div>

      {/* Inner Compass Needle */}
      <div className="absolute w-[50px] h-[50px] rounded-full bg-[#bbd2be6b] z-10 shadow-lg flex flex-col items-center justify-center text-white">
        <span className="text-[14px] font-bold">{directionName(heading)}</span>
        <span className="text-[12px]">{heading.toFixed(0)}°</span>
      </div>
    </div>
  );
};

export default ReactCompass;
