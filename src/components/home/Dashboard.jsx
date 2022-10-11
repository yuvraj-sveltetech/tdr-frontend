import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import tower from "../../assets/images/tower-icon.png";
import CreateFolder from "./CreateFolder";
const ipcRenderer = window.require("electron").ipcRenderer;

const Dashboard = () => {
  const [category, setCategory] = useState("IPDR");

  const changeCategory = (item) => {
    setCategory(item);
  };

  const pp = () => {
    ipcRenderer.send("request-mainprocess-action", "LLLLKKKLLL");
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
              <button id="folder" onClick={pp}>
                Folder
              </button>
            </div>
            <CreateFolder category={category} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dashboard };
