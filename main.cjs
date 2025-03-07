const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow, videoWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: false,
    frame: false,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  mainWindow.maximize();
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// ✅ IPC Event Handlers for Main Window
ipcMain.on("minimize-window", () => mainWindow?.minimize());
ipcMain.on("maximize-window", () => mainWindow?.maximize());
ipcMain.on("restore-window", () => mainWindow?.restore());
ipcMain.on("close-window", () => mainWindow?.close());

// ✅ Open Video Stream Window
ipcMain.on("open-video-stream", () => {
  if (!videoWindow) {
    videoWindow = new BrowserWindow({
      width: 640,
      height: 480,
      frame: false,
      resizable: true,
      title: "Live Video Stream",
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        contextIsolation: true,
      },
    });

    videoWindow.loadURL("http://localhost:5173/video");

    videoWindow.on("closed", () => {
      videoWindow = null;
    });
  } else {
    videoWindow.focus();
  }
});

// ✅ IPC Event Handlers for Video Window
ipcMain.on("minimize-video-window", () => videoWindow?.minimize());
ipcMain.on("maximize-video-window", () => videoWindow?.maximize());
ipcMain.on("restore-video-window", () => videoWindow?.restore());
ipcMain.on("close-video-window", () => videoWindow?.close());
