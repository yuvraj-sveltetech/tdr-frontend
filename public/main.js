const { app, BrowserWindow, ipcMain } = require("electron");
const {
  default: installExtension,
  REDUX_DEVTOOLS,
} = require("electron-devtools-installer");
const path = require("path");
const chokidar = require("chokidar");
const isDev = require("electron-is-dev");
require("../src/electron/index");

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
} // NEW

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  //load the index.html from a url
  // win.loadURL("http://localhost:3000");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  // win.webContents.openDevTools();

  win.maximize();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
});

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
    installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

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
