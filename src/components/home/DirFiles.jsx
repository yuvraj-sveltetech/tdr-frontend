import React, { useState, useEffect, useMemo } from "react";
import "./CreateFolder.css";
import { useSelector, useDispatch } from "react-redux";
import { all_headers } from "../../redux/slices/HeaderSlice";
import {
  select_all_file,
  select_unselect_all,
  unselect_all_file,
  counter,
} from "../../redux/slices/SelectedFiles";
import { is_parent_checked } from "../../redux/slices/FolderSlice";
import { LargeModal } from "../utils/index";
import useApiHandle from "../utils/useApiHandle";
import * as URL from "../utils/ConstantUrl";
import CheckBox from "./CheckBox";

const DirFiles = ({ index }) => {
  const { data, loading, apiCall } = useApiHandle();
  const [show, setShow] = useState(false);
  const [allSelectedFiles, setAllSelectedFiles] = useState([]);
  const files = useSelector((state) => state.folder);
  const operator_files = useSelector((state) => state.operator_files);
  const redux_store = useSelector((state) => state.selected_files);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log(operator_files, "------------------------", files);

  let folder = useMemo(() => {
    return [files.sub_folders.parent_folder, files.sub_folders.subfolder];
  }, [files.sub_folders.parent_folder, files.sub_folders.subfolder]);

  useEffect(() => {
    if (
      redux_store.count.includes(folder[0] + "-" + folder[1]) &&
      Object.keys(redux_store.structure).length > 0 &&
      redux_store.count.length > -1
    ) {
      let index = redux_store.count.indexOf(folder[0] + "-" + folder[1]);

      if (redux_store.structure["folder" + index]) {
        setAllSelectedFiles(redux_store.structure["folder" + index]["path"]);
      }
    }
  }, [redux_store.count, redux_store.structure, redux_store.files, folder]);

  // useEffect(() => {
  //   if (data?.data) {
  //     console.log(data, "dataaaaaaaaa");
  //   }
  // }, [data]);

  const getHeaders = async () => {
    let res = await window.to_electron.get_headers(
      "get_headers",
      files.all_files[0]
    );
    dispatch(all_headers(res?.data));
    handleShow();
  };

  let isChecked = () =>
    files.all_files.every((v) => allSelectedFiles.includes(v.file_path));

  const selectAllFilesHandle = async (e) => {
    const { checked } = e.target;

    let data = {
      parent_folder_name: folder[0],
      operator: folder[1],
      path: files.all_files.map((file) => file.file_path),
    };

    if (!redux_store.count.includes(folder[0] + "-" + folder[1])) {
      dispatch(counter({ name: folder[0] + "-" + folder[1], type: "add" }));
    }

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

  const getFilesData = async () => {
    apiCall("post", URL.GET_FILES_DATA, redux_store.structure);

    let res = await window.to_electron.get_files_data(
      "get_files_data",
      redux_store.structure
    );

    console.log(res, "res");
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

      <button onClick={getFilesData}>Sumbit</button>

      <LargeModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        operator_files={redux_store}
      />
    </div>
  );
};

export { DirFiles };
