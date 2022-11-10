import React from "react";
import "./CreateFolder.css";
import { useSelector, useDispatch } from "react-redux";
import { selected_files } from "../../redux/slices/FolderSlice";
import { all_headers } from "../../redux/slices/HeaderSlice";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { LargeModal } from "../utils/index";

const DirFiles = () => {
  const files = useSelector((state) => state.folder);
  const dispatch = useDispatch();

  const selectFile = async (file) => {
    dispatch(selected_files(file));
  };

  const getHeaders = async () => {
    let res = await window.to_electron.get_headers(
      "get_headers",
      files.selected_files
    );
    dispatch(all_headers(res?.data));
  };

  return (
    <div className="all_files container">
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
                  onChange={(e) => selectFile(file)}
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
