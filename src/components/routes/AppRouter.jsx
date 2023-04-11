import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Login, Dashboard, PageNotFound, Report } from "../utils/index";
import PrivateRoute from "../utils/PrivateRoute";

const AppRouter = () => {
  return (
    <HashRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
