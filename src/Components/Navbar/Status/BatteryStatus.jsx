import React, { useEffect,useState } from "react";
import ParameterStatusIcon from "../../utils/StatusIconsSwitcher";

function BatteryStatus({ level }) {
    const [batteryLevel, setBatteryLevel] =useState(0);
    useEffect(() => {
        setBatteryLevel(level);
    }, [level]);
  return (
    <div className="flex relative items-center  text-gray-500 font-bold gap-2">
      <div className="flex flex-col items-center">
        <ParameterStatusIcon type="Battery" level={level} name={"Battery"} />
        <span className="text-[10px] ">Battery</span>
      </div>
     
    </div>

  );
}

export default BatteryStatus;