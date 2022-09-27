import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const Dashboard = () => {
  return (
    <div className="dashboard container-fluid">
      <div className="row ">
        <Sidebar />
        <div className="dashpage col-md-10">
          <Header />
        </div>
      </div>
    </div>
  );
};

export { Dashboard };
