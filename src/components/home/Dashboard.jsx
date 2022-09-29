import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import tower from "../../assets/images/tower-icon.png";

const Dashboard = () => {
  return (
    <div className="dashboard container-fluid">
      <div className="row ">
        <Sidebar />
        <div className="dashpage col-md-10">
          <Header />
          <div className="main">
            <div className="choose">
              <button className="btn btn-light">I.P.D.R</button>
              <img src={tower} alt="tower_icon" width="30" height="30" />
              <button className="btn btn-dark">C.D.R</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dashboard };
