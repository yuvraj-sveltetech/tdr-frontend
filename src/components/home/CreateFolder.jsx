import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { FcFolder } from "react-icons/fc";
import Modal from "../utils/Modal";
import { useSelector, useDispatch } from "react-redux";
import { folder, sub_folder } from "../../redux/slices/FolderSlice";

const CreateFolder = ({ category }) => {
  const [modalType, setModalType] = useState("");
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.folder.created_folders);

  useEffect(() => {
    getFolders();
  }, []);

  const getFolders = async () => {
    let res = await window.to_electron.get_folders("get_folders");
    if (res) dispatch(folder(res));
  };

  const setModal = () => {
    setModalType("Create Folder");
  };

  const getSubfolder = async (folder) => {
    let res = await window.to_electron.get_subfolders(
      "get_subfolders",
      folder.folder_path
    );

    if (res) {
      let data = {
        subfolders: res,
        parent_path: folder.folder_name,
      };
      dispatch(sub_folder(data));
    }
  };

  return (
    <div className="create-folder">
      <div className="folder">
        <h5>{category === "IPDR" ? "I.P.D.R" : "C.D.R"}</h5>
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
                <li onClick={(e) => getSubfolder(folder)}>
                  <FcFolder size="70" />
                </li>
                <p>{folder?.folder_name}</p>
              </div>
            );
          })}
        </ul>
      </div>
      <Modal modalType={modalType} category={category} />
    </div>
  );
};

export { CreateFolder };
