import React from "react";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let auth = localStorage.getItem("auth_token");
  // return auth ? <Outlet /> : <Navigate to="/" />;
  return auth ? <Outlet /> : window.close();
};

export default PrivateRoute;
