const { BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

let uploadMission = null;

function createUploadMissionWindow() {
  if (uploadMission) {
    uploadMission.focus();
    return;
  }

  uploadMission = new BrowserWindow({
    width: 400,
    height: 200,
    resizable: false,
    modal: true,
    title: "Upload Mission",

    webPreferences: {
      preload: path.join(__dirname, "../../preload.cjs"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });
  uploadMission.loadURL("http://localhost:5173/upload");
    uploadMission.on("closed", () => {
        uploadMission = null;
    });

  uploadMission.menuBarVisible = false;
  uploadMission.webContents.openDevTools(); // Open DevTools for uploadMission window


  
}
ipcMain.handle("selectMissionFile", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: "Select Mission File",
    properties: ["openFile"],
    filters: [
      { name: "Mission Files", extensions: ["waypoints"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });

  if (canceled || filePaths.length === 0) return null;

  // ✅ Read the file contents
  const fileContent = fs.readFileSync(filePaths[0], "utf-8");

  return {
    name: require("path").basename(filePaths[0]),
    content: fileContent,
  };
});

ipcMain.on("close-upload-window", () => {
    if (uploadMission) {
        uploadMission.close();
    }
});

module.exports = {
    createUploadMissionWindow
};