import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteOutline, MdFolder } from "react-icons/md";
import { folder } from "../../../redux/slices/FolderSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../../utils/index";
import Modal from "../../utils/Modal";
import * as URL from "../../utils/ConstantUrl";
import useApiHandle from "../../utils/useApiHandle";
import { RxCross2 } from "react-icons/rx";
import CrudModal from "../../utils/CrudModal";

const SubFolder = ({ toggleFileUploadModal, category, modalType }) => {
  const { data, loading, apiCall, status_code } = useApiHandle();
  const folders = useSelector((state) => state.folder.created_folders);
  const [subFolder, setSubfolder] = useState({});
  const [fileIds, setFileIds] = useState([]);

  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const isFolderExist = folders?.some(
      (folder) => folder?.id === param?.parent_folder
    );

    if (!isFolderExist) {
      navigate("/not-found");
      return;
    }

    !isSubfolderExist() && getData();
  }, []);

  useEffect(() => {
    if (status_code === 200 && data?.data?.length > 0) {
      dispatch(folder({ take_action: "create_subfolder", data: data?.data }));
    }

    if (data?.message === "Deleted successfully") {
      getData();
    }
  }, [status_code, data]);

  useEffect(() => {
    setSubfolder(
      folders?.filter((folder) => folder?.id === param?.parent_folder)?.[0]
    );

    getCheckedFiles();
  }, [folders, param?.parent_folder]);

  const getData = async () => {
    apiCall("get", `${URL.FOLDER_API}?project_id=${param?.parent_folder}`, {});
  };

  const selectAllFiles = (e, folderD) => {
    const { checked } = e.target;

    dispatch(
      folder({
        take_action: "select_all_checkbox",
        data: { ...param, subfolder_id: folderD?.id, checked },
      })
    );
  };

  const isSubfolderExist = () => {
    const isExist = folders?.some(
      (fld) => fld?.id === param?.parent_folder && fld?.subFolder?.length > 0
    );
    return isExist;
  };

  const isSubfolderChecked = (subfolder_id) => {
    let isChecked;

    for (let folder in folders) {
      if (folders[folder]?.id === param?.parent_folder) {
        for (let sub in folders[folder]?.subFolder) {
          if (folders[folder]?.subFolder?.[sub]?.id === subfolder_id) {
            isChecked = folders[folder]?.subFolder?.[sub]?.select_all;
            break;
          }
        }
      }
    }

    return isChecked;
  };

  function isSelectAllChecked() {
    if (folders?.length > 0) {
      for (let folder in folders) {
        if (
          folders.hasOwnProperty(folder) &&
          folders[folder]?.id === param?.parent_folder
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

  const changeAllSubfolders = (e) => {
    const { checked } = e.target;

    dispatch(
      folder({
        take_action: "select_all_subfolder",
        data: { checked, parent_folder: param?.parent_folder },
      })
    );
  };

  // function isSelectAllChecked() {
  //   if (folders?.length > 0) {
  //     for (const folder of Object.values(folders)) {
  //       if (param?.parent_folder === folder?.id) {
  //         return folder?.select_all;
  //       }
  //     }
  //   } else {
  //     return false;
  //   }
  // }

  const deleteFile = (e, id) => {
    e.stopPropagation();
    apiCall("delete", `${URL.DELETE}?type=sub_folder&file_id=${id}`, {});
  };

  const getCheckedFiles = () => {
    if (folders?.length > 0) {
      const checkedFileIds = [];
      folders.forEach((folder) => {
        if (
          folder?.id === param?.parent_folder &&
          folder?.subFolder?.length > 0
        ) {
          folder.subFolder.forEach((sub) => {
            // if (sub?.id === param?.subfolder && sub?.file?.length > 0) {
            //   sub.file.forEach((file) => {
            //     if (file?.isChecked) {
            //       checkedFileIds.push(file?.id);
            //     }
            //   });
            // }

            if (sub?.select_all) {
              checkedFileIds.push(sub?.id);
            }
          });
        }
      });
      setFileIds(checkedFileIds);
    }
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
          <div className="all-folders container" style={{ height: "60vh" }}>
            <hr style={{ padding: "0", margin: "0", color: "#B6B6B6" }} />
            <div className="d-flex align-items-center justify-content-between">
              <h6>FOLDER</h6>

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

            <div
              className="container py-2"
              style={{ overflow: "auto", height: "60vh" }}
            >
              <div className="row" style={{ height: "auto" }}>
                {loading ? (
                  <div className="d-flex justify-content-center center-div">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : !loading && subFolder?.subFolder?.length > 0 ? (
                  <>
                    {subFolder?.subFolder?.map((folder) => {
                      return (
                        <div
                          className="col-md-3"
                          key={`SubFolder${folder?.id}`}
                        >
                          <div
                            className="position-relative file folder d-flex justify-content-start align-items-center subfolder-box position-relative list-unstyled mb-3"
                            onClick={(e) =>
                              navigate(`/${subFolder?.id}/${folder?.id}`)
                            }
                          >
                            <span
                              className="align-self-end me-2 position-absolute cursot"
                              style={{ bottom: "5px", right: "-5px" }}
                            ></span>

                            <div
                              className="dot"
                              style={{ left: "-9px", top: "-7px" }}
                              onClick={(e) => deleteFile(e, folder.id)}
                            >
                              <RxCross2 size={13} />
                            </div>

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
                            <p
                              style={{ margin: "auto 0", padding: "0 0.4rem" }}
                            >
                              {folder?.sub_folder_name}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  !loading &&
                  subFolder?.subFolder?.length === 0 && (
                    <div className="center-div w-auto">
                      <h6
                        style={{
                          color: "red",
                        }}
                      >
                        Folder does not exist. Please create one
                      </h6>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal modalType={modalType} category={category} />
      <CrudModal
        ids={fileIds}
        setFileIds={setFileIds}
        txt="all folders"
        type="sub_folder"
        operation="delete"
      />
    </>
  );
};

export { SubFolder };
