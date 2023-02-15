import React from "react";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  selected_files,
  unselectect_files,
  counter,
  add_files_into_redux,
  remove_files_into_redux,
} from "../../redux/slices/SelectedFiles";

const CheckBox = ({ file }) => {
  const files = useSelector((state) => state.selected_files.files);
  const dispatch = useDispatch();

  const selectedFileHandle = (e, file) => {
    const { checked } = e.target;
    let data = {
      parent_folder_name: file.parent_folder_name,
      operator: file.subfolder_name,
      path: [file.file_path],
    };

    if (checked) {
      dispatch(selected_files(file.file_path));
      dispatch(counter(file.parent_folder_name + "-" + file.subfolder_name));
      dispatch(add_files_into_redux(data));
    } else {
      dispatch(unselectect_files(file.file_path));
      dispatch(remove_files_into_redux(data));
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
        checked={files.includes(file.file_path) ? true : false}
      />
    </label>
  );
};

export default CheckBox;
