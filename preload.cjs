const { contextBridge, ipcRenderer } = require('electron');

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld('api', {
  getLocation: () => ipcRenderer.invoke('get-location'),
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => callback(...args));
  },
  sendNotification: (title, message) => ipcRenderer.send('show-notification', { title, message }),
});
