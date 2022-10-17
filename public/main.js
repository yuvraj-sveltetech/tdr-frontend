const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");
const os = require("os");
const chokidar = require("chokidar");
require("../src/electron/index");

let desktop_path = path.join(os.homedir(), "Desktop");
let all_folders = [];
let get_specific_folders = [];

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      preload: path.join(app.getAppPath(), "preload.js"),
    },
  });

  //load the index.html from a url
  win.loadURL("http://localhost:3000");

  // Open the DevTools.
  win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("get_folders", (e, arg) => {
  fs.readdir(desktop_path, (err, files) => {
    all_folders = [...files];
    let isFolder;
    all_folders.forEach((folder) => {
      isFolder = folder.split("_");

      if (isFolder[isFolder.length - 1] === "IPDR") {
        get_specific_folders.push(folder);
      }
    });

    e.returnValue = get_specific_folders;
  });
});

ipcMain.on("chokidar", (event, arg) => {
  const watcher = chokidar.watch(
    ["C:\\Users\\Yuvi\\Desktop\\ddd_IPDR\\airtel\\"],
    {
      // ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
    }
  );
  watcher.on("ready", (path) => {
    console.log(path, "Ready to watch");
  });

  watcher.on("add", (path) => {
    console.log(path, "path............");
  });
});

ipcMain.on("open_dialog_box", (e, arg) => {
  dialog
    .showOpenDialog({
      title: "Select Files",
      buttonLabel: "Select",
      properties: ["openFile", "multiSelections"],
    })
    .then((files) => {
      if (files?.filePaths) e.returnValue = files;
    })
    .catch((err) => {
      console.log(err);
    });
});
