import React, { useEffect, useState } from "react";
import Modal from "bootstrap/js/dist/modal";
import { FiUpload } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { is_selected } from "../../../redux/slices/BreadCrumbSlice";
import { modalType } from "../../../redux/slices/ModalSlice";
import { toast } from "react-toastify";
import ViewFile from "./modal/ViewFile";
import { ipdrOptions, options } from "../../utils/process-api-endpoint";

const AddFolder = ({ controller }) => {
  const folders = useSelector((state) => state.folder.created_folders);
  const is_processed = useSelector((state) => state.modal.isFileProcessing);
  const processType = useSelector((state) => state.show_count);
  const selectedValue = useSelector((state) => state.show_count);

  const [selectedFileIDs, setSelectedFileIDs] = useState([]);
  const [modalInstance, setModalInstance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    const myModal = Modal.getOrCreateInstance(
      document.getElementById("exampleModalToggle"),
      { keyboard: false }
    );
    setModalInstance(myModal);
  }, []);

  useEffect(() => {
    if (modalInstance) {
      if (is_processed) {
        modalInstance.show();
        modalInstance._config.backdrop = "static";
        dispatch(modalType("Files is in process"));
      } else {
        modalInstance.hide();
        dispatch(modalType(""));
      }
    }
  }, [is_processed, modalInstance, dispatch]);

  useEffect(() => {
    if (selectedFileIDs.length > 0 && params?.parent_folder?.length > 0) {
      setIsModalOpen(true);
    }
  }, [selectedFileIDs, params?.parent_folder]);

  const getFilesData = async () => {
    try {
      const selectedFiles = (folders || [])
        .flatMap((folder) =>
          folder?.subFolder
            ?.filter((subFolder) => subFolder?.select_all)
            .map((subFolder) => subFolder.id)
        )
        .filter(Boolean); // Remove undefined, null, or falsy values

      setSelectedFileIDs(selectedFiles);

      if (selectedFiles.length === 0) {
        const warningMessage =
          params?.parent_folder?.length > 0
            ? !params?.subfolder
              ? "Location Folders"
              : "All Files"
            : "";
        toast.warning(`Please Upload Files or Select ${warningMessage}`);
      }
    } catch (error) {
      toast.error("An error occurred while fetching files.");
      console.error(error);
    }
  };

  const isSelected = (e, isSubOption) =>
    dispatch(
      is_selected({
        value: e.target.value,
        is_sub_category_option: isSubOption,
      })
    );

  const renderIpdrSubOptions = () => {
    if (ipdrOptions.type !== processType?.is_selected) return null;

    return (
      <select
        className="form-select form-select-sm ms-2"
        name="drop-down-sub-option"
        value={processType.is_sub_ipdr_option || ""}
        onChange={(e) => isSelected(e, true)}
      >
        {ipdrOptions?.options?.map((option) => (
          <option value={option?.value} key={option?.value}>
            {option?.name}
          </option>
        ))}
      </select>
    );
  };

  return (
    <>
      <div className="folder navbar-right" style={{ flexBasis: "70%" }}>
        {params?.parent_folder?.length > 0 && (
          <>
            <select
              className="form-select form-select-sm"
              name="drop-down-main"
              value={processType?.is_selected}
              onChange={(e) => isSelected(e, false)}
            >
              {options?.[selectedValue?.active_btn]?.map((option) => (
                <option value={option?.endpoint} key={option?.endpoint}>
                  {option?.name}
                </option>
              ))}
            </select>

            {renderIpdrSubOptions()}

            <button
              className="btn btn-primary mx-2"
              id="send_data"
              onClick={getFilesData}
            >
              <h6 className="m-0">Process</h6>
            </button>
          </>
        )}

        {params?.parent_folder && params?.subfolder ? (
          <a
            className="btn btn-primary d-flex align-items-center justify-content-between"
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

      {isModalOpen && (
        <ViewFile
          ids={selectedFileIDs}
          pro_id={params?.parent_folder}
          apiURL={`api/${processType?.is_selected}/`}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export { AddFolder };
