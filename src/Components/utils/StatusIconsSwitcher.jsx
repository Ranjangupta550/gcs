import React, { memo, useMemo } from "react";

const ParameterStatusIcon = memo(({ type = null, level = 0, name = "" }) => {
  const svgRanges = {
    Battery: [0, 25, 50, 75, 100],
    Network: [0, 20, 40, 60, 80, 100],
    GPS: [0, 25, 50, 75, 100],
  };

  const svgsPath = `src/assets/NavBarSvg/${type}/`;

  const { svgFile } = useMemo(() => {
    const ranges = svgRanges[type] || [];
    const safeLevel = ranges.findIndex((value) => level <= value);
    const svgIndex = safeLevel === -1 ? ranges.length - 1 : safeLevel;

    return { svgFile: `${svgsPath}${type}.${svgIndex}.svg` };
  }, [type, level]);

  return (
    <div className="flex items-center space-x-2 justify-center flex-col w-12 h-7">
      <div className="flex items-center space-x-1">
        <img src={svgFile} alt={`${type} Level`} className="w-6 h-6" />
        <span className="text-xs text-gray-500">{level}%</span>
      </div>
    </div>
  );
});

export default ParameterStatusIcon;
