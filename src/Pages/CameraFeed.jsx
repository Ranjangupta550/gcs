import { useEffect, useRef } from 'react';
import HeadingIndicator from '../Components/DroneParameter/HeadingIndicaror';
import AltitudeIndicator from '../Components/DroneParameter/AltitudeIndicator';
import DroneHUD from '../Components/DroneParameter/DroneHUD';
import JSMpeg from 'jsmpeg-player';


function CameraFeed() {
  const canvasRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current && canvasRef.current) {
      playerRef.current = new JSMpeg.Player('ws://localhost:9999', {
        canvas: canvasRef.current,
        autoplay: true,
      });
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

 const handleHld = async () => {
    console.log("Button clicked. Attempting to open/activate Notepad...");
    if (window.api) {
      try {
        const result = await window.api.activateApp({
          targetTitle: 'Notepad', // The title of the window to search for
          exePath: 'notepad.exe'  // The program to launch if not found
        });
        console.log('PowerShell script result:', result);
      } catch (error) {
        console.error('Failed to activate app:', error);
      }
    }
  };

  return (
    // The parent div is now just a relative container with a black background
    <div className="relative w-screen h-screen bg-black">

      
      {/* HUD elements remain on top with z-index */}
        <div className="absolute top-0 left-0 w-full h-20 flex items-center justify-center flex-col z-10">
          <HeadingIndicator />
        </div>
        <div className='absolute right-8 z-10 top-20'>
          <button 
            className='bg-gray-200 text-black border border-gray-400 rounded-sm px-4 py-1 transition-colors duration-150 ease-in-out hover:bg-gray-300 hover:border-blue-500 active:bg-gray-400 active:border-blue-700'
            onClick={handleHld}
          >
           AI Analysis
          </button>
        </div>
        <div className="absolute z-10 top-52">
          <AltitudeIndicator />
        </div>
        <div className="absolute w-full bottom-2 flex items-center justify-center z-10">
          {/* <DroneHUD /> */}
      </div>

      {/* The canvas is positioned absolutely to fill the parent */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}

export default CameraFeed;