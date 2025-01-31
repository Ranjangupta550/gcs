import React, { useEffect,useState } from "react";
import ParameterStatusIcon from "../../Common/StatusIconsSwitcher";

function NetworkStatus({ level }) {
    const [networkLevel, setNetworkLevel] = useState(0);
    useEffect(() => {
        setNetworkLevel(level);
    }, [level]);
  return (
    <div className="flex relative items-center  text-white gap-2">
      <div className="flex flex-col items-center">
        <ParameterStatusIcon type="Network" level={level} />
        <span className="text-[10px]">Network</span>
      </div>
      <p className="text-white  w-12 flex items-center justify-center font-bold">{networkLevel}%</p>
    </div>
  );
}

export default NetworkStatus;