import React from "react";
import { Outlet } from "react-router-dom";
import { folder } from "../../redux/slices/FolderSlice";
import { useDispatch } from "react-redux";
// import Cookies from "js-cookie";

const PrivateRoute = () => {
  let auth = localStorage.getItem("auth_token");
  const dispatch = useDispatch();
  // return auth ? <Outlet /> : <Navigate to="/" />;
  if (auth) {
    return <Outlet />;
  } else {
    dispatch(folder({ take_action: "CLEAR_FOLDER", data: [] }));
    window.close();
  }
  // return auth ? <Outlet /> : window.close() &&  localStorage.clear();
};

export default PrivateRoute;
