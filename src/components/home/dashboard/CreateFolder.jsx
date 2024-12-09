import React, { useEffect, useState } from "react";
import "./CreateFolder.css";
import { MdFolder, MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as URL from "../../utils/ConstantUrl";
import useApiHandle from "../../utils/useApiHandle";
import { folder } from "../../../redux/slices/FolderSlice";
import { CiEdit } from "react-icons/ci";
import CrudModal from "../../utils/CrudModal";

const CreateFolder = () => {
  const { data, apiCall, status_code } = useApiHandle();
  const folders = useSelector((state) => state.folder);
  const [fileIds, setFileIds] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    apiCall("get", URL.FOLDER_API, {});
  }, []);
  useEffect(() => {
    if (status_code === 200 && data?.data?.length > 0) {
      let mData=data?.data?.map((items)=>({...items,id:String(items.id)}))
      dispatch(folder({ take_action: "create_folder", data: mData }));
    }
  }, [status_code, data, dispatch]);

  const getSubfolder = async (id) => {
    navigate(`/${id}`);
  };

  const editName = (e, id) => {
    e.stopPropagation();
    setFileIds(id);
  };

  return (
    <>
      <div className="create-folder">
        <div className="container-fluid">
          <h6>FOLDER</h6>
          {folders?.created_folders?.length === 0 ? (
            <div className="center-div">
              <h6 style={{ color: "red" }}>
                Folder does not exist. Please create one
              </h6>
            </div>
          ) : (
            <div className="parent_folder">
              <div className="row list-unstyled">
                {folders?.created_folders?.map((folder) => {
                  return (
                    <div
                      className="col-md-3"
                      key={`CreatedFolder${folder?.id}`}
                    >
                      <div
                        className="folder rr d-flex flex-column justify-content-center my-2 position-relative"
                        onClick={(e) => getSubfolder(folder?.id)}
                      >
                        <span
                          className="position-absolute"
                          style={{ top: 0, right: "7px" }}
                        >
                          <CiEdit
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            style={{ fill: "#838383" }}
                            onClick={(e) => editName(e, folder?.id)}
                          />
                        </span>

                        <li onClick={(e) => getSubfolder(folder?.id)}>
                          <MdFolder size="70" className="folderIcon" />
                        </li>
                        <p>{folder?.folder_name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <CrudModal
        ids={fileIds}
        setFileIds={setFileIds}
        txt=""
        type=""
        operation="edit"
      />
    </>
  );
};

export { CreateFolder };
