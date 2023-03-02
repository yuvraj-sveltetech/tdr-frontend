import React from "react";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  selected_files,
  counter,
  add_files_into_redux,
  remove_files_into_redux,
} from "../../redux/slices/SelectedFiles";
import { is_parent_checked } from "../../redux/slices/FolderSlice";

const CheckBox = ({ file, index }) => {
  const files = useSelector((state) => state.selected_files.files);
  const dispatch = useDispatch();

  const selectedFileHandle = (e, file) => {
    const { checked } = e.target;
    let arr = [file.file_path];
    let data = {
      parent_folder_name: file.parent_folder_name,
      operator: file.subfolder_name,
      path: [file.file_path],
    };

    if (checked) {
      dispatch(selected_files({ array: arr, type: "particular" }));
      dispatch(
        counter({
          name: file.parent_folder_name + "-" + file.subfolder_name,
          type: "add",
        })
      );
      dispatch(add_files_into_redux(data));
    } else {
      dispatch(is_parent_checked({ index, checked }));
      dispatch(selected_files({ array: arr, type: "particular" }));
      dispatch(remove_files_into_redux(data));
      // dispatch(
      //   counter({
      //     name: file.parent_folder_name + "-" + file.subfolder_name,
      //     type: "remove",
      //   })
      // );
    }
  };

  return (
    <label
      className="subfolder-box box d-flex justify-content-between align-items-center mb-3"
      htmlFor={file.file_name}
    >
      <BsFillFileEarmarkTextFill className="file_icon" size={20} />
      <p
        className="ellipsis"
        data-toggle="tooltip"
        data-placement="top"
        title={file.file_name}
      >
        {file.file_name}
      </p>
      <input
        type="checkbox"
        id={file.file_name}
        value={file.file_name}
        onChange={(e) => selectedFileHandle(e, file)}
        checked={files?.includes(file?.file_path) ? true : false}
      />
    </label>
  );
};

export default CheckBox;
