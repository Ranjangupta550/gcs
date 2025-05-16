process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const { app, BrowserWindow, ipcMain, Menu, screen } = require('electron');
const path = require('path');
// Disable Electron security warnings in development


let mainWindow;
let videoWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: false,
    frame: true,
    resizable: true,
    backgroundColor: '#000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.maximize();
  mainWindow.loadURL('http://localhost:5173');
  mainWindow.menuBarVisible = true;
  mainWindow.webContents.openDevTools();

  mainWindow.on('maximize', () => mainWindow.webContents.send('window-state-change', 'maximized'));
  mainWindow.on('unmaximize', () => mainWindow.webContents.send('window-state-change', 'restored'));
}

app.whenReady().then(() => {
  createMainWindow();
  setApplicationMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC Handlers for Main Window
ipcMain.on('minimize', () => mainWindow?.minimize());
ipcMain.on('maximize', () => mainWindow?.maximize());
ipcMain.on('restore', () => mainWindow?.restore());
ipcMain.on('close', () => {
  videoWindow?.close();
  mainWindow?.close();
});

// Open Video Stream Window
ipcMain.on('open-video-stream', () => {
  if (!videoWindow) {
    const displays = screen.getAllDisplays();
    const externalDisplay = displays.find((display) => display.bounds.x !== 0 || display.bounds.y !== 0);

    videoWindow = new BrowserWindow({
      frame: true,
      resizable: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.cjs'),
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

    videoWindow.loadURL('http://localhost:5173/video');
    videoWindow.menuBarVisible = false;
    videoWindow.webContents.openDevTools();

    videoWindow.on('maximize', () => videoWindow.webContents.send('window-state-change', 'maximized'));
    videoWindow.on('unmaximize', () => videoWindow.webContents.send('window-state-change', 'restored'));

    videoWindow.on('closed', () => {
      videoWindow = null;
    });
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
    {
      label: 'Home',
      click: () => {
        mainWindow.webContents.send('navigate', '/home');
      },
    },
    {
      label: 'Settings',
      submenu: [
        {
          label: 'General',
          click: () => {
            mainWindow.webContents.send('navigate', '/general-settings');
          },
        },
        {
          label: 'Camera',
          click: () => {
            mainWindow.webContents.send('navigate', '/camera-settings');
          },
        },
        {
          label: 'Drone',
          click: () => {
            mainWindow.webContents.send('navigate', '/drone-settings');
          },
        },
      ],
    },
    {
      label: 'SkyVault',
      submenu: [
        {
          label: 'Upload',
          click: () => {
            mainWindow.webContents.send('select-mission-file');
          },
        },
        {
          label: 'Download',
          click: () => {
            mainWindow.webContents.send('download-mission-file');
          },
        },
      ],
    },
    {
      label: 'Mission',
      submenu: [
        {
          label: 'Plan Mission',
          click: () => {
            mainWindow.webContents.send('navigate', '/mission-planner');
          },
        },
        {
          label: 'Upload Mission',
          click: () => {
            // Implement your createUploadMissionWindow function here
            // createUploadMissionWindow();
          },
        },
      ],
    },
  ];

  const appMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(appMenu);
}
