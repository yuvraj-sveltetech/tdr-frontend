import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { folder } from "../../redux/slices/FolderSlice";
import * as URL from "../utils/ConstantUrl";
import { useLocation, useParams } from "react-router-dom";
import useApiHandle from "./useApiHandle";
import { fileProcess } from "../../redux/slices/ModalSlice";

const Modal = ({ controller, setController }) => {
  const modalType = useSelector((state) => state.modal?.modal_type);
  const { data, apiCall, status_code } = useApiHandle();
  const [buttonName, setButtonName] = useState("");
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (status_code === 201) {
      if (location?.pathname === "/dashboard") {
        getParentFolders();
      } else {
        getSubFolder();
      }
      return;
    }

    if (status_code === 200 && data?.length > 0) {
      if (location?.pathname === "/dashboard") {
        dispatch(folder({ take_action: "create_folder", data }));
      } else {
        // dispatch(folder({ take_action: "create_subfolder", data }));

        dispatch(
          folder({
            take_action: "create_subfolder",
            data: { id: +params?.parent_folder, sub_folder: data },
          })
        );
      }
    }
  }, [status_code, data, location?.pathname]);

  useEffect(() => {
    if (modalType === "Create Folder") {
      setButtonName("Create");
      return;
    }

    if (modalType === "Files is in process") {
      setButtonName("Cancel");
      return;
    }
  }, [modalType]);

  const getParentFolders = () => {
    if (params?.parent_folder) {
      apiCall(
        "get",
        `${URL.FOLDER_API}?project_id=${params?.parent_folder}`,
        {}
      );
      return;
    }
    apiCall("get", URL.FOLDER_API, {});
  };

  const getSubFolder = () => {
    apiCall(
      "get",
      `${URL.CREATE_SUB_FOLDER}?project_id=${params?.parent_folder}`,
      {}
    );
  };

  const handleChange = (e) => {
    setFolderName(e.target.value);
  };

  const clickHandler = async () => {
    if (modalType === "Create Folder") {
      if (params?.parent_folder?.length > 0) {
        apiCall("post", `${URL.CREATE_SUB_FOLDER}`, {
          location_name: folderName,
          project_id: params?.parent_folder,
        });
        setFolderName("");
        return;
      }

      apiCall("post", URL.FOLDER_API, { project_name: folderName });
      setFolderName("");
      return;
    }

    if (controller) {
      controller?.abort();
      setController(new AbortController());
      dispatch(fileProcess(false));
      dispatch(folder({ take_action: "unselect_all", data: null }));
    }
  };

  const conditionalModalContent = () => {
    if (modalType === "Create Folder") {
      return (
        <input
          type="text"
          className="w-100"
          placeholder="Enter Folder Name"
          value={folderName}
          onChange={(e) => handleChange(e)}
        />
      );
    }

    if (modalType === "Files is in process") {
      return (
        <div className="">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="spinner-border" role="status"></div>
            <span className="mt-1">Processing...</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className="modal"
      id="exampleModalToggle"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabindex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {modalType}
            </h5>

            {modalType !== "Files is in process" && (
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            )}
          </div>
          <div className="modal-body">{conditionalModalContent()}</div>
          <div className="modal-footer">
            {!modalType === "Files is in process" && (
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            )}

            <button
              type="button"
              className={`btn   ${
                modalType === "Files is in process"
                  ? "btn-danger"
                  : "btn-primary"
              }`}
              data-bs-dismiss="modal"
              disabled={
                modalType !== "Files is in process"
                  ? folderName
                    ? false
                    : true
                  : false
              }
              onClick={clickHandler}
            >
              {buttonName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
