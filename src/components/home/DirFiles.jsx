import React, { useState, useEffect, useMemo } from "react";
import "./CreateFolder.css";
import { useSelector, useDispatch } from "react-redux";
import { all_headers } from "../../redux/slices/HeaderSlice";
import {
  select_all_file,
  select_unselect_all,
  unselect_all_file,
  // counter,
} from "../../redux/slices/SelectedFiles";
import { is_parent_checked } from "../../redux/slices/FolderSlice";
import { LargeModal } from "../utils/index";
import CheckBox from "./CheckBox";

const DirFiles = ({ index }) => {
  const [show, setShow] = useState(false);
  const [allSelectedFiles, setAllSelectedFiles] = useState([]);
  const files = useSelector((state) => state.folder);
  const redux_store = useSelector((state) => state.selected_files);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log(operator_files, "------------------------", files);

  let folder = useMemo(() => {
    return [files.sub_folders.parent_folder, files.sub_folders.subfolder];
  }, [files.sub_folders.parent_folder, files.sub_folders.subfolder]);

  useEffect(() => {
    if (Object.keys(redux_store.structure).length > 0) {
      if (
        redux_store?.structure[folder[0]] &&
        redux_store?.structure[folder[0]][folder[1]]
      ) {
        setAllSelectedFiles(
          redux_store?.structure[folder[0]][folder[1]]["path"]
        );
      }
    }
  }, [redux_store, folder]);

  const getHeaders = async () => {
    let res = await window.to_electron.get_headers(
      "get_headers",
      files.all_files[0]
    );
    dispatch(all_headers(res?.data));
    handleShow();
  };

  let isChecked = () =>
    files?.all_files?.every((v) => allSelectedFiles?.includes(v.file_path));

  const selectAllFilesHandle = async (e) => {
    const { checked } = e.target;

    let data = {
      parent_folder_name: folder[0],
      operator: folder[1],
      path: files.all_files.map((file) => file.file_path),
    };

    // if (!redux_store.count.includes(folder[0] + "-" + folder[1])) {
    //   dispatch(counter({ name: folder[0] + "-" + folder[1], type: "add" }));
    // }

    let new_data = {
      arr: files?.all_files?.map((item) => item.file_path),
      isCheck: null,
    };

    if (checked) {
      new_data = { ...new_data, isCheck: checked };
      dispatch(select_unselect_all(new_data));
      dispatch(select_all_file(data));
    } else {
      new_data = { ...new_data, isCheck: checked };
      dispatch(select_unselect_all(new_data));
      dispatch(unselect_all_file(data));
      dispatch(is_parent_checked({ index, checked }));
      // dispatch(
      //   await counter({
      //     name: folder[0] + "-" + folder[1],
      //     type: "remove",
      //   })
      // );

      setAllSelectedFiles([]);
    }
  };

  return (
    <div className="all_files">
      <div className="d-flex justify-content-between align-items-center">
        <h6>FILES</h6>
        <label className="select-all d-flex" htmlFor="selectAll">
          <input
            className="me-1"
            type="checkbox"
            value="selectAll"
            id="selectAll"
            checked={isChecked()}
            onChange={(e) => {
              selectAllFilesHandle(e);
            }}
          />
          <span>Select All</span>
        </label>
      </div>

      <div className="row">
        {files?.all_files?.map((file) => {
          return (
            <div className="col-md-3" key={`all_files${file.file_name}`}>
              <CheckBox file={file} index={index} />
            </div>
          );
        })}
      </div>

      <button type="button" className="btn btn-primary" onClick={getHeaders}>
        Select Headers
      </button>

      <LargeModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        parent_folder={folder[0]}
        sub_folders={folder[1]}
        operator_files={redux_store}
      />
    </div>
  );
};

export { DirFiles };
