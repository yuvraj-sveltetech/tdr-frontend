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
import { useInView } from "react-intersection-observer";

const CreateFolder = () => {
  const { data, apiCall, status_code, loading } = useApiHandle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredFolders, setFilteredFolders] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    // Reset on search term change
    setFilteredFolders([]);
    setPageNo(1);
    setHasMore(true);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (pageNo === 1) {
      setFilteredFolders([]); // Reset for new search or initial load
    }
    apiCall(
      "get",
      `${GET_CASE_FOLDERS}?page_no=${pageNo}${
        debouncedSearchTerm
          ? `&folder_name=${encodeURIComponent(debouncedSearchTerm)}`
          : ""
      }`,
      {},
      "",
      true
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo, debouncedSearchTerm]);

  useEffect(() => {
    if (status_code === 200 && data?.data) {
      if (pageNo === 1) {
        setFilteredFolders(data.data);
      } else {
        setFilteredFolders((prev) => [...prev, ...data.data]);
      }
      setHasMore(data.data.length > 0);
      dispatch(folder({ take_action: "create_folder", data: data?.data }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_code, data]);

  useEffect(() => {
    if (inView && hasMore && filteredFolders.length > 0) {
      setPageNo((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

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
          />
        </div>

        {loading && filteredFolders.length === 0 ? (
          <div className="center-div">
            <span
              className="spinner-border spinner-border-sm"
              role="status"
            ></span>
            <span className="ps-1">loading...</span>
          </div>
        ) : filteredFolders?.length === 0 ? (
          <div className="center-div">
            <h6 style={{ color: "red" }}>
              Folder does not exist. Please create one
            </h6>
          </div>
        ) : (
          <div className="parent_folder">
            <div className="row list-unstyled">
              {filteredFolders?.map((folder, idx) => {
                const isLast = idx === filteredFolders.length - 1;
                return (
                  <div
                    className="col-md-3"
                    key={`CreatedFolder${folder?.id}`}
                    ref={isLast ? ref : null}
                  >
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
                );
              })}
            </div>
            {hasMore && (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></span>
                <span className="ps-1">loading...</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { CreateFolder };
