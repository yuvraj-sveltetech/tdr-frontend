const { ipcMain, BrowserWindow, Notification } = require("electron");
const path = require("path");
const os = require("os");
const request = require("request");
const fs = require("fs");
const { download } = require("electron-dl");
let dirpath = path.join(os.homedir(), "Desktop");
const baseUrl = "http://127.0.0.1:8000/";

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
    const { file, auth_token } = arg2;

    let options = {
      method: "POST",
      url: `${baseUrl}tdr/getSubFolder/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      formData: {
        file: {
          value: fs.createReadStream(file.file_path),
          options: {
            filename: file.file_name,
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

  get_files_data: ipcMain.handle("get_files_data", async (e, arg1, arg3) => {
    const { structure, auth_token } = arg3;
    let data = {};
    let arr = [];
    let operators = [];
    let new_arg2 = JSON.parse(JSON.stringify(structure)); // Deep copy of object {arg2}
    let url = `${baseUrl}tdr/processData/?parent_folders_name=${Object.keys(
      structure
    )}&file_data=${JSON.stringify(new_arg2)}`;

    for (let key in new_arg2) {
      for (let path in new_arg2[key]) {
        delete new_arg2[key][path]["path"];
      }
    } // removed path for sending only headers

    if (Object.keys(structure).length === 1) {
      for (let key in structure) {
        for (let path in structure[key]) {
          if (
            structure[key][path] !== undefined &&
            structure[key][path]["path"]?.length > 0
          ) {
            arr = [...arr, ...structure[key][path]["path"]];
            operators = [...operators, path];
            data[key + "_" + path] = arr?.map((file) => {
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
    } else {
      for (let key in structure) {
        for (let path in structure[key]) {
          if (
            structure[key][path] !== undefined &&
            structure[key][path]["path"]?.length > 0
          ) {
            arr = [...arr, ...structure[key][path]["path"]];
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
    }

    let options = {
      method: "POST",
      url:
        Object.keys(structure).length === 1
          ? `${url}&parent_operators=${Object.keys(
              data
            )}&operators=${operators}`
          : url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      formData: data,
    };

    request(options, function (error, response) {
      if (error) notification("ERROR", "Something went wrong");

      if (response?.statusCode === 200) {
        const downloadLink = `${baseUrl + JSON.parse(response?.body).file}`;

        download(BrowserWindow.getFocusedWindow(), downloadLink, {
          directory: path.join(os.homedir(), "Downloads"),
        });

        notification("File Download", "File is downloaded");
      } else {
        notification("ERROR", "Something went wrong");
      }
    });
  }),
};

const notification = (title, body) => {
  new Notification({
    title,
    body,
  }).show();
};
