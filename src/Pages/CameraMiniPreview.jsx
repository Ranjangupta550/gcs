import { useEffect, useRef } from 'react';
import useCameraStore from '../store/useCameraStore';
import JSMpeg from 'jsmpeg-player';

function CameraMiniPreview() {
  const iscameraOpen = useCameraStore((state) => state.iscameraOpen);
  const setIsCameraOpen = useCameraStore((state) => state.setIsCameraOpen);
  const canvasRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (iscameraOpen) {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    } 
    else if (!playerRef.current && canvasRef.current) {
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
  }, [iscameraOpen]);

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
        // Parent div is the relative container
        <div className="relative w-full h-full bg-black rounded">
          <div className="absolute top-0 right-0 p-2 z-10">
            <button
              onClick={handleOpenVideoStream}
              className="h-auto p-1 bg-gray-700 rounded text-white text-xs"
            >
              FS
            </button>
          </div>
          {/* Canvas is positioned absolutely inside */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      )}
    </>
  );
}

export default CameraMiniPreview;