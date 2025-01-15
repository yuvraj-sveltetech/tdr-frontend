import React, { useState } from "react";
import { AddFolder } from "./AddFolder";
import { HiHome } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activeBtn } from "../../../redux/slices/BreadCrumbSlice";
import ModalBox from "../../utils/ModalBox";

const Navbar = ({ toggleFileUploadModal, category }) => {
  const folders = useSelector((state) => state.folder.created_folders);
  // const activeBtnState = useSelector(
  //   (state) => state.folder?.show_count?.activeBtn
  // );
  const [controller, setController] = useState(new AbortController());

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const parentFolderName = () => {
    let name = "";

    for (let folder in folders) {
      if (folders[folder]?.folder_name === params?.parent_folder) {
        name = "/ " + folders[folder]?.folder_name;
        break;
      }
    }

    return name;
  };

  const subFolderName = () => {
    let name = "";

    for (let folder in folders) {
      if (folders[folder]?.folder_name === params?.parent_folder) {
        for (let sb in folders[folder]?.subFolder) {
          if (folders[folder]?.subFolder[sb]?.id === +params?.subfolder) {
            name = "/ " + folders[folder]?.subFolder[sb]?.location_name;
            break;
          }
        }
      }
    }

    return name;
  };

  const setActiveBtn = (value) => {
    dispatch(activeBtn(value));
  };

  const btns = ["TDR - CDR"];

  return (
    <>
      <div className="choose">
        {btns?.map((btn) => (
          <button
            className="btn btn-light"
            style={{
              // backgroundColor:
              //   activeBtnState === btn?.toLowerCase() ? "#e5e9f2" : "",
              backgroundColor: "#e5e9f2",
              cursor: "pointer",
            }}
            onClick={() => {
              setActiveBtn(btn.toLowerCase());
            }}
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="container-fluid breadcrumb">
        <div className="row ps-2 w-100">
          <div className="d-flex align-items-center justify-content-between pe-0">
            <div className="d-flex align-items-center">
              <HiHome
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
              <span
                className="ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/${params?.parent_folder}`)}
              >
                {parentFolderName()}
              </span>
              <span className="ms-2">{subFolderName()}</span>
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
