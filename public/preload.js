const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("to_electron", {
  create_folder: (arg1, arg2) =>
    ipcRenderer.invoke("create_folder", arg1, arg2),
  get_folders: () => ipcRenderer.sendSync("get_folders"),
  get_subfolders: (arg1, arg2) =>
    ipcRenderer.sendSync("get_subfolders", arg1, arg2),
  get_files: (arg1, arg2) => ipcRenderer.sendSync("get_files", arg1, arg2),
});
