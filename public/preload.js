const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("to_electron", {
  create_folder: (arg1, arg2) =>
    ipcRenderer.invoke("create_folder", arg1, arg2),
  get_folders: () => ipcRenderer.sendSync("get_folders"),
  get_subfolders: (arg1, arg2) =>
    ipcRenderer.sendSync("get_subfolders", arg1, arg2),
  get_files: (arg1, arg2) => ipcRenderer.sendSync("get_files", arg1, arg2),
  get_headers: (arg1, arg2) => ipcRenderer.invoke("get_headers", arg1, arg2),
  get_files_data: (arg1, arg2) =>
    ipcRenderer.invoke("get_files_data", arg1, arg2),
  get_all_folders_files: (arg1, arg2) =>
    ipcRenderer.sendSync("get_all_folders_files", arg1, arg2),
  DOWNLOAD_FILE: (arg1, arg2) =>
    ipcRenderer.invoke("DOWNLOAD_FILE", arg1, arg2),
  WATCH_THESE_FOLDERS: (arg1, arg2) =>
    ipcRenderer.invoke("WATCH_THESE_FOLDERS", arg1, arg2),
});
