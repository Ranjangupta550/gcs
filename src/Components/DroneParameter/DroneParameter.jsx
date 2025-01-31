import React from "react";
import { useState } from "react";
import ParaCard from "./ParaCard/ParaCard";
import useStatusSimulation from "../../useSum";
import DroneControlButtons from "../DroneControlButton/ControlPannel";

function DroneParameter() {
  const { altitude, yaw, verticalSpeed, groundSpeed, speed, batteryLevel } =
    useStatusSimulation();
  return (
    <>
      <div className="h-auto  grid grid-cols-2 justify-center items-center p-2 gap-1">
        <ParaCard title="Altitide" value={altitude} unit="deg" />
        <ParaCard title="Yaw" value={yaw} unit="deg" />
        <ParaCard title="Vertical Speed" value={verticalSpeed} unit="m/s" />
        <ParaCard title="Ground Speed" value={groundSpeed} unit="m/s" />
        <ParaCard title="Speed" value={speed} unit="km/h" />
        <ParaCard title="Battery Level" value={batteryLevel} unit="%" />
      </div>
     
    </>
  );
}
export default DroneParameter;
