const { ipcMain } = require("electron");
const path = require("path");
const os = require("os");
const request = require("request");
const fs = require("fs");

let dirpath = path.join(os.homedir(), "Desktop");

const baseUrl = process.env.REACT_APP_API_KEY;

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
              isChecked: false,
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
                parent_folder_name: arg2?.parent_folder_name,
                subfolder_name: arg2?.subfolder_name,
              },
            ];
          }
        });
        e.returnValue = all_files;
      }
    );
  }),

  get_all_folders_files: ipcMain.on(
    "get_all_folders_files",
    (e, arg1, arg2) => {
      let all_files = [];

      fs.readdir(
        path.join(dirpath, arg2?.parent_folder_name, arg2?.operator),
        (err, files) => {
          files?.forEach((file) => {
            all_files = [
              ...all_files,
              {
                path: path.join(
                  dirpath,
                  arg2?.parent_folder_name,
                  arg2?.operator,
                  file
                ),
                name: arg2?.operator,
              },
            ];
          });
          e.returnValue = all_files;
        }
      );
    }
  ),

  get_headers: ipcMain.on("get_headers", async (e, arg1, arg2) => {
    let options = {
      method: "POST",
      url: `http://192.168.15.248:8001/tdr/getSubFolder/`,
      headers: {},
      formData: {
        file: {
          value: fs.createReadStream(arg2.file_path),
          options: {
            filename: arg2.file_name,
            contentType: null,
          },
        },
      },
    };

    request(options, function (error, response) {
      if (error) console.log(error);

      if (response?.statusCode === 200) {
        e.returnValue = JSON.parse(response?.body);
      }
    });
  }),

  get_files_data: ipcMain.on("get_files_data", async (e, arg1, arg2) => {
    // console.log(arg2, "ppp");
    let data = {};
    let arr = [];
    let new_arg2 = JSON.parse(JSON.stringify(arg2)); // Deep copy of object {arg2}

    for (let key in new_arg2) {
      for (let path in new_arg2[key]) {
        delete new_arg2[key][path]["path"];
      }
    }

    for (let key in arg2) {
      for (let path in arg2[key]) {
        if (
          arg2[key][path] !== undefined &&
          arg2[key][path]["path"]?.length > 0
        ) {
          arr = [...arr, ...arg2[key][path]["path"]];
          data[key] = arr?.map((file) => {
            return {
              value: fs.createReadStream(file),
              options: {
                filename: `file_name${file}`,
                contentType: null,
              },
            };
          });
        }
      }
    }

    console.log(data, "dataaaaaaaa");

    let options = {
      method: "POST",
      url: `http://192.168.15.248:8001/tdr/processData/?parent_folders_name=${Object.keys(
        arg2
      )}&file_data=${JSON.stringify(new_arg2)}`,
      headers: {},
      formData: data,
    };

    request(options, function (error, response) {
      if (error) e.returnValue = error;

      if (response?.statusCode === 200) {
        e.returnValue = JSON.parse(response?.body);
        console.log(response.body, "--------");
      } else {
        e.returnValue = JSON.parse(response?.body)?.Error;
      }
    });

    // e.returnValue = "";
  }),
};
