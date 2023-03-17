import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdFolder } from "react-icons/md";
import {
  all_files,
  add_subfolder_name,
} from "../../../redux/slices/FolderSlice";
import { setShowCount } from "../../../redux/slices/BreadCrumbSlice";
import { toast } from "react-toastify";

const SubFolder = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.folder);

  const getFiles = async (subfolder_name) => {
    let data = {
      parent_folder_name: files.sub_folders?.parent_folder,
      subfolder_name: subfolder_name,
    };
    let res = await window.to_electron.get_files("get_files", data);
    if (res) {
      dispatch(all_files(res));
      if (res.length > 0) {
        dispatch(setShowCount(2));
        dispatch(add_subfolder_name(subfolder_name));
      } else {
        toast.error("File not found!");
      }
    }
  };

  return (
    <div className="sub_folder d-flex flex-column align-items-start">
      {/* <h5>{files.sub_folders?.parent_folder}</h5> */}
      <div className="all-folders container">
        <h6>FOLDER</h6>
        <div className="row list-unstyled">
          {files.sub_folders?.folders?.name?.map((folder) => {
            return (
              <div className="col-md-3" key={`SubFolder${folder}`}>
                <div
                  className="folder d-flex justify-content-start align-items-center subfolder-box"
                  onClick={(e) => getFiles(folder)}
                >
                  <li onClick={(e) => getFiles(folder)}>
                    <MdFolder size="32" className="folderIcon" />
                  </li>
                  <p style={{ margin: "auto 0", padding: "0 0.4rem" }}>
                    {folder}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { SubFolder };
