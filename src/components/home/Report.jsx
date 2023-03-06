import React, { useEffect } from "react";
import { Sidebar, Header } from "../utils/index";
import GenerateReport from "../utils/GenerateReport";

const Report = () => {
  return (
    <>
      <div className="dashboard container-fluid">
        <div className="row ">
          <Sidebar />
          <div className="dashpage col-md-10">
            <Header />
          </div>
        </div>
      </div>
      <GenerateReport />
    </>
  );
};

export { Report };
