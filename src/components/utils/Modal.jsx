import React, { useEffect, useState } from "react";
import useApiHandle from "./useApiHandle";
import * as URL from "./ConstantUrl";
const ipcRenderer = window.require("electron").ipcRenderer;


const Modal = ({ modalType, category }) => {
  const { data, loading, apiCall } = useApiHandle();
  const [buttonName, setButtonName] = useState("");
  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    if (modalType === "Create Folder") {
      setButtonName("Create");
    }
    conditionalModalContent();
  }, [modalType]);

  useEffect(() => {
    console.log(data, "ll");
  }, [data]);

  const handleChange = (e) => {
    setFolderName(e.target.value);
  };

  const create_folder = () => {
    ipcRenderer.send("request-mainprocess-action", folderName+"_"+category);
    setFolderName("")
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
              className="btn btn-primary" data-bs-dismiss="modal"
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
