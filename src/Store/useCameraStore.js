// store.js or libs/store.js
import { create } from 'zustand';

const useCameraStore = create((set) => ({
  cameraFrame: null,
  iscameraOpen: false,
  setCameraFrame: (frame) => set({ cameraFrame: frame }),
  setIsCameraOpen: (isOpen) => set({ iscameraOpen: isOpen }),
}));

export default useCameraStore;
