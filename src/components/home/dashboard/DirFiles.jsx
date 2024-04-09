import React, { useEffect } from "react";
import "./CreateFolder.css";
import { useParams } from "react-router-dom";
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
    !isFileExist() &&
      apiCall(
        "get",
        `${URL.UPLOAD_FILES}?sub_folder_id=${param?.subfolder}`,
        {}
      );
  }, []);

  const isFileExist = () => {
    const isExist = folders?.some(
      (fld) =>
        fld?.id === param?.parent_folder &&
        fld?.subFolder?.some(
          (subfl) => subfl?.id === param?.subfolder && subfl?.file?.length > 0
        )
    );
    return isExist;
  };

  const renderFiles = () => {
    return folders?.map(
      (folder) =>
        folder?.id === param?.parent_folder &&
        folder?.subFolder?.map(
          (subFolder) =>
            subFolder?.id === param?.subfolder &&
            subFolder?.file?.map((fl) => (
              <div className="col-md-3" key={`all_files${fl.id}`}>
                <CheckBox file={fl} index={index} />
              </div>
            ))
        )
    );
  };

  return (
    <div className="main">
      <Navbar
        toggleFileUploadModal={toggleFileUploadModal}
        category={category}
      />

      <div className="all_files">
        <div className="d-flex justify-content-between align-items-center">
          <h6>FILES</h6>
          {/* <label className="select-all d-flex" htmlFor="selectAll">
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
          </label> */}
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
