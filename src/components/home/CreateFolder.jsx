import React, { useEffect } from "react";
import "./CreateFolder.css";
import { MdFolder } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { folder, sub_folder } from "../../redux/slices/FolderSlice";
import { setShowCount } from "../../redux/slices/BreadCrumbSlice";

const CreateFolder = ({ category }) => {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.folder.created_folders);

  useEffect(() => {
    getFolders();
  }, []);

  const getFolders = async () => {
    let res = await window.to_electron.get_folders("get_folders");
    if (res) dispatch(folder(res));
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
    dispatch(setShowCount(1));
  };

  return (
    <div className="create-folder">
      <div className="container-fluid">
        <div className="row list-unstyled">
          {folders?.map((folder) => {
            return (
              <div
                className="col-md-3"
                key={`CreatedFolder${folder?.folder_name}`}
              >
                <div
                  className="folder rr d-flex flex-column justify-content-center my-2"
                  onClick={(e) => getSubfolder(folder)}
                >
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
    </div>
  );
};

export { CreateFolder };
