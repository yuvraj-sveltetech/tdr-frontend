import React, { useState, useEffect, useMemo } from "react";
import "./CreateFolder.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as URL from "../../utils/ConstantUrl";
import useApiHandle from "../../utils/useApiHandle";

import { Navbar } from "../../utils/index";
import { folder } from "../../../redux/slices/FolderSlice";

import CheckBox from "./CheckBox";

import Modal from "../../utils/Modal";
import FileUploadModal from "../../utils/FileUploadModal";

const DirFiles = ({ index, toggleFileUploadModal, category, modalType }) => {
  const { data, loading, apiCall, status_code } = useApiHandle();
  const folders = useSelector((state) => state.folder.created_folders);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const param = useParams();

  useEffect(() => {
    if (status_code === 200 && data?.data?.length > 0) {
      dispatch(
        folder({
          take_action: "add_files",
          data: { api_data: data?.data, params: param },
        })
      );
    }
  }, [status_code, data]);

  useEffect(() => {
    apiCall("get", `${URL.UPLOAD_FILES}?sub_folder_id=${param?.subfolder}`, {});
  }, []);

  const renderFiles = () => {
    return folders?.map(
      (folder) =>
        folder?.id === param?.parent_folder &&
        folder?.subFolder?.map(
          (subFolder) =>
            subFolder?.id === param?.subfolder &&
            subFolder?.files?.map((file) => (
              <div className="col-md-3" key={`all_files${file.id}`}>
                <CheckBox file={file} index={index} />
              </div>
            ))
        )
    );
  };

  console.log(param, "ramXX", folders);

  return (
    <div className="main">
      <Navbar
        toggleFileUploadModal={toggleFileUploadModal}
        category={category}
      />

      <div className="all_files">
        <div className="d-flex justify-content-between align-items-center">
          <h6>FILES</h6>
          <label className="select-all d-flex" htmlFor="selectAll">
            <input
              className="me-1"
              type="checkbox"
              value="selectAll"
              id="selectAll"
              // checked={isChecked()}
              // onChange={(e) => {
              //   selectAllFilesHandle(e);
              // }}
            />
            <span>Select All</span>
          </label>
        </div>

        <div className="container-fluid allFiles">
          <div className="row">{renderFiles()}</div>
        </div>
      </div>
      <Modal modalType={modalType} category={category} />

      <FileUploadModal />
    </div>
  );
};

export { DirFiles };
