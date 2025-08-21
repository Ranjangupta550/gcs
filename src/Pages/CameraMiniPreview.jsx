import { useEffect, useRef,useMemo } from 'react';
import useCameraStore from '../store/useCameraStore';
import icons from "../assets/icons";
import useVideoStore from '../Store/useVideoStore';
import { cameraTrigger } from '../services/emitHandler';
import Button from '../Components/UI/Button';
// import cameraInit from "../services/webrtc"

function CameraMiniPreview() {
  const iscameraOpen = useCameraStore((state) => state.iscameraOpen);
  const setIsCameraOpen = useCameraStore((state) => state.setIsCameraOpen);
  const videoRef = useRef(null);
  const stream = useVideoStore((state) => state.videoStream);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    window.api?.receive('camera-window-status', (status) => {
      setIsCameraOpen(status);
    });
  }, [setIsCameraOpen]);

  const handleOpenVideoStream = () => {
    if (window.api?.send) {
      window.api.send('open-video-stream');
    }
  };

  return (
    <>

  

      {iscameraOpen ? (
        <div className="w-full h-full bg-black text-white flex items-center justify-center rounded">
          📺 External camera window is active
        </div>
      ) : (
        <div className="w-full h-full bg-black overflow-hidden relative rounded">
          {/* Optional open button */}
          <div className="absolute top-0 right-0 p-2 z-10">
            <button
              onClick={handleOpenVideoStream}
              className="h-auto"
            >
              <img src={icons.fullcam} alt="" className="h-4" />
            </button>
          </div>

          {stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <>
           
            <p className="text-white text-center mt-10">📡 No camera feed</p>
             </>
          )}
        </div>
      )}
    </>
  );
}

export default CameraMiniPreview;
