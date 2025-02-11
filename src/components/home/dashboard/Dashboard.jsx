import React, { useState, Suspense, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, CreateFolder } from "../../utils/index";
import { useNavigate } from "react-router-dom";
import { folder } from "../../../redux/slices/FolderSlice";
import Cookies from "js-cookie";

const Dashboard = () => {
  const showCount = useSelector((state) => state.show_count.show);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleFileUploadModal = () => setShow(!show);

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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="main">
        <Navbar toggleFileUploadModal={toggleFileUploadModal} />
        {showCount === 0 && <CreateFolder />}
      </div>
    </Suspense>
  );
};

export { Dashboard };
