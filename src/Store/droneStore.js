import { create } from "zustand";

const useDroneStore = create((set) => ({
  isConnected: false,
  isArmed: false,

  setArmStatus: (status) => set({ isArmed: status }),
  setConnectionStatus: (status) => set({ isConnected: status }),
}));

export default useDroneStore;
