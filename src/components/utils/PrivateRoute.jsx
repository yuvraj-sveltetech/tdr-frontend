import React, { useEffect, useRef } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { folder } from "../../redux/slices/FolderSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Store the previous cookie value without triggering re-renders
  const previousCookieRef = useRef(Cookies.get("ss_tkn") || "");

  useEffect(() => {
    const checkAuth = () => {
      const currentCookie = Cookies.get("ss_tkn") || "";

      if (!currentCookie) {
        console.log("User logged out! Redirecting...");

        // Clear Redux state and localStorage
        dispatch(folder({ take_action: "CLEAR_FOLDER", data: [] }));
        localStorage.clear();

        // Redirect user
        navigate(process.env.REACT_APP_REDIRECT_URL || "/", { replace: true });
      }

      // Update previous cookie value
      previousCookieRef.current = currentCookie;
    };

    const handleTabFocus = () => {
      console.log("Tab is focused. Checking authentication...");
      checkAuth();
    };

    // Listen for tab visibility change and focus
    document.addEventListener("visibilitychange", handleTabFocus);
    window.addEventListener("focus", handleTabFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleTabFocus);
      window.removeEventListener("focus", handleTabFocus);
    };
  }, [dispatch, navigate]);

  return Cookies.get("ss_tkn") ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
