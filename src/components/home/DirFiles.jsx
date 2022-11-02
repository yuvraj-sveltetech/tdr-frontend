import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selected_files } from "../../redux/slices/FolderSlice";

const DirFiles = () => {
  const files = useSelector((state) => state.folder);
  const dispatch = useDispatch();

  const selectFile = async (file) => {
    dispatch(selected_files(file));
  };

  const sendFileToBackend = async () => {
    let res = await window.to_electron.send_files(
      "send_files",
      files.selected_files
    );
    console.log(res.data, "file_Response");
  };

  return (
    <div className="all_files">
      <button onClick={sendFileToBackend}>Send</button>
      {files?.all_files?.map((file) => {
        return (
          <>
            <ul className="d-flex list-unstyled" key={`all_file${file}`}>
              <input
                type="checkbox"
                value={file}
                onChange={(e) => selectFile(file)}
              />
              <li>{file.file_name}</li>
            </ul>
          </>
        );
      })}
    </div>
  );
};

export { DirFiles };
