import React from "react";
import { useState } from "react";
import ToggleBar from "../Components/ToggleBar/ToggleBar";
import Navbar from "../Components/Navbar/Navbar";
import DroneParameter from "../Components/DroneParameter/DroneParameter";
import ControlPanel from "../Components/DroneControlButton/ControlPannel";
import Map from "../Components/Map/Map";
function MainPage() {
    const [count, setCount] = useState(0)

    return (
        <>
           <div className="flex flex-col w-screen h-screen bg-MainBackground relative">
            <div id="Togglebar" className="h-auto">
                <ToggleBar />
            </div>
            <div id="Navbar" className="h-auto">
                <Navbar />
            </div>
            <div id="main" className="h-[calc(100vh-50px)] flex w-screen gap-2 p-1 pl-2 pr-2">
                <div className="w-[30%] overflow-hidden rounded-md bg-ParameterBox opacity-80">
                    <DroneParameter />
                </div>
                <div className="w-[70%] overflow-hidden rounded-md border-4 border-ParameterBox border-opacity-100">
                   {/* <ControlPanel /> */}
                     <Map/>
                </div>
            </div>
            <div id="footer" className="w-screen h-[30px] border-2 relative bottom-0"></div>
           </div>
        </>
    )
}
export default MainPage;