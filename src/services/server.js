import responseHandler from "./responsehandler";
import { ServerConnection } from "./api";
export function initServices() {
  ServerConnection();
  responseHandler();
}
initServices();
