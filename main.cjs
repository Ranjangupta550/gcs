const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: false, // Fullscreen false initially
    frame: false, // Disable default frame to create a custom title bar
    resizable: true, // Allow resizing
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  mainWindow.loadURL("http://localhost:5173"); // URL of your Vite app
  mainWindow.webContents.openDevTools(); // Optional, for development purposes

  // Add event listeners for maximized and unmaximize events
  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window-state-change", "maximized");
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window-state-change", "restored");
  });
}

app.on("ready", createWindow);

// IPC event handlers for minimize, maximize, restore, and close
ipcMain.on("minimize", () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on("maximize", () => {
  if (mainWindow) {
    mainWindow.maximize();
  }
});

ipcMain.on("restore", () => {
  if (mainWindow) {
    mainWindow.restore();
  }
});

ipcMain.on("close", () => {
  if (mainWindow) {
    mainWindow.close();
  }
});
