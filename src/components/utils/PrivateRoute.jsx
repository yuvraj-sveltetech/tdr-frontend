import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { folder } from "../../redux/slices/FolderSlice";

const PrivateRoute = () => {
  const auth = Cookies.get("ss_tkn");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth) {
      dispatch(folder({ take_action: "CLEAR_FOLDER", data: [] }));
      localStorage.clear();
      window.location.href = process.env.REACT_APP_REDIRECT_URL;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return auth ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
