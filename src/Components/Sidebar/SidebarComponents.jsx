import React, { useState,useMemo } from 'react'
import {FlightControlPannel,} from '../../index'  
import {Button,CameraFeed,showMessageBox } from '../../index'
import CameraMiniPreview from '../../Pages/CameraMiniPreview';
import { cameraTrigger } from '../../services/emitHandler';


function SidebarComponents() {

  const [toshow,setShow]=useState("click to enable flight control");
  const handleShow=(component) => {
    setShow(component);
  }
  const handleCameraTrigger=()=>{
    cameraTrigger()
  }
  // Track which button is active
  const [active, setActive] = useState("");

  return (
    <div className='flex flex-col gap-y-2 w-full h-full bg-backgroundPrimary rounded-md'>
      <div className='h-2/5 w-full flex flex-col text-white font-semibold text-[11px] gap-y-2 overflow-auto border-b-2'>
        <div className="flex flex-row gap-x-5 justify-evenly">
      <Button
  onClick={async () => {
    const result = await showMessageBox({
      type: "warning",
      message: "Are you sure you want to open the Control Panel?",
      detail: "This action should be handle carefully"
    });

    if (result.response === 0) {
      handleShow(<FlightControlPannel />);
      setActive("Control Panel");
    }
  }}
  className={active === "Control Panel" ? "bg-black text-white" : ""}
>
  Control Panel
</Button>
          <Button
            onClick={() => {
              handleShow(<div>Flight Log</div>);
              setActive('Flight Log');
            }}
            className={active === 'Flight Log' ? 'bg-black text-white' : ''}
          >
            Flight Log
          </Button>
        </div>
          <Button onClick={handleCameraTrigger}
            className='relative left-3'>
              start camera
           </Button>
        <div className='flex border h-full'>
          <CameraMiniPreview />
        </div>
      </div>
      <div className='h-3/5 rounded-md overflow-auto w-full  relative'>
        {toshow}
      </div>
    </div>
  )
}

export default SidebarComponents
