import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { folder } from "../../redux/slices/FolderSlice";
import * as URL from "../utils/ConstantUrl";
import { useLocation, useParams } from "react-router-dom";
import useApiHandle from "./useApiHandle";

const Modal = () => {
  const modalType = useSelector((state) => state.modal?.modal_type);
  const { data, loading, apiCall, status_code } = useApiHandle();
  const [buttonName, setButtonName] = useState("");
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (status_code === 201) {
      getParentFolders();
      return;
    }

    if (status_code === 200 && data?.data?.length > 0) {
      if (location?.pathname === "/dashboard") {
        dispatch(folder({ take_action: "create_folder", data: data?.data }));
      } else {
        dispatch(folder({ take_action: "create_subfolder", data: data?.data }));
      }
    }
  }, [status_code, data, location?.pathname]);

  useEffect(() => {
    if (modalType === "Create Folder") {
      setButtonName("Create");
    }
    conditionalModalContent();
  }, [modalType]);

  // const changeCategory = (item) => {
  //   setCategory(item);
  // };

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

  const handleChange = (e) => {
    setFolderName(e.target.value);
  };

  const create_folder = async () => {
    if (params?.parent_folder?.length > 0) {
      apiCall(
        "post",
        `${URL.CREATE_SUB_FOLDER}?project_id=${params?.parent_folder}`,
        {
          sub_folder_name: folderName,
        }
      );
      setFolderName("");
      return;
    }

    apiCall("post", URL.FOLDER_API, { folder_name: folderName });

    setFolderName("");
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
  };

  return (
    <div
      className="modal fade"
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
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{conditionalModalContent()}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              disabled={folderName ? false : true}
              onClick={create_folder}
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
