import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { folder } from "../../redux/slices/FolderSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkAuth = () => {
    const auth = Cookies.get("ss_tkn");

    if (!auth) {
      dispatch(folder({ take_action: "CLEAR_FOLDER", data: [] }));
      localStorage.clear();
      navigate(process.env.REACT_APP_REDIRECT_URL || "/", { replace: true });
    }
  };

  useEffect(() => {
    checkAuth(); // Initial check when component mounts

    const handleStorageChange = (event) => {
      if (event.key === "user") {
        checkAuth(); // Re-check cookies when localStorage updates
      }
    };

    const handleCookieChange = () => {
      window.location.reload(); // Reload page if cookies change
    };

    window.addEventListener("storage", handleStorageChange);
    const cookieInterval = setInterval(() => {
      if (!Cookies.get("ss_tkn")) {
        handleCookieChange();
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(cookieInterval);
    };
  }, [dispatch, navigate]);

  return Cookies.get("ss_tkn") ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
