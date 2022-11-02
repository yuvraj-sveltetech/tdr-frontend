import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdCreateNewFolder, MdFolder } from "react-icons/md";
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
        <ul className="d-flex flex-wrap justify-content-between ">
          {sub_folders?.folders?.name?.map((folder) => {
            return (
              <div
                className="folder d-flex justify-content-start align-items-center mb-3 subfolder-box"
                key={`SubFolder${folder}`}
              >
                <li onClick={(e) => getFiles(folder)}>
                  <MdFolder size="32" className="folderIcon" />
                </li>
                <p style={{margin:"auto 0", padding: "0 0.4rem"}}>{folder}</p>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export { SubFolder };
