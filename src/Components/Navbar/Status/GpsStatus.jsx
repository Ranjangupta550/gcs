import React, { useMemo, useState, useEffect } from "react";
import ParameterStatusIcon from "../../Common/StatusIconsSwitcher";
import GpsLogo from "../../../assets/NavBarSvg/GPS/GPSLogo.svg";

function GpsStatus({ level }) {
    const [gpsLevel, setGpsLevel] = useState(level);
    useEffect(() => {
        setGpsLevel(level);
    },
    [level]);
  const gpsLogo = useMemo(() => (
    <img src={GpsLogo} alt="GPS-Network" />
  ), []);

  return (
    <div className="flex relative items-center text-white gap-2">
      <div className="flex flex-col items-center ">
        <div className="flex items-center gap-2 ">
        <ParameterStatusIcon type="GPS" level={level} />
        <div id="Gps-Logo" className=" absolute left-8 top-0  ">{gpsLogo}</div>
        </div>
      <span className="text-[10px] ">Gps</span>
      </div>
      <p className="text-white font-bold  w-12 flex items-center justify-center">{gpsLevel}%</p>
    </div>
  );
}

export default GpsStatus;