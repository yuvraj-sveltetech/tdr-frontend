import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { folder } from "../../redux/slices/FolderSlice";
const ipcRenderer = window.require("electron").ipcRenderer;

const Modal = ({ modalType, category }) => {
  const [buttonName, setButtonName] = useState("");
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalType === "Create Folder") {
      setButtonName("Create");
    }
    conditionalModalContent();
  }, [modalType]);

  const handleChange = (e) => {
    setFolderName(e.target.value);
  };

  const create_folder = () => {
    let message_recived = ipcRenderer?.sendSync(
      "create-folder",
      folderName + "_" + category
    );
    setFolderName("");
    if (message_recived) {
      toast.success("Folder Created");
      dispatch(folder(ipcRenderer?.sendSync("get-folders")));
    } else if (message_recived === false)
      toast.error("This folder already exists");
    else toast.notify("Please enter a valid path");
  };

  const conditionalModalContent = () => {
    if (modalType === "Create Folder") {
      return (
        <input
          type="text"
          className="w-100"
          placeholder="Enter Folder Name"
          value={folderName}
          onChange={(e) => handleChange(e)}
        />
      );
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {modalType}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{conditionalModalContent()}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={create_folder}
            >
              {buttonName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
