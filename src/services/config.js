// config.js
let config = {
  apiUrl: "http://",
  ip: localStorage.getItem("ip") || "192.168.1.1",
  apiPort: localStorage.getItem("port") || "5000",

  setIpAddrress(ip, port) {
    localStorage.setItem("ip", ip);
    localStorage.setItem("port", port);
    this.ip = ip;
    this.apiPort = port;
  },

  apiEndpoint() {
    return `${this.apiUrl}${this.ip}:${this.apiPort}`;  
  },
};

export default config;
