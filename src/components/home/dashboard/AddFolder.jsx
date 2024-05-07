import React, { useEffect, useState } from "react";
import Modal from "bootstrap/js/dist/modal";
import { FiUpload } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { is_selected } from "../../../redux/slices/BreadCrumbSlice";
import { fileProcess, modalType } from "../../../redux/slices/ModalSlice";
import useApiHandle from "../../utils/useApiHandle";
import { folder } from "../../../redux/slices/FolderSlice";
import { downloadFile } from "../../../utils/downloadFile";
import { toast } from "react-toastify";

const AddFolder = ({ controller }) => {
  const { data, loading, apiCall, status_code } = useApiHandle();
  const folders = useSelector((state) => state?.folder?.created_folders);
  const is_processed = useSelector((state) => state.modal.isFileProcessing);
  const processType = useSelector((state) => state.show_count.is_selected);
  const [modalInstance, setModalInstance] = useState(null);

  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    let myModal = Modal.getOrCreateInstance(
      document.getElementById("exampleModalToggle"),
      {
        keyboard: false,
      }
    );
    setModalInstance(myModal);
  }, []);

  useEffect(() => {
    dispatch(fileProcess(loading));
    if (status_code === 200) {
      downloadFile(data?.data);
      dispatch(folder({ take_action: "unselect_all", data: null }));
    } else {
      dispatch(folder({ take_action: "unselect_all", data: null }));
    }
  }, [loading, status_code, modalInstance, dispatch, data]);

  useEffect(() => {
    if (typeof modalInstance === "object") {
      if (is_processed) {
        modalInstance?.show();
        modalInstance._config.backdrop = "static";
        dispatch(modalType("Files is in process"));
      } else {
        modalInstance?.hide();
        dispatch(modalType(""));
      }
    }
  }, [is_processed, modalInstance, dispatch]);

  const getFilesData = async () => {
    let selectedFileIDs = [];

    for (const folder of Object.values(folders)) {
      const checkedFileIds =
        folder?.subFolder
          ?.filter((file) => file?.select_all)
          ?.map((file) => file.id) || [];
      if (checkedFileIds.length > 0) {
        selectedFileIDs.push(checkedFileIds);
      }
    }

    if (selectedFileIDs?.length === 0) {
      toast.warning("please select atleast 1 location");
    }

    if (selectedFileIDs?.length > 0 && params?.parent_folder?.length > 0) {
      apiCall(
        "get",
        `api/${processType}/?ids=${selectedFileIDs}&pro_id=${params?.parent_folder}`,
        {},
        controller?.signal
      );
    }
  };

  const isSelected = (e) => {
    const { value } = e.target;
    dispatch(is_selected(value));
  };

  return (
    <>
      <div className="folder navbar-right">
        {params?.parent_folder?.length > 0 && (
          <>
            <select
              className="form-select form-select-sm"
              name="drop-down"
              onChange={(e) => isSelected(e)}
            >
              {/* <option value="compare">Compare</option>
          <option value="voip">V.O.I.P</option>
          <option value="tor_vpn">Tor/VPN</option>
          <option value="matching_numbers">Match Numbers</option> */}

              <option value="export-ist-numbers">
                All International Numbers
              </option>
              <option value="get-other-state-numbers">
                Other State Numbers
              </option>
              <option value="get-call-type-counts">Call Type Counts</option>
              <option value="search-numbers">
                Target Numbers Exists/Not Exists on Locations
              </option>
              <option value="get-call-duration-numbers">
                Calls more than 30 Minutes
              </option>
              <option value="get-common-imei-numbers">
                Numbers Using different Mobile
              </option>
              <option value="get-common-number-on-imeis">
                Mobile using different Numbers
              </option>
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
          </>
        )}

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
            <h6 className="m-0 ms-1">
              {location.pathname === "/" ? "Create Case" : "Create Location"}
            </h6>
          </a>
        )}
      </div>
    </>
  );
};

export { AddFolder };
