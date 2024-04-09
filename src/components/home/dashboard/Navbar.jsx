import React from "react";
import { AddFolder } from "./AddFolder";
import { HiHome } from "react-icons/hi";

const Navbar = ({ toggleFileUploadModal, category }) => {
  return (
    <>
      <div className="choose">
        <button
          className="btn btn-light"
          // onClick={() => changeCategory("IPDR")}
          style={{ backgroundColor: "#e5e9f2", cursor: "text" }}
        >
          I.P.D.R
        </button>

        {/* <img src={tower} alt="tower_icon" width="30" height="30" /> */}
        {/* <button
                  className="btn btn-dark"
                  onClick={() => changeCategory("CDR")}
                >
                  C.D.R
                </button> */}
      </div>

      <div className="container-fluid breadcrumb">
        <div className="row ps-2 w-100">
          <div className="d-flex align-items-center justify-content-between pe-0">
            <div className="d-flex align-items-center">
              <HiHome
                size={20}
                style={{ cursor: "default" }}
                // onClick={() => {
                //   dispatch(setShowCount(0));
                //   dispatch(add_parentfolder_name(""));
                //   dispatch(add_subfolder_name(""));
                // }}
              />
              {/* {files?.sub_folders.parent_folder ||
                      files?.sub_folders.subfolder ? (
                        <div className="d-flex">
                          <div className="px-1">{"/"}</div>
                          <p
                            className="m-0"
                            onClick={() => {
                              dispatch(setShowCount(1));
                              dispatch(add_subfolder_name(""));
                            }}
                          >
                            {files?.sub_folders.parent_folder}
                          </p>
                          <div className="px-1">{"/"}</div>
                          <p
                            className="m-0"
                            onClick={() => {
                              dispatch(setShowCount(2));
                            }}
                          >
                            {files?.sub_folders.subfolder}
                          </p>
                        </div>
                      ) : null} */}
            </div>
            <AddFolder
              toggleFileUploadModal={toggleFileUploadModal}
              category={category}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { Navbar };
