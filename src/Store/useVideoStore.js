import { create } from "zustand"

const useVideoStore = create((set) => ({
    videoStream: null,
    setVideoStream: (stream) => set((state) => ({
        ...state,
        videoStream: stream
    }))
}))

export default useVideoStore