const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const chokidar = require("chokidar");
const isDev = require("electron-is-dev");
require("../src/electron/index");
const {
  default: installExtension,
  REDUX_DEVTOOLS,
} = require("electron-devtools-installer");

let watcher = null;
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3005",
  },
});
server.listen(7572);

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
  watcher.close();
} // NEW

function createWindow() {
  let win = new BrowserWindow({
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    },
    icon: "../src/assets/images/tower.png",
  });

  win.loadURL(
    isDev
      ? "http://localhost:3005"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  win.maximize();
}

app.whenReady().then(() => {
  folderToWatch();
  createWindow();
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  }
});

const socketON = () => {
  io.on("connection", (socket) => {
    watcher.on("all", (e, path) => {
      socket.emit("file_changed", e);
    });
  });
};

const folderToWatch = () => {
  ipcMain.handle("WATCH_THESE_FOLDERS", (e, arg1, arg2) => {
    watcher = chokidar.watch([arg2], {
      persistent: true,
    });
    socketON();
  });
};
