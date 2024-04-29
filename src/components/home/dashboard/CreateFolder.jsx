import React, { useEffect } from "react";
import "./CreateFolder.css";
import { MdFolder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as URL from "../../utils/ConstantUrl";
import useApiHandle from "../../utils/useApiHandle";
import { folder } from "../../../redux/slices/FolderSlice";

const CreateFolder = () => {
  const { data, apiCall, status_code } = useApiHandle();
  const folders = useSelector((state) => state.folder);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    folders?.created_folders?.length === 0 &&
      apiCall("get", URL.FOLDER_API, {});
  }, [folders?.created_folders]);

  useEffect(() => {
    if (status_code === 200 && data?.data?.length > 0) {
      dispatch(folder({ take_action: "create_folder", data: data?.data }));
    }
  }, [status_code, data, dispatch]);

  const getSubfolder = async (id) => {
    navigate(`/${id}`);
  };

  return (
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
              {folders?.created_folders?.map((folder, index) => {
                return (
                  <div className="col-md-3" key={`CreatedFolder${folder?.id}`}>
                    <div
                      className="folder rr d-flex flex-column justify-content-center my-2"
                      onClick={(e) => getSubfolder(folder?.id)}
                    >
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
  );
};

export { CreateFolder };
