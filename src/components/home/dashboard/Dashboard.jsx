import React, { useState, useEffect } from "react";
import {
  Header,
  SubFolder,
  Sidebar,
  CreateFolder,
  DirFiles,
  AddFolder,
} from "../../utils/index";
// import tower from "../../../assets/images/tower.png";
import { useSelector, useDispatch } from "react-redux";
import { HiHome } from "react-icons/hi";
import {
  setShowCount,
  switchComponent,
} from "../../../redux/slices/BreadCrumbSlice";
import {
  add_subfolder_name,
  add_parentfolder_name,
} from "../../../redux/slices/FolderSlice";
import Modal from "../../utils/Modal";

const Dashboard = () => {
  const [category, setCategory] = useState("IPDR");
  const [modalType, setModalType] = useState("");
  const [parentFolderIndex, setParentFolderIndex] = useState(null);
  const files = useSelector((state) => state.folder);
  const showCount = useSelector((state) => state.show_count.show);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(switchComponent(""));
  }, []);

  const changeCategory = (item) => {
    setCategory(item);
  };

  const setModal = () => {
    setModalType("Create Folder");
  };

  return (
    <>
      <div className="dashboard container-fluid">
        <div className="row ">
          <Sidebar />
          <div className="dashpage col-md-10">
            <Header />
            <div className="main">
              <div className="choose">
                <button
                  className="btn btn-light"
                  onClick={() => changeCategory("IPDR")}
                  style={{ backgroundColor: "#e5e9f2" }}
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

              <div className="container breadcrumb">
                <div className="row ps-2 w-100">
                  <div className="d-flex align-items-center justify-content-between pe-0">
                    <div className="d-flex align-items-center">
                      <HiHome
                        size={20}
                        onClick={() => {
                          dispatch(setShowCount(0));
                          dispatch(add_parentfolder_name(""));
                          dispatch(add_subfolder_name(""));
                        }}
                      />
                      {files?.sub_folders.parent_folder ||
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
                      ) : null}
                    </div>
                    <AddFolder setModal={setModal} category={category} />
                  </div>
                </div>
              </div>

              {showCount === 0 && (
                <CreateFolder
                  category={category}
                  setParentFolderIndex={setParentFolderIndex}
                />
              )}

              {files?.sub_folders.folders.name.length !== 0 &&
              showCount === 1 ? (
                <SubFolder />
              ) : null}

              {showCount === 2 && <DirFiles index={parentFolderIndex} />}
            </div>
          </div>
        </div>
      </div>
      <Modal modalType={modalType} category={category} />
    </>
  );
};

export { Dashboard };
