import React from "react";
import camerasvg from "../assets/Svg/Camera.svg";
// import ToggleBar from "../Components/ToggleBar/ToggleBar";


function CameraWindow() {
    const openVideoWindow = () => {
        if (window.api && window.api.send) {
          console.log("Opening Video Stream");
          window.api.send("open-video-stream");
        } else {
          console.error("Electron IPC Renderer is not available!");
        }
      };
    return (
        <div>
       <button  onClick={openVideoWindow} className="w-7"><img src={camerasvg} alt="" /></button>
        </div>
    );
} 
export default CameraWindow;