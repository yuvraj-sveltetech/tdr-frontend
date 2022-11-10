import React from "react";
import "./CreateFolder.css";
import { useSelector, useDispatch } from "react-redux";
import { all_headers } from "../../redux/slices/HeaderSlice";
import {
  selected_files,
  selected_all_files,
} from "../../redux/slices/FolderSlice";

import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { LargeModal } from "../utils/index";

const DirFiles = () => {
  const files = useSelector((state) => state.folder);
  const dispatch = useDispatch();

  const selectedFileHandle = (e, file) => {
    dispatch(selected_files(file));
  };

  const getHeaders = async () => {
    let res = await window.to_electron.get_headers(
      "get_headers",
      files.selected_files
    );
    dispatch(all_headers(res?.data));
  };

  const all_file_name = files?.all_files.map((file) => {
    return file.file_name;
  });

  const selected_file_name = files?.selected_files?.map((file) => {
    return file.file_name;
  });

  let isChecked = (selected_file_name, all_file_name) =>
    all_file_name.every((v) => selected_file_name.includes(v));

  const selectAllFilesHandle = (e) => {
    const { checked } = e.target;
    let data = {
      arr: [],
      isChecked: false,
    };

    if (checked) {
      let all_data_send = files.all_files?.filter(
        (e) => !files?.selected_files.includes(e)
      );

      data = { ...data, arr: all_data_send, isChecked: true };
      dispatch(selected_all_files(data));
    } else {
      let filter_files = files.selected_files?.filter(
        (e) => !files?.all_files.includes(e)
      );

      data = { ...data, arr: filter_files, isChecked: false };
      dispatch(selected_all_files(data));
    }
  };

  return (
    <div className="all_files container">
      <div className="d-flex justify-content-end">
        <div className="select-all d-flex">
          <input
            type="checkbox"
            value="selectAll"
            checked={isChecked(selected_file_name, all_file_name)}
            onChange={(e) => {
              selectAllFilesHandle(e);
            }}
          />
          <label>Select All</label>
        </div>
      </div>
      <div className="row">
        {files?.all_files?.map((file) => {
          return (
            <div className="col-md-3" key={`all_files${file.file_name}`}>
              <label
                className="subfolder-box box d-flex justify-content-between align-items-center mb-3"
                htmlFor={file.file_name}
              >
                <BsFillFileEarmarkTextFill />
                <p className="ellipsis">{file.file_name}</p>
                <input
                  type="checkbox"
                  id={file.file_name}
                  value={file.file_name}
                  onChange={(e) => selectedFileHandle(e, file, file.file_name)}
                  checked={selected_file_name.includes(file.file_name)}
                />
              </label>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#large_modal"
        onClick={getHeaders}
      >
        Select Headers
      </button>

      <LargeModal />
    </div>
  );
};

export { DirFiles };
