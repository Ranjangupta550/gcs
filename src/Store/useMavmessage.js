import { create } from 'zustand';

const useMavmessageStore = create((set) => ({
  mavmessages: [], // Array of all MAVLink messages

  addMavmessage: (newMessage) =>
    set((state) => ({
      mavmessages: [...state.mavmessages, newMessage], // Append new message
    })),

  getAllMessages: () =>
    set((state) => state.mavmessages), // Optional, you can access directly too
}));

export default useMavmessageStore;
