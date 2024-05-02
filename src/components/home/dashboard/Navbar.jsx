import React, { useEffect, useState } from "react";
import { AddFolder } from "./AddFolder";
import { HiHome } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../../utils/Modal";

const Navbar = ({ toggleFileUploadModal, category }) => {
  const folders = useSelector((state) => state.folder.created_folders);
  const [controller, setController] = useState(new AbortController());

  const navigate = useNavigate();
  const params = useParams();
//   useEffect(() => {
// setCon
//   },[])

  const parentFolderName = () => {
    let name = "";

    for (let folder in folders) {
      if (folders[folder]?.id === +params?.parent_folder) {
        name = "/ " + folders[folder]?.project_name;
        break;
      }
    }

    return name;
  };

  const subFolderName = () => {
    let name = "";

    for (let folder in folders) {
      if (folders[folder]?.id === +params?.parent_folder) {
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

  return (
    <>
      <div className="choose">
        <button
          className="btn btn-light"
          style={{ backgroundColor: "#e5e9f2", cursor: "text" }}
        >
          C.D.R
        </button>
      </div>

      <div className="container-fluid breadcrumb">
        <div className="row ps-2 w-100">
          <div className="d-flex align-items-center justify-content-between pe-0">
            <div className="d-flex align-items-center">
              <HiHome
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/dashboard")}
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
            <AddFolder controller={controller} setController={setController} />
          </div>
        </div>
      </div>

      <Modal controller={controller} setController={setController}  />
    </>
  );
};

export { Navbar };
