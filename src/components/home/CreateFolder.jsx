import React, { useEffect, useState, useRef } from "react";
import "./CreateFolder.css";
import { MdFolder } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  all_files,
  folder,
  sub_folder,
  is_parent_checked,
} from "../../redux/slices/FolderSlice";
import { setShowCount } from "../../redux/slices/BreadCrumbSlice";
import {
  files,
  selected_files,
  counter,
  select_all_parent_files,
} from "../../redux/slices/SelectedFiles";

const CreateFolder = ({ category }) => {
  const folders = useSelector((state) => state.folder);
  const selected_files_store = useSelector((state) => state.selected_files);
  const [allParentFiles, setAllParentFiles] = useState({
    all_files: [],
    structured_files: {},
  });
  // const [allParentFiles]
  const sub_folder_names = ["airtel", "bsnl", "jio", "voda"];
  const dispatch = useDispatch();
  let p_folder_name = useRef(null);

  useEffect(() => {
    getFolders();
  }, []);

  useEffect(() => {
    if (allParentFiles.all_files?.length > 0) {
      let data = {
        all_files: allParentFiles.structured_files,
        parent_name: p_folder_name.current,
        operator: "",
      };

      sub_folder_names?.forEach((name) => {
        dispatch(counter(p_folder_name.current + "-" + name));
        data = { ...data, operator: name };
        dispatch(select_all_parent_files(data));
      });

      // console.log(allParentFiles, "kkk");
      allParentFiles.all_files?.forEach((file) => {
        dispatch(selected_files(file.path));
      });
    }
  }, [allParentFiles]);

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

  const getAllSubfolderFiles = (e, parent_folder_name, index) => {
    const { checked } = e.target;
    p_folder_name.current = parent_folder_name;

    if (checked) {
      dispatch(is_parent_checked({ index, checked }));
      let new_data = [];
      let arr = [];

      let data = {
        parent_folder_name: parent_folder_name,
      };

      sub_folder_names?.forEach(async (subfolder_name) => {
        data = { ...data, operator: subfolder_name };
        let res = await window.to_electron.get_all_folders_files(
          "get_all_folders_files",
          data
        );

        if (res) {
          res?.forEach((item) => {
            if (arr[item.name]) {
              arr[item.name] = {
                path: [...arr[item.name]["path"], item.path],
              };
            } else {
              arr[item.name] = {
                path: [item.path],
              };
            }
          });

          new_data = [...new_data, ...res];
          setAllParentFiles((prev) => ({
            ...prev,
            all_files: new_data,
            structured_files: { ...arr },
          }));
        }
      });
    } else {
      dispatch(is_parent_checked({ index, checked }));
    }
  };

  console.log(allParentFiles, "allParentFiles");

  return (
    <div className="create-folder">
      <div className="container-fluid">
        <h6>FOLDER</h6>
        <div className="row list-unstyled">
          {folders.created_folders?.map((folder, index) => {
            return (
              <div
                className="col-md-3"
                key={`CreatedFolder${folder?.folder_name}`}
              >
                <div
                  className="folder rr d-flex flex-column justify-content-center my-2"
                  onClick={(e) => getSubfolder(folder)}
                >
                  <input
                    type="checkbox"
                    checked={folder.isChecked}
                    onChange={(e) =>
                      getAllSubfolderFiles(e, folder?.folder_name, index)
                    }
                    onClick={(e) => e.stopPropagation()}
                    className="align-self-end me-2"
                  />
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
