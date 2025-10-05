// main.cjs

const path = require('path');
const { app, BrowserWindow, ipcMain, Menu, screen, dialog } = require('electron');
const { fullLoad } = require('systeminformation');
const rtspStreamer = require('./rtspStreamer.cjs'); // <-- 1. IMPORT the streamer module
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const isDev = !app.isPackaged;
const isMac = process.platform === 'darwin';
const isWin = process.platform === 'win32';
const isLinux = process.platform === 'linux';

const iconPath = isMac
  ? path.join(__dirname, 'assets', 'icon.icns')
  : isWin
  ? path.join(__dirname, 'assets', 'icon.ico')
  : path.join(__dirname, 'assets', 'icon.png');

if (isLinux) {
  app.disableHardwareAcceleration();
  app.commandLine.appendSwitch('ignore-gpu-blacklist');
  app.commandLine.appendSwitch('enable-webgl');
  app.commandLine.appendSwitch('enable-gpu-rasterization');
  app.commandLine.appendSwitch('use-gl', 'desktop');
  app.commandLine.appendSwitch('enable-unsafe-webgl');
  app.commandLine.appendSwitch('enable-unsafe-swiftshader');
}

let mainWindow;
let videoWindow;
let splashWindow;
let authWindow;

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 800,
    height: 500,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
}

function createAuthWindow() {
  authWindow = new BrowserWindow({
    width: 800,
    height: 500,
    frame: true,
    resizable: false,
    show: false,
    backgroundColor: '#000000',
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  authWindow.setMenu(null);
  authWindow.on('ready-to-show', () => {
    authWindow.show();
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: false,
    frame: true,
    resizable: true,
    backgroundColor: '#000000',
    icon: iconPath,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.maximize();
  mainWindow.loadURL('http://localhost:5173');

  mainWindow.webContents.on('did-fail-load', (event, code, desc) => {
    console.error('❌ Page failed to load:', desc);
  });

  mainWindow.menuBarVisible = true;
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('maximize', () => mainWindow.webContents.send('window-state-change', 'maximized'));
  mainWindow.on('unmaximize', () => mainWindow.webContents.send('window-state-change', 'restored'));
}

app.whenReady().then(() => {
  rtspStreamer.start(); // <-- 2. START the stream when the app is ready
  createAuthWindow();
  authWindow.loadURL('http://localhost:5173/#/Login');
});

ipcMain.on("login-success", () => {
  authWindow.close();
  createMainWindow();
  setApplicationMenu();
});

app.on('window-all-closed', () => {
  rtspStreamer.stop(); // <-- 3. STOP the stream when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers for Main Window
ipcMain.on('minimize', () => mainWindow?.minimize());
ipcMain.on('maximize', () => mainWindow?.maximize());
ipcMain.on('restore', () => mainWindow?.restore());
ipcMain.on('close', () => {
  videoWindow?.close();
  mainWindow?.close();
});
ipcMain.handle("showMessageBox", async (event, options) => {
  const win = event.sender.getOwnerBrowserWindow();
  const result = await dialog.showMessageBox(win, options);
  return result;
});

// Open Video Stream Window
ipcMain.on('open-video-stream', () => {
  if (!videoWindow) {
    const displays = screen.getAllDisplays();
    const externalDisplay = displays.find((display) => display.bounds.x !== 0 || display.bounds.y !== 0);

    videoWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      resizable: true,
      movable: true,
      fullscreenable: true,
      frame: true,
      icon: iconPath,
      webPreferences: {
        preload: path.join(__dirname, 'preload.cjs'),
        contextIsolation: true,
        nodeIntegration: false,
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

    videoWindow.loadURL('http://localhost:5173/#/CameraFeed');
    videoWindow.menuBarVisible = false;

    if (!app.isPackaged) {
      videoWindow.webContents.openDevTools();
    }

    videoWindow.on('maximize', () => videoWindow.webContents.send('window-state-change', 'maximized'));
    videoWindow.on('unmaximize', () => videoWindow.webContents.send('window-state-change', 'restored'));

    videoWindow.on('closed', () => {
      mainWindow?.webContents.send('camera-window-status', false);
      videoWindow = null;
    });
    mainWindow?.webContents.send('camera-window-status', true);
  } else {
    videoWindow.focus();
  }
});

// IPC Handlers for Video Window
ipcMain.on('minimize-video', () => videoWindow?.minimize());
ipcMain.on('maximize-video', () => videoWindow?.maximize());
ipcMain.on('restore-video', () => videoWindow?.restore());
ipcMain.on('close-video', () => videoWindow?.close());

// Function to set application menu
function setApplicationMenu() {
  const menuTemplate = [
      // ... your menu items ... (no changes needed here)
      {
        label: 'Home',
        click: () => {
          mainWindow.webContents.send('navigate', '/home');
        },
      },
      {
        label:"Developer",
        submenu:[
          {
            label:"toggle dev tool",
              accelerator: 'CmdOrCtrl+Shift+I',
            click: () => {
              mainWindow.webContents.toggleDevTools();
            }
          }
        ]
      },
      // ... etc
  ];
  const appMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(appMenu);
}