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
    <div className="all_files container">
      <div className="row">
        {files?.all_files?.map((file) => {
          return (
            <div className="col-md-3" key={`all_files${file.file_name}`}>
              <div className="subfolder-box box d-flex justify-content-between align-items-center mb-3">
                <BsFillFileEarmarkTextFill />
                <p className="ellipsis">{file.file_name}</p>
                <input
                  type="checkbox"
                  value={file}
                  onChange={(e) => selectFile(file)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={sendFileToBackend}>Send</button>
    </div>
  );
};

export { DirFiles };
