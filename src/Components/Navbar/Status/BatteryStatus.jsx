import React, { useEffect,useState } from "react";
import ParameterStatusIcon from "../../Common/StatusIconsSwitcher";

function BatteryStatus({ level }) {
    const [batteryLevel, setBatteryLevel] =useState(0);
    useEffect(() => {
        setBatteryLevel(level);
    }, [level]);
  return (
    <div className="flex relative items-center  text-white gap-2">
      <div className="flex flex-col items-center">
        <ParameterStatusIcon type="Battery" level={level} />
        <span className="text-[10px]">Battery</span>
      </div>
      <p className="text-white font-bold w-12 flex items-center justify-center">{batteryLevel}%</p>
    </div>
  );
}

export default BatteryStatus;