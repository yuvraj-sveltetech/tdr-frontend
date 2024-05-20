import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdFolder, MdOutlineFileDownload } from "react-icons/md";
import { folder } from "../../../redux/slices/FolderSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../../utils/index";
import * as URL from "../../utils/ConstantUrl";
import useApiHandle from "../../utils/useApiHandle";
import { downloadFile } from "../../../utils/downloadFile";
import { toast } from "react-toastify";

const SubFolder = ({ toggleFileUploadModal, category, modalType }) => {
  const { data, loading, apiCall, status_code } = useApiHandle();
  const folders = useSelector((state) => state.folder.created_folders);
  const [subFolder, setSubfolder] = useState([]);
  const toastId = useRef(null);

  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const isFolderExist = folders?.some(
      (folder) => folder?.id === +param?.parent_folder
    );

    if (!isFolderExist) {
      navigate("/not-found");
      return;
    }

    !isSubfolderExist() &&
      apiCall(
        "get",
        `${URL.CREATE_SUB_FOLDER}?project_id=${param?.parent_folder}`,
        {}
      );
  }, []);

  useEffect(() => {
    if (status_code === 200) {
      if (data?.length > 0) {
        dispatch(
          folder({
            take_action: "create_subfolder",
            data: { id: +param?.parent_folder, sub_folder: data },
          })
        );
        return;
      }

      if (!Array.isArray(data)) {
        toast.dismiss(toastId.current);
        downloadFile(data?.data);
      }
    }
  }, [status_code, data, loading]);

  useEffect(() => {
    setSubfolder(
      ...folders?.filter((folder) => folder?.id === +param?.parent_folder)
    );
  }, [folders, param?.parent_folder]);

  const selectAllFiles = (e, folderD) => {
    const { checked } = e.target;

    dispatch(
      folder({
        take_action: "select_all_checkbox",
        data: { ...param, subfolder_id: folderD?.id, checked },
      })
    );

    if (!checked) {
      dispatch(
        folder({
          take_action: "unselect_all_checkbox",
          data: { checked, parent_folder: param?.parent_folder },
        })
      );
    }
  };

  const isSubfolderExist = () => {
    const isExist = folders?.some(
      (fld) => fld?.id === +param?.parent_folder && fld?.subFolder?.length > 0
    );
    return isExist;
  };

  const isSubfolderChecked = (subfolder_id) => {
    let isChecked;

    for (let folder in folders) {
      if (folders[folder]?.id === +param?.parent_folder) {
        for (let sub in folders[folder]?.subFolder) {
          if (folders[folder]?.subFolder?.[sub]?.id === +subfolder_id) {
            isChecked = folders[folder]?.subFolder?.[sub]?.select_all;
            break;
          }
        }
      }
    }

    return isChecked;
  };

  const changeAllSubfolders = (e) => {
    const { checked } = e.target;

    dispatch(
      folder({
        take_action: "select_all_subfolder",
        data: { checked, parent_folder: param?.parent_folder },
      })
    );
  };


  function isSelectAllChecked() {
    if (folders?.length > 0) {
      for (let folder in folders) {
        if (
          folders.hasOwnProperty(folder) &&
          folders[folder]?.id === +param?.parent_folder
        ) {
          if (
            !folders[folder].hasOwnProperty("subFolder") ||
            folders[folder]?.subFolder?.length === 0
          ) {
            return false;
          }

          for (let sub in folders[folder]?.subFolder) {
            if (folders[folder]?.subFolder.hasOwnProperty(sub)) {
              if (!folders[folder]?.subFolder?.[sub]?.select_all) {
                return false;
              }
            }
          }
        }
      }

      return true;
    }
  }

  // function isSelectAllChecked() {
  //   if (folders?.length > 0) {
  //     for (const folder of Object.values(folders)) {
  //       if (+param?.parent_folder === folder?.id) {
  //         return folder?.select_all;
  //       }
  //     }
  //   } else {
  //     return false;
  //   }
  // }

  const exportCSV = (e, id) => {
    e.stopPropagation();
    toastId.current = toast.loading("Downloading File...");
    apiCall(
      "get",
      `${URL.EXPORT_CSV}?location_id=${id}&project_id=${param?.parent_folder}`,
      {}
    );
  };

  return (
    <>
      <div className="main">
        <Navbar
          toggleFileUploadModal={toggleFileUploadModal}
          category={category}
        />
        <div className="sub_folder d-flex flex-column align-items-start">
          {/* <h5>{files.sub_folders?.parent_folder}</h5> */}
          <div
            className="all-folders container"
            style={{ overflow: "auto", height: "60vh" }}
          >
            <hr style={{ padding: "0", margin: "0", color: "#B6B6B6" }} />
            <div className="d-flex align-items-center justify-content-between">
              <h6>FOLDER</h6>
              <div className="d-flex align-items-center">
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

            {loading && typeof subFolder?.subFolder === "undefined" ? (
              <div className="d-flex justify-content-center center-div">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : subFolder?.subFolder?.length > 0 ? (
              <div className="row list-unstyled">
                {subFolder?.subFolder?.map((folder) => {
                  return (
                    <div
                      className="col-md-3 mb-3"
                      key={`SubFolder${folder?.id}`}
                    >
                      <div
                        className="folder d-flex justify-content-start align-items-center subfolder-box position-relative"
                        onClick={(e) =>
                          navigate(`/${subFolder?.id}/${folder?.id}`)
                        }
                      >
                        <span
                          className="align-self-end me-2 position-absolute cursot"
                          style={{ bottom: "5px", right: "-5px" }}
                        >
                          <MdOutlineFileDownload
                            size={20}
                            color="gray"
                            onClick={(e) => exportCSV(e, folder?.id)}
                          />
                        </span>

                        <input
                          type="checkbox"
                          checked={isSubfolderChecked(folder?.id)}
                          onChange={(e) => selectAllFiles(e, folder)}
                          onClick={(e) => e.stopPropagation()}
                          className="align-self-end me-2 position-absolute end-0 cursot"
                          style={{ top: "8px", cursor: "pointer" }}
                        />
                        <li
                          onClick={(e) =>
                            navigate(`/${subFolder?.id}/${folder?.id}`)
                          }
                        >
                          <MdFolder size="32" className="folderIcon" />
                        </li>
                        <p style={{ margin: "auto 0", padding: "0 0.4rem" }}>
                          {folder?.location_name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              !loading && (
                // !subFolder.hasOwnProperty("subFolder") &&

                <div className="center-div">
                  <h6 style={{ color: "red" }}>
                    Folder does not exist. Please create one
                  </h6>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* <Modal modalType={modalType} category={category}  /> */}
    </>
  );
};

export { SubFolder };
