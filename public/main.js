const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");
const os = require("os");

let desktop_path = path.join(os.homedir(), "Desktop");
let all_folders = [];
let get_specific_folders = [];

ipcMain.on("request-mainprocess-action", (event, arg) => {
  let destPath, dirpath;
  console.log(arg);
  event.returnValue = "pong";
  //   const isMac = os.platform() === "darwin";
  //   const isWindows = os.platform() === "win32";
  //   const isLinux = os.platform() === "linux";

  dirpath = path.join(os.homedir(), "Desktop");

  if (dirpath === undefined) {
    console.log("Please enter a valid directory path with quotes");
    return;
  } else {
    let doesExist = fs.existsSync(dirpath);

    if (doesExist === true) {
      destPath = path.join(dirpath, arg);

      if (fs.existsSync(destPath) === false) {
        (async () => {
          await fs.mkdirSync(destPath);
          await fs.mkdirSync(path.join(destPath, "airtel"));
          await fs.mkdirSync(path.join(destPath, "jio"));
          await fs.mkdirSync(path.join(destPath, "bsnl"));
          await fs.mkdirSync(path.join(destPath, "voda"));
        })().catch(console.error);
      } else {
        console.log("This folder already exists");
      }
    } else {
      console.log("Please enter a valid path");
    }
  }
});

ipcMain.once("get_folders", (e, arg) => {
  fs.readdir(desktop_path, (err, files) => {
    all_folders = [...files];
    let isFolder;
    all_folders.forEach((folder) => {
      isFolder = folder.split("_");

      if (isFolder[isFolder.length - 1] === "IPDR") {
        get_specific_folders.push(folder);
      }
    });

    console.log(get_specific_folders.length);
    e.returnValue = get_specific_folders;
  });
});

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
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
