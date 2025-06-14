import React, { memo, useMemo } from 'react';

const allIcons = import.meta.glob('/src/assets/NavBarSvg/*/*.svg', {
  eager: true,
  import: 'default',
});

const ParameterStatusIcon = memo(({ type = null, level = 0 }) => {
  const svgRanges = {
    Battery: [0, 25, 50, 75, 100],
    Network: [0, 20, 40, 60, 80, 100],
    GPS: [0, 25, 50, 75, 100],
  };

  const svgFile = useMemo(() => {
    const ranges = svgRanges[type] || [];
    const safeLevel = ranges.findIndex((value) => level <= value);
    const svgIndex = safeLevel === -1 ? ranges.length - 1 : safeLevel;

    const key = `/src/assets/NavBarSvg/${type}/${type}.${svgIndex}.svg`;
    return allIcons[key];
  }, [type, level]);

  return (
    <div className="flex items-center space-x-2 justify-center flex-col w-12 h-7">
      <div className="flex items-center space-x-1">
        {svgFile && <img src={svgFile} alt={`${type} Level`} className="w-6 h-6" />}
        <span className="text-xs text-gray-500">{level}%</span>
      </div>
    </div>
  );
});

export default ParameterStatusIcon;