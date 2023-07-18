const { ipcMain, BrowserWindow, Notification } = require("electron");
const path = require("path");
const os = require("os");
const request = require("request");
const fs = require("fs");
const { download } = require("electron-dl");
let dirpath = path.join(os.homedir(), "Desktop");
const baseUrl = "http://192.168.15.51:8000/";

module.exports = {
  create_folder: ipcMain.handle("create_folder", (e, arg1, arg2) => {
    let destPath;

    if (dirpath === undefined) {
      notification(
        "WARNING",
        "Please enter a valid directory path with quotes"
      );
    } else {
      let doesExist = fs.existsSync(dirpath);

      if (doesExist === true) {
        destPath = path.join(dirpath, arg2);

        if (fs.existsSync(destPath) === false) {
          fs.mkdirSync(destPath);
          fs.mkdirSync(path.join(destPath, "airtel"));
          fs.mkdirSync(path.join(destPath, "jio"));
          fs.mkdirSync(path.join(destPath, "bsnl"));
          fs.mkdirSync(path.join(destPath, "voda"));
          return true;
        } else {
          return false;
        }
      } else {
        notification("WARNING", "Please enter a valid path");
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

  get_headers: ipcMain.handle("get_headers", async (e, arg1, arg2) => {
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

    return new Promise((resolve, reject) => {
      request(options, function (error, response) {
        if (error) resolve(error);

        if (response?.statusCode === 200) {
          resolve(JSON.parse(response?.body));
        }
      });
    });
  }),

  get_files_data: ipcMain.handle("get_files_data", async (e, arg1, arg3) => {
    const { structure, auth_token, type } = arg3;
    let parent_folder = Object.keys(structure);
    let data = {};
    let operators = [];
    let new_arg2 = JSON.parse(JSON.stringify(structure)); // Deep copy of object {arg2}

    for (let key in new_arg2) {
      for (let path in new_arg2[key]) {
        delete new_arg2[key][path]["path"];
      }
    } // removed path for sending only headers

    let url = `${baseUrl}tdr/processData/?type=${type}&parent_folders_name=${Object.keys(
      structure
    )}`;

    if (
      parent_folder.length === 1 &&
      Object.keys(structure[parent_folder]).length === 1
    ) {
      // one parent one operator
      let dt = await getSendData("case1", structure);
      data = dt.new_data;
      operators = dt.new_operator;
    } else if (
      parent_folder.length === 1 &&
      Object.keys(structure[parent_folder]).length > 1
    ) {
      // one parent multiple operator
      let dt = await getSendData("case2", structure);
      data = dt.new_data;
      operators = dt.new_operator;
    } else if (parent_folder.length > 1) {
      // multiple parent multiple operator
      let dt = await getSendData("case3", structure);
      data = dt.new_data;
    }

    data = { ...data, file_data: JSON.stringify(new_arg2) };
    let parent_operators = Object.keys(data);
    parent_operators.pop();

    let options = {
      method: "POST",
      url:
        Object.keys(structure).length === 1
          ? `${url}&parent_operators=${parent_operators}&operators=${operators}`
          : url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      formData: data,
    };

    return new Promise((resolve, reject) => {
      request(options, function (error, response) {
        if (error) notification("ERROR", "Something went wrong");

        if (response?.statusCode === 200) {
          resolve(false);
          notification(
            "SUCCESS",
            "Data Processed. Download the Files from Report Section"
          );
        } else if (response?.body) {
          resolve(false);
          notification("ALERT", JSON.parse(response?.body).Error);
        } else {
          resolve(false);
          notification("ERROR", "Something went wrong");
        }
      });
    });
  }),

  DOWNLOAD_FILE: ipcMain.handle("DOWNLOAD_FILE", async (e, arg1, arg2) => {
    const downloadLink = `${baseUrl.slice(0, baseUrl.lastIndexOf("/")) + arg2}`;
    await download(BrowserWindow.getFocusedWindow(), downloadLink, {
      directory: path.join(os.homedir(), "Downloads"),
    })
      .then(() => {
        notification("DOWNLOAD COMPLETE", "Check Your Downloads Folder in PC");
      })
      .catch(() => {
        notification("ERROR", "Something went wrong");
      });
  }),
};

const myMap = (arr) => {
  return arr?.map((file) => {
    return {
      value: fs.createReadStream(file),
      options: {
        filename: `file_name${file}`,
        contentType: null,
      },
    };
  });
};

const getSendData = (target, structure) => {
  let arr = [];
  let operators = [];
  let data = {};

  return new Promise((resolve, reject) => {
    for (let key in structure) {
      if (target === "case3") arr = [];
      for (let path in structure[key]) {
        if (target === "case2") arr = [];
        if (
          structure[key][path] !== undefined &&
          structure[key][path]["path"]?.length > 0
        ) {
          arr = [...arr, ...structure[key][path]["path"]];
          if (target === "case3") {
            data[key] = myMap(arr);
          } else {
            operators = [...operators, path];
            data[key + "_" + path] = myMap(arr);
          }
        }
      }
    }
    resolve({ new_data: data, new_operator: operators });
  });
};

const notification = (title, body) => {
  new Notification({
    title,
    body,
  }).show();
};
