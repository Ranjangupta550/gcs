const { contextBridge, ipcRenderer } = require('electron');

// ✅ Log to confirm preload is loaded
console.log('✅ Preload script loaded');

contextBridge.exposeInMainWorld('api', {
  // 🔄 Send async message from Renderer to Main (no response expected)
  send: (channel, data) => {
    console.log(`📤 Sending message on channel: ${channel}`, data);
    ipcRenderer.send(channel, data);
  },

  // 🔁 Invoke (ask something from Main and wait for response)
  invoke: (channel, data) => {
    console.log(`📥 Invoking channel: ${channel}`, data);
    return ipcRenderer.invoke(channel, data);
  },

  // 📡 Receive async messages sent from Main to Renderer
  receive: (channel, callback) => {
    if (typeof callback === 'function') {
      ipcRenderer.on(channel, (event, ...args) => {
        console.log(`📬 Received on channel: ${channel}`, args);
        callback(...args);
      });
    } else {
      console.warn(`⚠️ Invalid callback for channel "${channel}"`);
    }
  },

  // 🧹 Remove all listeners from a specific channel
  removeListener: (channel) => {
    ipcRenderer.removeAllListeners(channel);
    console.log(`🧼 Removed all listeners from channel: ${channel}`);
  },

  // 🛰️ Specific function to get device location (optional)
  getLocation: () => ipcRenderer.invoke('get-location'),

  // 📂 Special function to trigger file picker (optional)
  selectMissionFile: () => {
    console.log("🗂️ Preload: sending selectMissionFile request");
    return ipcRenderer.invoke("selectMissionFile");
  }
});
