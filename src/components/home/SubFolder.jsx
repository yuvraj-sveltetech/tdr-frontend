import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FcFolder } from "react-icons/fc";
import { all_files } from "../../redux/slices/FolderSlice";

const SubFolder = () => {
  const dispatch = useDispatch();
  const sub_folders = useSelector((state) => state.folder.sub_folders);

  const getFiles = async (subfolder_name) => {
    let data = {
      parent_folder_name: sub_folders?.parent_folder,
      subfolder_name: subfolder_name,
    };
    let res = await window.to_electron.get_files("get_files", data);
    if (res) {
      dispatch(all_files(res));
    }
  };

  return (
    <div className="sub_folder d-flex flex-column align-items-start">
      <h5>{sub_folders?.parent_folder}</h5>
      <div className="all-folders">
        <ul className="d-flex">
          {sub_folders?.folders?.name?.map((folder) => {
            return (
              <div
                className="folder d-flex flex-column justify-content-start me-4"
                key={`SubFolder${folder}`}
              >
                <li onClick={(e) => getFiles(folder)}>
                  <FcFolder size="70" />
                </li>
                <p>{folder}</p>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export { SubFolder };
