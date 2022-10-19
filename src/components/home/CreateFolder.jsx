import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { FcFolder } from "react-icons/fc";
import Modal from "../utils/Modal";
import { useSelector, useDispatch } from "react-redux";
import { folder } from "../../redux/slices/FolderSlice";
const ipcRenderer = window.require("electron").ipcRenderer;

const CreateFolder = ({ category }) => {
  const [modalType, setModalType] = useState("");
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.folder.created_folders);

  useEffect(() => {
    dispatch(folder(ipcRenderer?.sendSync("get-folders")));
  }, []);

  const setModal = () => {
    setModalType("Create Folder");
  };

  // const openDialogBox = () => {
  //   let file = ipcRenderer.sendSync("open_dialog_box");
  //   if (file) {
  //     console.log(file);
  //   }x
  // };

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
        <ul className="d-flex">
          {folders?.map((folder) => {
            return (
              <div
                className="folder d-flex flex-column justify-content-start me-4"
                key={`CreatedFolder${folder?.folder_name}`}
              >
                <li>
                  <FcFolder size="70" />
                </li>
                <p>{folder?.folder_name}</p>
              </div>
            );
          })}
        </ul>

        {/* <FcFolder size="70" onClick={openDialogBox} /> */}
      </div>
      <Modal modalType={modalType} category={category} />
    </div>
  );
};

export default CreateFolder;
