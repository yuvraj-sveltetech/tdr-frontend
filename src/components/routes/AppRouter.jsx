import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Login, Dashboard, PageNotFound } from "../utils/index";
import PrivateRoute from "../utils/PrivateRoute";

const AppRouter = () => {
  return (
    <HashRouter>
      <ToastContainer />
      <Routes>
        {/* <Route index path="/" element={<Login />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route element={<PrivateRoute />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
