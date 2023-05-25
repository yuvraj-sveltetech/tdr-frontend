import React from "react";
import { Header, Sidebar } from "../utils/index";

const CreateUser = () => {
  return (
    <div className="dashboard container-fluid">
      <div className="row ">
        <Sidebar />
        <div className="dashpage col-md-10">
          <Header />
          <div className="main"> adasd</div>
        </div>
      </div>
    </div>
  );
};

export { CreateUser };
