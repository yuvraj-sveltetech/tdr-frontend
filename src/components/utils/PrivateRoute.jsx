import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  // let auth = localStorage.getItem("auth_token");
  let auth = Cookies.get("ss_tkn");
  // return auth ? <Outlet /> : <Navigate to="/dashboard" />;
  return auth ? <Outlet /> : window.close();
};

export default PrivateRoute;
