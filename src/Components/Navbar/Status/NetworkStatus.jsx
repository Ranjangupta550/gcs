import React, { useEffect,useState } from "react";
import ParameterStatusIcon from "../../utils/StatusIconsSwitcher";

function NetworkStatus({ level }) {
    const [networkLevel, setNetworkLevel] = useState(0);
    useEffect(() => {
        setNetworkLevel(level);
    }, [level]);
  return (
    <div className="flex relative items-center  text-gray-500 gap-2">
      <div className="flex flex-col items-center">
        <ParameterStatusIcon type="Network" level={level} />
        <span className="text-[10px]">Network</span>
      </div>
    
    </div>
  );
}

export default NetworkStatus;