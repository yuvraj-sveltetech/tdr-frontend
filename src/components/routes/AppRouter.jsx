import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login, Dashboard, PageNotFound } from "../utils/index";
import PrivateRoute from "../utils/PrivateRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
