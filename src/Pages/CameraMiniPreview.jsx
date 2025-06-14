import { useEffect } from 'react';
import useCameraStore from '../store/useCameraStore';
import icons from "../assets/icons"

function CameraMiniPreview() {
  const frame = useCameraStore((state) => state.cameraFrame);
  const iscameraOpen = useCameraStore((state) => state.iscameraOpen);
  const setCameraFrame = useCameraStore((state) => state.setCameraFrame);
  const setIsCameraOpen = useCameraStore((state) => state.setIsCameraOpen);

  useEffect(() => {
    const updateFrame = () => {
      const newFrame = window.getLatestFrame?.();
      if (newFrame) setCameraFrame(newFrame);
      requestAnimationFrame(updateFrame);
    };
    requestAnimationFrame(updateFrame);
  }, []);

  useEffect(() => {
    window.api?.receive('camera-window-status', (status) => {
      setIsCameraOpen(status);
    });
  }, []);

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
              className="h-auto">
                <img src={icons.fullcam} alt="" className='h-4' />
            </button>
          </div>

          {frame ? (
            <img
              src={`data:image/jpeg;base64,${frame}`}
              alt="Camera Stream"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-white text-center mt-10">📡 No camera feed</p>
          )}
        </div>
      )}
    </>
  );
}

export default CameraMiniPreview;
