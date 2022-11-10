import React, { useState, useEffect } from "react";
import {
  Header,
  SubFolder,
  Sidebar,
  CreateFolder,
  DirFiles,
} from "../utils/index";
import tower from "../../assets/images/tower-icon.png";
import { useSelector } from "react-redux";
// const ipcRenderer = window.require("electron").ipcRenderer;

const Dashboard = () => {
  const [category, setCategory] = useState("IPDR");
  const sub_folders = useSelector((state) => state.folder.sub_folders);

  // useEffect(() => {
  //   console.log(ipcRenderer.sendSync("chokidar"));
  // }, []);

  const changeCategory = (item) => {
    setCategory(item);
  };

  return (
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
                style={{backgroundColor:"#e5e9f2"}}
              >
                I.P.D.R
              </button>

              <img src={tower} alt="tower_icon" width="30" height="30" />
              <button
                className="btn btn-dark"
                onClick={() => changeCategory("CDR")}
              >
                C.D.R
              </button>
            </div>
            <CreateFolder category={category} />
            {sub_folders.folders.name.length !== 0 && <SubFolder />}
            <DirFiles />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dashboard };
