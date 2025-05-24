import { create } from "zustand";
import {
  connectDrone,
  disconnectDrone,
  monitoring,
} from "../services/emitHandler.js";
import notify from "../Components/utils/Notification/notify.jsx";

const connectionStatus = create((set) => ({
  isConnected: false,
  isLoading: false,

  setDroneConnection: (status) => set({ isConnected: status }),
  setLoading: (status) => set({ isLoading: status }),

  
  setConnectionandLoading: (status, loading) =>
    set({ isConnected: status, isLoading: loading }),

  connect: async () => {
    set({ isLoading: true });
    await connectDrone();
  },
  disconnect: async () => {
    set({ isLoading: true });
    await disconnectDrone();
  },
}));

export default connectionStatus;
