import React, { useState, useMemo, useEffect } from "react";
import { AddFolder } from "./AddFolder";
import { HiHome } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activeBtn, is_selected } from "../../../redux/slices/BreadCrumbSlice";
import ModalBox from "../../utils/ModalBox";
import { OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import { folder } from "../../../redux/slices/FolderSlice";
import { options } from "../../utils/process-api-endpoint";

const Navbar = ({ toggleFileUploadModal, category }) => {
  const folders = useSelector((state) => state.folder?.created_folders || []);
  const activeBtnState = useSelector((state) => state.show_count?.active_btn);
  const [controller, setController] = useState(new AbortController());
  const btns = ["CDR", "IPDR", "GPRS"];

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveBtn(activeBtnState);
  }, []);

  // Get parent folder name
  const parentFolderName = useMemo(() => {
    const folder = folders.find(
      (folder) => folder.folder_name === params?.parent_folder
    );
    return folder ? `/ ${folder.folder_name}` : "";
  }, [folders, params?.parent_folder]);

  // Get subfolder name
  const subFolderName = useMemo(() => {
    const parentFolder = folders.find(
      (folder) => folder.folder_name === params?.parent_folder
    );
    const subFolder = parentFolder?.subFolder?.find(
      (sub) => sub.id === +params?.subfolder
    );
    return subFolder ? `/ ${subFolder.location_name}` : "";
  }, [folders, params?.parent_folder, params?.subfolder]);

  // Dispatch active button action
  const setActiveBtn = (value) => {
    dispatch(activeBtn(value));
  };

  // Tooltip wrapper for reusability
  const renderTooltip = (text) => (
    <Tooltip>{text || "No information available"}</Tooltip>
  );

  const handleBtn = (btn) => {
    const activeButton = btn.toLowerCase();
    setActiveBtn(activeButton);
    dispatch(
      is_selected({
        value: options?.[activeButton]?.[0]?.endpoint,
        is_sub_category_option: false,
      })
    );
    dispatch(folder({ take_action: "unselect_all", data: null }));
  };

  return (
    <>
      <div className="choose">
        {btns.map((btn) => (
          <button
            key={btn}
            className={`btn me-2 ${
              activeBtnState === btn.toLowerCase()
                ? "active-btn"
                : "inactive-btn"
            }`}
            onClick={() => handleBtn(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="container-fluid breadcrumb">
        <div className="row ps-2 w-100">
          <div className="d-flex align-items-center justify-content-between pe-0">
            <div className="w-25 d-flex align-items-center">
              <span>
                <HiHome
                  size={20}
                  className="home-icon"
                  onClick={() => navigate("/")}
                />
              </span>

              <OverlayTrigger
                placement="top"
                delay={{ show: 200, hide: 300 }}
                overlay={renderTooltip(parentFolderName)}
              >
                <span
                  className="ms-2 mw-50 d-inline-block text-truncate folder-link"
                  onClick={() => navigate(`/${params?.parent_folder}`)}
                >
                  {parentFolderName}
                </span>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                delay={{ show: 200, hide: 300 }}
                overlay={renderTooltip(subFolderName)}
              >
                <span className="mw-50 d-inline-block text-truncate folder-link">
                  {subFolderName}
                </span>
              </OverlayTrigger>
            </div>
            <AddFolder controller={controller} />
          </div>
        </div>
      </div>

      <ModalBox controller={controller} setController={setController} />
    </>
  );
};

export { Navbar };
