import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdFolder } from "react-icons/md";
import { folder } from "../../../redux/slices/FolderSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../../utils/index";
import Modal from "../../utils/Modal";
import * as URL from "../../utils/ConstantUrl";
import useApiHandle from "../../utils/useApiHandle";

const SubFolder = ({ toggleFileUploadModal, category, modalType }) => {
  const { data, loading, apiCall, status_code } = useApiHandle();
  const folders = useSelector((state) => state.folder.created_folders);
  const [subFolder, setSubfolder] = useState({});

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

    !isSubfolderExist() &&
      apiCall(
        "get",
        `${URL.FOLDER_API}?project_id=${param?.parent_folder}`,
        {}
      );
  }, []);

  useEffect(() => {
    if (status_code === 200 && data?.data?.length > 0) {
      dispatch(folder({ take_action: "create_subfolder", data: data?.data }));
    }
  }, [status_code, data]);

  useEffect(() => {
    setSubfolder(
      folders?.filter((folder) => folder?.id === param?.parent_folder)?.[0]
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

  return (
    <>
      <div className="main">
        <Navbar
          toggleFileUploadModal={toggleFileUploadModal}
          category={category}
        />
        <div className="sub_folder d-flex flex-column align-items-start">
          {/* <h5>{files.sub_folders?.parent_folder}</h5> */}
          <div className="all-folders container">
            <h6>FOLDER</h6>

            {subFolder?.subFolder?.length === 0 ? (
              <div className="center-div">
                <h6 style={{ color: "red" }}>
                  Folder does not exist. Please create one
                </h6>
              </div>
            ) : (
              <div className="row list-unstyled">
                {subFolder?.subFolder?.map((folder) => {
                  return (
                    <div className="col-md-3" key={`SubFolder${folder?.id}`}>
                      <div
                        className="folder d-flex justify-content-start align-items-center subfolder-box position-relative"
                        onClick={(e) =>
                          navigate(`/${subFolder?.id}/${folder?.id}`)
                        }
                      >
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
                          {folder?.sub_folder_name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal modalType={modalType} category={category} />
    </>
  );
};

export { SubFolder };
