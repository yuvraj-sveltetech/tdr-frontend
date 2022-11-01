import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApiHandle from "../utils/useApiHandle";
import { selected_files } from "../../redux/slices/FolderSlice";

const DirFiles = () => {
  const all_files = useSelector((state) => state.folder.all_files);
  const selectedFiles = useSelector((state) => state.folder.selected_files);
  const { data, loading, apiCall } = useApiHandle();
  const dispatch = useDispatch();
  console.log(all_files);

  useEffect(() => {
    // if (data?.data) {
    // localStorage.setItem("auth_token", data?.data?.access_token);
    // localStorage.setItem("refresh_token", data?.data?.refresh_token);
    // localStorage.setItem("user_email", data?.data?.email);
    // navigate("/dashboard");
    // }
    console.log(selectedFiles);
    if (selectedFiles.length > 0) {
      let formData = new FormData();
      selectedFiles.forEach((file) => formData.append("file", file));
      // selectedFiles.forEach((file) => {
      //   console.log(file);
      // });

      apiCall("post", "tdr/getSubFolder/", formData);
    }
  }, [selectedFiles]);

  // const send = (path) => {
  //   // let formData = new FormData();
  //   // // formData.append("file", fs.createReadStream(path));
  //   // apiCall("post", URL.LOGIN, formData);
  // };

  const selectFile = (e) => {
    dispatch(selected_files(e.target.files));
  };

  return (
    <div className="all_files">
      {all_files?.map((file) => {
        return <li>{file.file_name}</li>;
      })}
      <input type="file" multiple onChange={(e) => selectFile(e)} />
    </div>
  );
};

export { DirFiles };
