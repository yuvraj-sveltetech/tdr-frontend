import React from "react";
import { MdCreateNewFolder } from "react-icons/md";

const AddFolder = ({ category, setModal }) => {
  return (
    <div className="folder bb">
      <h5>{category === "IPDR" ? "I.P.D.R" : "C.D.R"}</h5>
      <button
        className="add-folder d-flex align-items-center btn-color"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={setModal}
      >
        <MdCreateNewFolder className="me-1" size="23" />
        <h6 className="m-0">Create Folder</h6>
      </button>
    </div>
  );
};

export { AddFolder };
