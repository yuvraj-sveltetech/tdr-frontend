import React from "react";
import "./CreateFolder.css";
import { useSelector, useDispatch } from "react-redux";
import { selected_files } from "../../redux/slices/FolderSlice";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";

const DirFiles = () => {
  const files = useSelector((state) => state.folder);
  const dispatch = useDispatch();

  const selectFile = async (file) => {
    dispatch(selected_files(file));
  };
  console.log(files);
  const sendFileToBackend = async () => {
    let res = await window.to_electron.send_files(
      "send_files",
      files.selected_files
    );
    console.log(res.data, "file_Response");
  };

  return (
    <div className="all_files">
      <ul className="d-flex list-style justify-content-between flex-wrap">
        {files?.all_files?.map((file) => {
          return (
            <div
              key={`all_files${file.file_name}asa`}
              className="subfolder-box box d-flex justify-content-between align-items-center mb-3"
            >
              <BsFillFileEarmarkTextFill />
              <li className="ellipsis">{file.file_name}</li>
              <input
                type="checkbox"
                value={file}
                onChange={(e) => selectFile(file)}
              />
            </div>
          );
        })}
      </ul>
      <button onClick={sendFileToBackend}>Send</button>
    </div>
  );
};

export { DirFiles };
