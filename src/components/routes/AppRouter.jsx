import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Dashboard } from "../utils/index";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
