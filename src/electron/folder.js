const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");

let desktop_path = path.join(os.homedir(), "Desktop");
let all_folders = [];
let get_specific_folders = [];

module.exports = {
  create_folder: ipcMain.on("create-folder", (event, arg) => {
    let destPath, dirpath;
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
            event.returnValue = true;
          })().catch(console.error);
        } else {
          event.returnValue = false;
          console.log("This folder already exists");
        }
      } else {
        console.log("Please enter a valid path");
      }
    }
  }),

  get_folders: ipcMain.on("get_folders", (e, arg) => {
    fs.readdir(desktop_path, (err, files) => {
      all_folders = [...files];
      let isFolder;
      all_folders.forEach((folder) => {
        isFolder = folder.split("_");
        console.log(isFolder[isFolder.length - 1]);
        if (
          (isFolder[isFolder.length - 1]) === "IPDR" ||
          isFolder[isFolder.length - 1] === "CDR"
        ) {
          let response = get_specific_folders.includes(folder);
          if (!response) get_specific_folders.push(folder);
        }
      });

      e.returnValue = get_specific_folders;
    });
  }),
};
