import React, { useMemo, useState, useEffect } from "react";
import ParameterStatusIcon from "../../utils/StatusIconsSwitcher";
import GpsLogo from "../../../assets/NavBarSvg/GPS/GPSLogo.svg";

function GpsStatus({ level }) {
    const [gpsLevel, setGpsLevel] = useState(level);
    useEffect(() => {
        setGpsLevel(level);
    },
    [level]);
  // const gpsLogo = useMemo(() => (
  //   <img src={GpsLogo} alt="GPS-Network" />
  // ), []);

  return (
    <div className="flex relative items-center text-gray-500 gap-2">  
      <div className="flex flex-col items-center ">
        <div className="flex items-center gap-2 ">
        <ParameterStatusIcon type="GPS" level={level} />
        {/* <div id="Gps-Logo" className=" absolute left-8 top-0  ">{gpsLogo}</div> */}
        </div>
      <span className="text-[10px] text-gray-500 ">Gps</span>
      </div>
    
    </div>
  );
}

export default GpsStatus;