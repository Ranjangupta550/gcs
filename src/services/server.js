import responseHandler from "./responsehandler";
import { ServerConnection } from "./api";
import cameraInit from "./webrtc";
export function initServices() {
  ServerConnection();
  responseHandler();
  // cameraInit()
}

