import React, { useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { FcFolder } from "react-icons/fc";
import Modal from "../utils/Modal";
// const ipcRenderer = window.require("electron").ipcRenderer;

const CreateFolder = ({ category }) => {
  const [modalType, setModalType] = useState("");

  const setModal = () => {
    setModalType("Create Folder");
  };

  const openDialogBox = () => {
    // let file = ipcRenderer.sendSync("open_dialog_box");
    // if (file) {
    //   console.log(file);
    // }
  };

  return (
    <div className="create-folder">
      <div className="folder">
        <strong>{category === "IPDR" ? "I.P.D.R" : "C.D.R"}</strong>
        <button
          className="add-folder d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={setModal}
        >
          <MdCreateNewFolder className="me-1" size="23" />
          <h6 className="m-0">Create Folder</h6>
        </button>
      </div>
      <div className="all-folders">
        <FcFolder size="70" onClick={openDialogBox} />
        <FcFolder size="70" />
        <FcFolder size="70" />
        <FcFolder size="70" />
        <FcFolder size="70" />
        <FcFolder size="70" />
        <FcFolder size="70" />
        <FcFolder size="70" />
        <FcFolder size="70" />
        <FcFolder size="70" />
        <FcFolder size="70" />
        <FcFolder size="70" />
      </div>
      <Modal modalType={modalType} category={category} />
    </div>
  );
};

export default CreateFolder;
