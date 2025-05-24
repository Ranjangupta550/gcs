import { create } from "zustand";

const useServerStatus = create((set, get) => {
    return {
        serverConnectionStatus: false,

        setServerStatus: (status) => {
            // console.log("Setting serverConnectionStatus to:", status);
            set({ serverConnectionStatus: status });
        },
        getServerStatus: () => {
            const status = get().serverConnectionStatus;
            // console.log("Getting serverConnectionStatus:", status);
            return status;
        },
        handleServerStatus: (status) => {
            // console.log("Handling serverConnectionStatus with:", status);
            set({ serverConnectionStatus: status });
        }
    };
});

export default useServerStatus;
