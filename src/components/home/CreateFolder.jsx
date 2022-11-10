import React, { useEffect, useState } from "react";
import "./CreateFolder.css";
import { MdFolder } from "react-icons/md";
import Modal from "../utils/Modal";
import { useSelector, useDispatch } from "react-redux";
import { folder, sub_folder } from "../../redux/slices/FolderSlice";
import { AddFolder } from "../utils/index";

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
      <AddFolder setModal={setModal} />
      <div className="container">
        <div className=" row list-unstyled">
          {folders?.map((folder) => {
            return (
              <div
                className="col-md-3"
                key={`CreatedFolder${folder?.folder_name}`}
              >
                <div className="folder rr d-flex flex-column justify-content-center m-3">
                  <li onClick={(e) => getSubfolder(folder)}>
                    <MdFolder size="70" className="folderIcon" />
                  </li>
                  <p>{folder?.folder_name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal modalType={modalType} category={category} />
    </div>
  );
};

export { CreateFolder };
