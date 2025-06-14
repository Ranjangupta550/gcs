import React, { useState } from 'react'
import {FlightControlPannel,} from '../../index'  
import {Button,CameraFeed } from '../../index'
import CameraMiniPreview from '../../Pages/CameraMiniPreview';




function SidebarComponents() {

  const [toshow,setShow]=useState(<FlightControlPannel/>);
  const handleShow=(component) => {
    setShow(component);
  } 

  // Track which button is active
  const [active, setActive] = useState('Control Panel');

  return (
    <div className='flex flex-col gap-y-2 w-full h-full bg-backgroundPrimary rounded-md'>
      <div className='h-2/5 w-full flex flex-col text-white font-semibold text-[11px] gap-y-2 overflow-auto border-b-2'>
        <div className="flex flex-row gap-x-5 justify-evenly">
          <Button
            onClick={() => {
              handleShow(<FlightControlPannel />);
              setActive('Control Panel');
            }}
            className={active === 'Control Panel' ? 'bg-black  text-white' : ''}
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
        {/* <div className="flex flex-row gap-x-5 justify-evenly">
          <Button
            onClick={() => {
              handleShow(<div>Flight Plan</div>);
              setActive('Flight Plan');
            }}
            className={active === 'Flight Plan' ? 'bg-black text-white' : ''}
          >
            Flight Plan
          </Button>
          <Button
            onClick={() => {
              handleShow(<div>Telemetry</div>);
              setActive('Telemetry');
            }}
            className={active === 'Telemetry' ? 'bg-black text-white' : ''}
          >
            Telemetry
          </Button>
        </div> */}
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
