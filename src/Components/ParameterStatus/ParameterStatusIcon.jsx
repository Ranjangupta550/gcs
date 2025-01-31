import React, { memo, useMemo } from "react";

const ParameterStatusIcon = memo(({ type = null, level = 0 }) => {
  const svgRanges = {
    Battery: [0, 25, 50, 75, 100],
    Network: [0, 20, 40, 60, 80, 100],
    GPS: [0, 25, 50, 75, 100],
    
  };

  const svgsPath = `src/assets/NavBarSvg/${type}/`;


  // Memoize the range and file calculation
  const { svgFile } = useMemo(() => {
    const ranges = svgRanges[type] || [];
    const safeLevel = ranges.findIndex((value) => level <= value);
    const svgIndex = safeLevel === -1 ? ranges.length - 1 : safeLevel;

    return { svgFile: `${svgsPath}${type}.${svgIndex}.svg` };
  }, [type, level]);
  // console.log(svgFile);

  return (
    <div className="flex items-center space-x-2">
      <img src={svgFile} alt={`${type} Level`} className="w-8 h-8" />
    </div>
  );
});

export default ParameterStatusIcon;
