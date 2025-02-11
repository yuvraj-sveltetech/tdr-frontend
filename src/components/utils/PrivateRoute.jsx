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

      if (currentCookie !== previousCookieRef.current) {
        if (!currentCookie) {
          // If cookie is removed, clear data and redirect
          console.log("Cookie removed! Clearing data and redirecting...");
          dispatch(folder({ take_action: "CLEAR_FOLDER", data: [] }));
          localStorage.clear();
          navigate(process.env.REACT_APP_REDIRECT_URL || "/", {
            replace: true,
          });
        } else {
          // If cookie value changed, reload the page
          console.log("Cookie changed! Reloading page...");
          // dispatch(folder({ take_action: "CLEAR_FOLDER", data: [] }));
          window.location.reload();
        }
      }

      // Update previous cookie value
      previousCookieRef.current = currentCookie;
    };

    const handleTabFocus = () => {
      console.log("Tab is focused. Checking authentication...");
      checkAuth();
    };

    // Listen for tab visibility change and focus
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        handleTabFocus();
      }
    });

    window.addEventListener("focus", handleTabFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleTabFocus);
      window.removeEventListener("focus", handleTabFocus);
    };
  }, [dispatch, navigate]);

  return Cookies.get("ss_tkn") ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
