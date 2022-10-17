import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import tower from "../../assets/images/tower-icon.png";
import CreateFolder from "./CreateFolder";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [category, setCategory] = useState("IPDR");
  const data = useSelector((state) => state);

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
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dashboard };
