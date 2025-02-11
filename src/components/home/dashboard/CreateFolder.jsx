import React, { useEffect, useState } from "react";
import "./CreateFolder.css";
import { MdFolder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useApiHandle from "../../utils/useApiHandle";
import { folder } from "../../../redux/slices/FolderSlice";
import { OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import { GET_CASE_FOLDERS } from "../../utils/ConstantUrl";

const CreateFolder = () => {
  const { data, apiCall, status_code } = useApiHandle();
  const folders = useSelector((state) => state.folder);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFolders, setFilteredFolders] = useState([]);

  useEffect(() => {
    apiCall("get", GET_CASE_FOLDERS, {}, "", true);
  }, []);

  useEffect(() => {
    if (status_code === 200) {
      dispatch(folder({ take_action: "create_folder", data: data?.data }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_code, data]);

  useEffect(() => {
    if (folders?.created_folders) {
      const filtered = folders?.created_folders?.filter((folder) =>
        folder?.folder_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      setFilteredFolders(filtered);
    }
  }, [searchTerm, folders]);

  const getSubfolder = async (id) => {
    navigate(`/${id}`);
  };

  return (
    <div className="create-folder">
      <div className="container-fluid">
        <div className="case-header">
          <h6>CASES</h6>
          <input
            type="text"
            placeholder="Search folders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={folders?.created_folders?.length === 0}
          />
        </div>

        {filteredFolders?.length === 0 ? (
          <div className="center-div">
            <h6 style={{ color: "red" }}>
              Folder does not exist. Please create one
            </h6>
          </div>
        ) : (
          <div className="parent_folder">
            <div className="row list-unstyled">
              {filteredFolders?.map((folder) => (
                <div className="col-md-3" key={`CreatedFolder${folder?.id}`}>
                  <div
                    className="folder rr d-flex flex-column justify-content-center my-2"
                    onClick={(e) => getSubfolder(folder?.folder_name)}
                  >
                    <li onClick={(e) => getSubfolder(folder?.folder_name)}>
                      <MdFolder size="70" className="folderIcon" />
                    </li>

                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 200, hide: 300 }}
                      overlay={<Tooltip> {folder?.folder_name}</Tooltip>}
                    >
                      <p className="w-75 d-inline-block text-truncate">
                        {folder?.folder_name}
                      </p>
                    </OverlayTrigger>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { CreateFolder };
