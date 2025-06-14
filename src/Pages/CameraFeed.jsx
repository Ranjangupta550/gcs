import { useEffect } from 'react';
import useCameraStore from '../store/useCameraStore';

function CameraFeed() {
  const frame = useCameraStore((state) => state.cameraFrame);
  const setCameraFrame = useCameraStore((state) => state.setCameraFrame);

  useEffect(() => {
    const updateFrame = () => {
      const newFrame = window.getLatestFrame?.();
      if (newFrame) setCameraFrame(newFrame);
      requestAnimationFrame(updateFrame);
    };
    requestAnimationFrame(updateFrame);
  }, []);

  return (
    <div className="bg-black w-screen h-screen overflow-hidden flex items-center justify-center">
      {frame ? (
        <img
          src={`data:image/jpeg;base64,${frame}`}
          alt="Camera Stream"
          className="w-screen max-h-full"
        />
      ) : (
        <p className="text-white text-xl">🔌 Waiting for camera stream...</p>
      )}
    </div>
  );
}

export default CameraFeed;
