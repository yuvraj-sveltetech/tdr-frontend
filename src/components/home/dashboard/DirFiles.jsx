import React, { useEffect, useState } from "react";
import "./CreateFolder.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as URL from "../../utils/ConstantUrl";
import { MdDeleteOutline } from "react-icons/md";
import useApiHandle from "../../utils/useApiHandle";
import { Navbar } from "../../utils/index";
import { folder } from "../../../redux/slices/FolderSlice";
import CheckBox from "./CheckBox";
import Modal from "../../utils/Modal";
import FileUploadModal from "../../utils/FileUploadModal";

const DirFiles = ({ index, toggleFileUploadModal, category, modalType }) => {
  const { data, apiCall, status_code, loading } = useApiHandle();
  const folders = useSelector((state) => state.folder.created_folders);
  const [fileIds, setFileIds] = useState([]);

  const dispatch = useDispatch();
  const param = useParams();

  useEffect(() => {
    !isFileExist() &&
      apiCall(
        "get",
        `${URL.ALL_FILES}?project_id=${param?.parent_folder}&location_id=${param?.subfolder}`,
        {}
      );
  }, []);

  useEffect(() => {
    if (status_code === 200 && data?.length > 0) {
      dispatch(
        folder({
          take_action: "add_files",
          data: { api_data: data, params: param },
        })
      );
    }
  }, [status_code, data, dispatch, param]);

  const isFileExist = () => {
    const isExist = folders?.some(
      (fld) =>
        fld?.id === +param?.parent_folder &&
        fld?.subFolder?.some(
          (subfl) => subfl?.id === +param?.subfolder && subfl?.file?.length > 0
        )
    );
    return isExist;
  };

  const renderFiles = () => {
    const result = folders?.map(
      (folder) =>
        folder?.id === +param?.parent_folder &&
        folder?.subFolder?.map(
          (subFolder) =>
            subFolder?.id === +param?.subfolder &&
            subFolder?.file?.map((fl) => (
              <div
                className="col-md-3 position-relative file"
                key={`all_files${fl.id}`}
              >
                <CheckBox file={fl} index={index} />
              </div>
            ))
        )
    );

    const hasFiles = result.some(
      (folder) =>
        folder && folder.some((subFolder) => subFolder && subFolder.length > 0)
    );

    if (!hasFiles) {
      return false;
    }

    return result;
  };

  function isSelectAllChecked() {
    if (folders?.length > 0) {
      for (let folder in folders) {
        if (
          folders.hasOwnProperty(folder) &&
          folders[folder]?.id === +param?.parent_folder
        ) {
          for (let sub in folders[folder]?.subFolder) {
            if (
              folders[folder]?.subFolder.hasOwnProperty(sub) &&
              folders[folder]?.subFolder?.[sub]?.id === +param?.subfolder
            ) {
              if (folders[folder]?.subFolder?.[sub]?.file?.length === 0) {
                return false;
              }
              for (let file in folders[folder]?.subFolder?.[sub]?.file) {
                if (
                  folders[folder]?.subFolder?.[sub]?.file.hasOwnProperty(file)
                ) {
                  if (
                    !folders[folder]?.subFolder?.[sub]?.file[file]?.isChecked
                  ) {
                    return false;
                  }
                }
              }
            }
          }
        }
      }

      return true;
    }
  }

  const changeAllSubfolders = (e) => {
    const { checked } = e.target;

    dispatch(
      folder({
        take_action: "select_all_files",
        data: {
          checked,
          ...param,
        },
      })
    );
  };

  return (
    <div className="main">
      <Navbar
        toggleFileUploadModal={toggleFileUploadModal}
        category={category}
      />

      <div className="all_files">
        <div className="d-flex align-items-center justify-content-between">
          <h6>FILES</h6>

          <div className="d-flex align-items-center">
            {fileIds?.length > 1 && (
              <MdDeleteOutline
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                color="red"
                size={18}
                className="me-2"
                style={{ cursor: "pointer" }}
              />
            )}

            <label
              htmlFor="select_All"
              style={{
                fontSize: "13px",
                marginRight: "3px",
                marginBottom: "1px",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              Select All
            </label>
            <input
              type="checkbox"
              id="select_All"
              checked={isSelectAllChecked()}
              onChange={(e) => {
                changeAllSubfolders(e);
              }}
            />
          </div>
        </div>

        <div className="container" style={{ overflow: "auto", height: "60vh" }}>
          <div className="row py-2">
            {loading ? (
              <div className="d-flex justify-content-center center-div">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              renderFiles() || (
                <div className="d-flex align-items-center justify-content-center">
                  <h6 style={{ color: "red" }}>
                    Folder does not exist. Please create one.
                  </h6>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <Modal modalType={modalType} category={category} />
      <FileUploadModal />
    </div>
  );
};

export { DirFiles };
