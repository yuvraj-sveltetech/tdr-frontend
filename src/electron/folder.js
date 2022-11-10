const { ipcMain } = require("electron");
const path = require("path");
const os = require("os");
const request = require("request");
var fs = require("fs");
const { json } = require("react-router-dom");

let dirpath = path.join(os.homedir(), "Desktop");

module.exports = {
  create_folder: ipcMain.handle("create_folder", async (e, arg1, arg2) => {
    let destPath;

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
    fs.readdir(path.join(dirpath), (err, folders) => {
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
              folder_path: path.join(dirpath, folderName),
            });
        }
      }
      e.returnValue = created_folder;
    });
  }),

  get_subfolders: ipcMain.on("get_subfolders", (e, arg1, folder_path) => {
    fs.readdir(folder_path, (err, folders) => {
      e.returnValue = folders;
    });
  }),

  get_files: ipcMain.on("get_files", (e, arg1, arg2) => {
    let all_files = [];
    fs.readdir(
      path.join(dirpath, arg2?.parent_folder_name, arg2?.subfolder_name),
      (err, files) => {
        files.forEach((file) => {
          if (!all_files?.includes(file)) {
            all_files = [
              ...all_files,
              {
                file_name: file,
                file_path: path.join(
                  dirpath,
                  arg2?.parent_folder_name,
                  arg2?.subfolder_name,
                  file
                ),
              },
            ];
          }
        });
        e.returnValue = all_files;
      }
    );
  }),

  send_files: ipcMain.on("send_files", async (e, arg1, arg2) => {
    var options = {
      method: "POST",
      url: "http://10.5.49.205:8000/tdr/getSubFolder/",
      headers: {},
      formData: {
        file: arg2.map((file) => {
          return {
            value: fs.createReadStream(file.file_path),
            options: {
              filename: file.file_name,
              contentType: null,
            },
          };
        }),
      },
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      e.returnValue = JSON.parse(response.body);
    });
  }),
};
