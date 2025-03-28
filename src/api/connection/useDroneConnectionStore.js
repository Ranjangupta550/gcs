import { create } from "zustand";

const useDroneConnectionStore = create((set) => ({
  isConnected: false,
  setIsConnected: (status) => set({ isConnected: status }),
}));

export default useDroneConnectionStore;
