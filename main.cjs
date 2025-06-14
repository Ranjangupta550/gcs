
const path = require('path');
const { app, BrowserWindow, ipcMain, Menu, screen } = require('electron');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
// Disable Electron security warnings in development
const isDev = !app.isPackaged; // Add this line

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
  app.commandLine.appendSwitch('use-gl', 'desktop'); // try 'desktop' if 'egl' causes issues
  app.commandLine.appendSwitch('enable-unsafe-webgl');
  app.commandLine.appendSwitch('enable-unsafe-swiftshader');
}

let mainWindow;
let videoWindow;


function createMainWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: false,
    frame: true,
    resizable: true,
    backgroundColor: '#000000',
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.maximize();
//  mainWindow.loadURL(
//   isDev
//     ? 'http://localhost:5173'
//     : `file://${path.join(__dirname, 'dist', 'index.html')}#/`
// );
mainWindow.loadURL(`file://${path.join(__dirname, 'dist', 'index.html')}#/`);

  mainWindow.menuBarVisible = true;
if (!app.isPackaged) {
  mainWindow.webContents.openDevTools(); // Only opens in development
}

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

//     videoWindow.loadURL(
//   isDev
//     ? 'http://localhost:5173/#/CameraFeed'
//     : `file://${path.join(__dirname, 'dist', 'index.html')}#/CameraFeed`
// );
videoWindow.loadURL(`file://${path.join(__dirname, 'dist', 'index.html')}#/CameraFeed`);


    videoWindow.menuBarVisible = false;
 if (!app.isPackaged) {
  videoWindow.webContents.openDevTools(); // Only opens in development
}

    videoWindow.on('maximize', () => videoWindow.webContents.send('window-state-change', 'maximized'));
    videoWindow.on('unmaximize', () => videoWindow.webContents.send('window-state-change', 'restored'));

    videoWindow.on('closed', () => {
       mainWindow?.webContents.send('camera-window-status', false); // ✅ Notify React that window closed
      videoWindow = null;
    });
    mainWindow?.webContents.send('camera-window-status', true);
  } else {
    videoWindow.focus();
  }
});

// IPC Handlers for Video Window
ipcMain.on('minimize-video', () => {
  console.log('💡 Received minimize-video');
  videoWindow?.minimize();
});
ipcMain.on('maximize-video', () => {
  console.log('💡 Received maximize-video');
  videoWindow?.maximize();
});
ipcMain.on('restore-video', () => {
  console.log('💡 Received restore-video');
  videoWindow?.restore();
});
ipcMain.on('close-video', () => {
  console.log('💡 Received close-video');
  videoWindow?.close();
});

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
        {
          label:'stats',
          click:()=>{
            mainWindow.webContents.send('navigate', '/mission-stats');
          }
        }
      ],
    },
  ];

  const appMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(appMenu);
}
