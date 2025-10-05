import { app, BrowserWindow, ipcMain } from 'electron';
import { exec } from 'child_process';
import path from 'path';

let Hilddr;

function createWindow() {
    Hilddr = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // enable if using ipcRenderer directly in React
            contextIsolation: false
        }
    });

    Hilddr.loadURL('http://localhost:5173'); // your Vite dev server or React build
}

// IPC handler to activate or launch app
ipcMain.handle('activate-app', async (event, { targetTitle, exePath }) => {
    const psFile = path.join(process.cwd(), 'activatewindows.ps1');
    console.log(`Attempting to activate or launch app: "${targetTitle}"`);

    return new Promise((resolve, reject) => {
        exec(
            `powershell -NoProfile -ExecutionPolicy Bypass -File "${psFile}" -targetTitle "${targetTitle}" -exePath "${exePath}"`,
            { encoding: 'utf8', maxBuffer: 1024 * 1024 },
            (error, stdout, stderr) => {
                if (error) {
                    console.error('⚠ Error executing PowerShell:', error);
                    reject(error);
                    return;
                }
                if (stderr) console.error('⚠ PowerShell stderr:', stderr);
                console.log('📝 PowerShell output:\n', stdout.trim());
                resolve(stdout.trim());
            }
        );
    });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});