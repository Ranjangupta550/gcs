import { useEffect, useRef } from 'react';
import useVideoStore from '../Store/useVideoStore';
import HeadingIndicator from '../Components/DroneParameter/HeadingIndicaror';
import AltitudeIndicator from '../Components/DroneParameter/AltitudeIndicator';
import DroneHUD from '../Components/DroneParameter/DroneHUD';
import { cameraTrigger } from '../services/emitHandler';


function CameraFeed() {
  const stream = useVideoStore((state) => state.videoStream);
  const videoRef = useRef(null);




  // Stream ko <video> me attach karo
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="bg-black w-screen h-screen overflow-hidden flex items-center justify-center border-2 relative">
      {/* Top heading */}
      <div className="absolute top-0 left-0 w-full h-20 flex items-center justify-center flex-col">
        <HeadingIndicator />
      </div>

      {/* Altitude Indicator */}
      <AltitudeIndicator />

      {/* HUD bottom */}
      <div className="absolute w-full bottom-2 flex items-center justify-center">
        <DroneHUD />
      </div>

      {/* Video Stream */}
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      ) : (
        <p className="text-white text-xl">🔌 Waiting for camera stream...</p>
      )}
    </div>
  );
}

export default CameraFeed;
