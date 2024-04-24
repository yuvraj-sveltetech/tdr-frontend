import React, { useEffect, useState } from "react";
import Modal from "bootstrap/js/dist/modal";
import { FiUpload } from "react-icons/fi";
import { AiOutlineFolderAdd } from "react-icons/ai";
import * as URL from "../../utils/ConstantUrl";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { is_selected } from "../../../redux/slices/BreadCrumbSlice";
import { fileProcess, modalType } from "../../../redux/slices/ModalSlice";
import useApiHandle from "../../utils/useApiHandle";

const AddFolder = ({ controller, setController }) => {
  const { data, loading, apiCall, status_code } = useApiHandle();
  const folders = useSelector((state) => state?.folder?.created_folders);
  const is_processed = useSelector((state) => state.modal.isFileProcessing);
  const processType = useSelector((state) => state.show_count.is_selected);
  // const [files, setFiles] = useState({});

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    console.log(data, "XXDatssa", status_code);

    if (status_code === 200) {
      console.log(data, "XXData");
    }
  }, [status_code]);

  useEffect(() => {
    let myModal = new Modal(document.getElementById("exampleModalToggle"), {
      keyboard: false,
    });

    console.log(is_processed, "is_processed");

    if (is_processed) {
      myModal.show();
      dispatch(modalType("Files is in process"));
    } else {
      myModal.hide();
    }
  }, [is_processed]);

  const getFilesData = async () => {
    if (params?.parent_folder) {
      // const controller = new AbortController();
      let files = {};

      for (const folder of Object.values(folders)) {
        for (const subFolder of Object.values(folder?.subFolder || {})) {
          const checkedFileIds =
            subFolder.file
              ?.filter((file) => file?.isChecked)
              .map((file) => file.id) || [];

          if (checkedFileIds.length > 0) {
            if (!files[folder.folder_name]) {
              files[folder.folder_name] = {};
            }
            files[folder.folder_name][subFolder.sub_folder_name] =
              checkedFileIds;
          }
        }
      }
      console.log("ffc", files, controller);

      Object.keys(files).length !== 0 &&
        apiCall(
          "post",
          `${URL.ANALYZE_FILES}?type=${processType}`,
          files,
          controller?.signal
        );

      dispatch(fileProcess(true));
    }
  };

  const isSelected = (e) => {
    const { value } = e.target;
    dispatch(is_selected(value));
  };

  return (
    <>
      <div className="folder navbar-right">
        <select
          className="form-select form-select-sm"
          name="drop-down"
          onChange={(e) => isSelected(e)}
        >
          <option value="compare">Compare</option>
          <option value="voip">V.O.I.P</option>
          <option value="tor_vpn">Tor/VPN</option>
        </select>

        <button
          className="btn btn-primary mx-2"
          id="send_data"
          onClick={getFilesData}
          disabled={is_processed.isDisable}
        >
          {is_processed.loading ? (
            <div className="d-flex align-items-center">
              <div
                className="spinner-border spinner-border-sm me-1"
                role="status"
              />
              Processing...
            </div>
          ) : (
            <h6 className="m-0">Process</h6>
          )}
        </button>

        {params?.parent_folder && params?.subfolder ? (
          <a
            className={`btn btn-primary d-flex align-items-center justify-content-between   ${
              params?.parent_folder && params?.subfolder ? "ms-0" : "ms-2"
            }`}
            data-bs-toggle="modal"
            href="#exampleModalToggle2"
            role="button"
          >
            <FiUpload size="18" />
            <h6 className="m-0 ms-1">Upload Files</h6>
          </a>
        ) : (
          <a
            className="btn btn-primary d-flex align-items-center justify-content-between"
            data-bs-toggle="modal"
            href="#exampleModalToggle"
            role="button"
            onClick={() => dispatch(modalType("Create Folder"))}
          >
            <AiOutlineFolderAdd size="20" />
            <h6 className="m-0 ms-1">Create Folder</h6>
          </a>
        )}
      </div>
    </>
  );
};

export { AddFolder };
