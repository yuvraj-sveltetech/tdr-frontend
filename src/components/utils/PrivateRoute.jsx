import React from "react";
import { Outlet } from "react-router-dom";
// import Cookies from "js-cookie";

const PrivateRoute = () => {
  let auth = localStorage.getItem("auth_token");
  // return auth ? <Outlet /> : <Navigate to="/dashboard" />;
  if (auth) {
    return <Outlet />;
  } else {
    localStorage.removeItem("folder");
    window.close();
  }
  // return auth ? <Outlet /> : window.close() &&  localStorage.clear();
};

export default PrivateRoute;
