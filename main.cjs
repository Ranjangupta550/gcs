const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { screen } = require("electron");

let mainWindow, videoWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: false,
    frame: true,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  mainWindow.maximize();
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.menuBarVisible = false;
  mainWindow.webContents.openDevTools();
  mainWindow.on("maximize", () => mainWindow.webContents.send("window-state-change", "maximized"));
  mainWindow.on("unmaximize", () => mainWindow.webContents.send("window-state-change", "restored"));
}

app.whenReady().then(createWindow);

// ✅ IPC Handlers for Main Window
ipcMain.on("minimize", () => mainWindow?.minimize());
ipcMain.on("maximize", () => mainWindow?.maximize());
ipcMain.on("restore", () => mainWindow?.restore());
ipcMain.on("close", () => {
  videoWindow?.close();
  mainWindow?.close();
});

// ✅ Open Video Stream Window
ipcMain.on("open-video-stream", () => {
  if (!videoWindow) {
    const displays = screen.getAllDisplays();
    const externalDisplay = displays.find((display) => display.bounds.x !== 0 || display.bounds.y !== 0);

    videoWindow = new BrowserWindow({
      frame: true,
      resizable: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.cjs"),
        contextIsolation: true,
      },
    });

    if (externalDisplay) {
      videoWindow.setBounds({
        x: externalDisplay.bounds.x,
        y: externalDisplay.bounds.y,
        width: externalDisplay.size.width,
        height: externalDisplay.size.height,
      });
    } else {
      videoWindow.maximize();
    }

    videoWindow.loadURL("http://localhost:5173/video");
    videoWindow.menuBarVisible = false;
    videoWindow.webContents.openDevTools(); // Open DevTools for videoWindow

    videoWindow.on("maximize", () => videoWindow.webContents.send("window-state-change", "maximized"));
    videoWindow.on("unmaximize", () => videoWindow.webContents.send("window-state-change", "restored"));

    videoWindow.on("closed", () => {
      videoWindow = null;
    });
  } else {
    videoWindow.focus();
  }
});

// ✅ Separate IPC Handlers for Video Window
ipcMain.on("minimize-video", () => videoWindow?.minimize());
ipcMain.on("maximize-video", () => videoWindow?.maximize());
ipcMain.on("restore-video", () => videoWindow?.restore());
ipcMain.on("close-video", () => videoWindow?.close());
