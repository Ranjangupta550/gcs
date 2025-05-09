const { contextBridge, ipcRenderer } = require('electron');

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld('api', {
  getLocation: () => ipcRenderer.invoke('get-location'),
 
    receive: (channel, callback) => {
    if (typeof callback === 'function') {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    } else {
      console.warn(`No valid callback provided for channel "${channel}"`);
    }
  },

  removeListener: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  } ,
  selectMissionFile: () => {
    console.log("Preload: sending selectMissionFile request");
    return ipcRenderer.invoke("selectMissionFile");
  },
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
    invoke: (channel, data) => ipcRenderer.invoke(channel, data),

  
  
});
