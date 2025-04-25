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
<div className="flex relative flex-col items-center gap-2">
      {/* Heading label */}
      <h2 className="text-gray-300 absolute z-10 top-5 font-semibold text-sm">
        Heading: <span className="text-yellow-400">{directionName(heading)}</span> ({heading.toFixed(0)}°)
      </h2>

      {/* Compass container */}
      <div className="w-[250px] h-[250px] bg-black rounded-md relative flex items-center justify-center shadow-lg">

        {/* Top triangle pointer for North */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-yellow-400" />
        </div>

        {/* Rotating outer ring */}
        <div
          className="w-full h-full rounded-full shadow-inner relative transition-transform duration-300 flex items-center justify-center"
          style={{ transform: `rotate(-${heading}deg)` }}
        >
          {/* Tick marks */}
          {[...Array(36)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[3px] h-[12px] bg-gray-600"
              style={{
                transform: `rotate(${i * 10}deg) translateY(-65px)`,
                transformOrigin: "center center",
              }}
            />
          ))}

          {/* Cardinal directions */}
          {[0, 90, 180, 270].map((angle, i) => (
            <div
              key={angle}
              className="absolute z-10 text-gray-300 text-[15px] font-bold"
              style={{
                transform: `rotate(${angle}deg) translateY(-50px) rotate(-${angle}deg)`,
                transformOrigin: "center center",
              }}
            >
              {directionNames[i]}
            </div>
          ))}

          {/* Quadrant lines */}
          <div className="absolute w-[2px] h-full bg-gray-700" style={{ left: '50%', top: 0, transform: 'translateX(-50%)' }} />
          <div className="absolute h-[2px] w-full bg-gray-700" style={{ top: '50%', left: 0, transform: 'translateY(-50%)' }} />
        </div>

        {/* Center info bubble */}
        <div className="absolute w-[60px] h-[60px] rounded-full bg-yellow-500 z-10 shadow-lg flex flex-col items-center justify-center text-gray-900">
          <span className="text-[14px] font-bold">{directionName(heading)}</span>
          <span className="text-[14px]">{heading.toFixed(0)}°</span>
        </div>
      </div>
    </div>

  );
};

export default ReactCompass;
