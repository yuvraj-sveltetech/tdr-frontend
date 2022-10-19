const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");

module.exports = {
  create_folder: ipcMain.handle("create_folder", async (e, arg1, arg2) => {
    let destPath, dirpath;

    dirpath = path.join(os.homedir(), "Desktop");

    if (dirpath === undefined) {
      console.log("Please enter a valid directory path with quotes");
    } else {
      let doesExist = fs.existsSync(dirpath);

      if (doesExist === true) {
        destPath = path.join(dirpath, arg2);

        if (fs.existsSync(destPath) === false) {
          await fs.mkdirSync(destPath);
          await fs.mkdirSync(path.join(destPath, "airtel"));
          await fs.mkdirSync(path.join(destPath, "jio"));
          await fs.mkdirSync(path.join(destPath, "bsnl"));
          await fs.mkdirSync(path.join(destPath, "voda"));
          return true;
        } else {
          return false;
        }
      } else {
        console.log("Please enter a valid path");
      }
    }
  }),

  get_folders: ipcMain.on("get_folders", (e, arg) => {
    fs.readdir(path.join(os.homedir(), "Desktop"), (err, folders) => {
      let created_folder = [];
      const map = new Map();

      for (const folderName of folders) {
        if (!map.has(folderName)) {
          map.set(folderName, true); // set any value to Map
          let isFolder = folderName.split("_");

          if (
            isFolder[isFolder.length - 1] === "IPDR" ||
            isFolder[isFolder.length - 1] === "CDR"
          )
            created_folder.push({
              folder_name: folderName,
              folder_path: path.join(os.homedir(), folderName),
            });
        }
      }

      e.returnValue = created_folder;
    });
  }),
};
