import React from "react";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { folder } from "../../../redux/slices/FolderSlice";

const CheckBox = ({ file }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const selectedFileHandle = (e, file) => {
    const { checked } = e.target;
    dispatch(
      folder({
        take_action: "file_checkbox",
        data: { ...file, ...params, checked },
      })
    );
  };

  return (
    <label
      className="subfolder-box box d-flex justify-content-between align-items-center mb-3"
      htmlFor={file?.file_name}
    >
      <BsFillFileEarmarkTextFill className="file_icon" size={20} />
      <p
        className="ellipsis"
        data-toggle="tooltip"
        data-placement="top"
        title={file?.file_name}
      >
        {file?.file_name}
      </p>
      <input
        type="checkbox"
        disabled
        id={file?.file_name}
        value={file?.file_name}
        onChange={(e) => selectedFileHandle(e, file)}
        checked={file?.isChecked}
      />
    </label>
  );
};

export default CheckBox;
