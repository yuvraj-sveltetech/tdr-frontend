import React from "react";
import "./CreateFolder.css";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { all_headers } from "../../redux/slices/HeaderSlice";
import {
  selected_files,
  selected_all_files,
} from "../../redux/slices/FolderSlice";
import {
  select_operator_files,
  all_operator_wise_files,
} from "../../redux/slices/SelectedOperaterSlice";
import { selected_data } from "../../redux/slices/StructureSlice";
import { LargeModal } from "../utils/index";

const DirFiles = () => {
  const files = useSelector((state) => state.folder);
  const operator_files = useSelector((state) => state.operator_files);
  const dispatch = useDispatch();
  // console.log(files, "-------/-");
  const ss = useSelector((state) => state.selected_data);
  console.log(operator_files, "ss------------------------", files);

  // console.log(files, "--", ss);

  const selectedFileHandle = (e, file) => {
    // console.log(file, "file");
    let data = {
      file_data: file,
      type: file?.subfolder_name,
      parent_folder_name: file.parent_folder_name,
      count: Object.keys(operator_files.files)?.length + 1,
    };

    // let data2 = {
    //   file_data: file,
    //   count: Object.keys(ss?.selected_data)?.length + 1,
    // };

    let data2 = {
      file_data: file,
      type: file?.subfolder_name,
      parent_folder_name: file.parent_folder_name,
      count: Object.keys(operator_files?.selected_data)?.length + 1,
      // selected_file_length:ss?.selected_data
    };

    dispatch(selected_files(file));
    dispatch(select_operator_files(data));
    dispatch(selected_data(data2));
  };

  const getHeaders = async () => {
    let res = await window.to_electron.get_headers(
      "get_headers",
      files.selected_files
      // operator_files
    );
    dispatch(all_headers(res?.data));
  };

  const all_file_name = files?.all_files.map((file) => {
    return file.file_path;
  });

  const selected_file_name = files?.selected_files?.map((file) => {
    return file.file_path;
  });

  let isChecked = (selected_file_name, all_file_name) =>
    all_file_name.every((v) => selected_file_name.includes(v));

  const selectAllFilesHandle = (e) => {
    const { checked } = e.target;
    let data = {
      arr: [],
      isChecked: false,
    };
    let data2 = {
      files: files.all_files,
      operator: files.sub_folders.subfolder,
    };
    let data3 = {
      file_data: [],
      type: files.sub_folders.subfolder,
      parent_folder_name: files.sub_folders.parent_folder,
      count: Object.keys(operator_files.files)?.length + 1,
      isChecked: checked,
    };

    if (checked) {
      let all_data_send = files.all_files?.filter(
        (e) => !files?.selected_files.includes(e)
      );

      data = { ...data, arr: all_data_send, isChecked: true };
      data3 = {
        ...data3,
        file_data: files?.all_files.map((file) => file.file_path),
      };
      // data3 = { ...data3, file_data: files.all_files.map((file) => file.file_path) };

      dispatch(selected_all_files(data));
      // dispatch(all_operator_wise_files(data2));
      dispatch(all_operator_wise_files(data3));
    } else {
      let filter_files = files.selected_files?.filter(
        (e) => !files?.all_files.includes(e)
      );

      data = { ...data, arr: filter_files, isChecked: false };
      data2 = { ...data2, files: [] };
      dispatch(selected_all_files(data));
      // dispatch(all_operator_wise_files(data2));
      dispatch(all_operator_wise_files(data3));
    }
  };

  return (
    <div className="all_files ">
      <div className="d-flex justify-content-end">
        <div className="select-all d-flex">
          <input
            type="checkbox"
            value="selectAll"
            checked={
              files.selected_files?.length > 0 &&
              isChecked(selected_file_name, all_file_name)
            }
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
                  onChange={(e) => selectedFileHandle(e, file)}
                  checked={selected_file_name.includes(file.file_path)}
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
