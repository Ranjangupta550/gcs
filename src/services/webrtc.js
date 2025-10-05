import { socket } from "./api";
import useVideoStore from "../Store/useVideoStore";

const setVideoStream = useVideoStore.getState().setVideoStream;

const sdpOffer = async () => {
  return new Promise((resolve, reject) => {
    console.log("Listening for SDP offer from server");
    try {
      socket.on("webrtc_offer", (data) => {
        console.log("SDP offer received", data);
        resolve(data?.message);
      });
    } catch (error) {
      reject(error);
    }
  });
};
// socket.emit("request_offer")
socket.on("error",(data)=>{
  console.log(data)
})
async function cameraInit() {
  console.log("Started camera init");

  const config = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
  let candidateBuffer = [];
  let serverReady = true;

  const peerConnection = new RTCPeerConnection(config);
  // const setVideoStream = useVideoStore((state) => state.setVideoStream);

  // Handle ICE candidates (buffer until server ready)
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      if (serverReady) {
        socket.emit("ice_candidate", event.candidate);
      } else {
        candidateBuffer.push(event.candidate);
      }
    }
  };

  // Receive remote track
  peerConnection.ontrack = (event) => {
    console.log("Remote track received");
    setVideoStream(event.streams[0]);
  };

  // Wait for offer from server
  const offer = await sdpOffer();
  await peerConnection.setRemoteDescription(offer);

  // Create and send answer
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  console.log("Sending answer", answer);
  socket.emit("webrtc_answer", answer);

  // Wait for server confirmation before sending buffered candidates
  socket.on("webrtc_answer_response", (data) => {
    if (data.message === true) {
      serverReady = true;
      console.log(`Flushing ${candidateBuffer.length} buffered ICE candidates`);
      candidateBuffer.forEach((c) => socket.emit("ice_candidate", c));
      candidateBuffer.splice(0, candidateBuffer.length); // clear buffer
    }
  });
  console.log("wating for ice candidate")
  // Handle incoming ICE candidates from server
  socket.on("ice_candidate", async (candidate) => {
    try {
      console.log("ICE Candidate received:", candidate);
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.error("Error adding received ICE candidate", err);
    }
  });
}
export default cameraInit;
