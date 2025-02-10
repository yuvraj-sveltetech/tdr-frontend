import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { folder } from "../../redux/slices/FolderSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch();

  const checkAuth = () => {
    const auth = Cookies.get("ss_tkn");
    if (!auth) {
      dispatch(folder({ take_action: "CLEAR_FOLDER", data: [] }));
      localStorage.clear();
      // window.location.href = process.env.REACT_APP_REDIRECT_URL;
    }
  };

  useEffect(() => {
    checkAuth(); // Initial check when component mounts

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkAuth(); // Re-check auth when the tab becomes active
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return Cookies.get("ss_tkn") ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
