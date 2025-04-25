import React from "react";
import camerasvg from "../assets/Svg/Camera.svg";
// import ToggleBar from "../Components/ToggleBar/ToggleBar";


function CameraWindow() {
    const openVideoWindow = () => {
        if (window.api && window.api.send) {
          console.log("Opening Video Stream");
          window.api.send("open-video-stream");
          window.api.sendNotification("Test Title", "This is a test notification");
        } else {
          console.error("Electron IPC Renderer is not available!");
        }
      };
    return (
        <div className="flex items-center flex-col justify-center w-full h-full">
       <button  onClick={openVideoWindow} className="w-9 h-7 hover:scale-110 duration-150"><img src={camerasvg} alt="" />
       </button>
       <span>Live Stream</span>
        </div>
    );
} 
export default CameraWindow;