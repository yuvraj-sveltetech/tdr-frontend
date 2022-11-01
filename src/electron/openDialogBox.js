const { ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const axios = require("axios");
const FormData = require("form-data");

let dirpath = path.join(os.homedir(), "Desktop");

module.exports = {
  open_dialog_box: ipcMain.on("open_dialog_box", (e, arg) => {
    dialog
      .showOpenDialog({
        title: "Select Files",
        buttonLabel: "Select",
        properties: ["openFile", "multiSelections"],
      })
      .then((files) => {
        if (files?.filePaths) e.returnValue = files;
      })
      .catch((err) => {
        console.log(err);
      });
  }),
};
