import React, { useState, Suspense, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, CreateFolder } from "../../utils/index";
import { folder } from "../../../redux/slices/FolderSlice";
import Cookies from "js-cookie";
import {URL} from "../../../utils/config"

const Dashboard = () => {
  const showCount = useSelector((state) => state.show_count.show);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const toggleFileUploadModal = () => setShow(!show);

  // Store the previous cookie value without triggering re-renders
  const previousCookieRef = useRef(Cookies.get("ss_tkn") || "");

  useEffect(() => {
    const checkAuth = () => {
      const currentCookie = Cookies.get("ss_tkn") || "";

      if (currentCookie !== previousCookieRef.current) {
        if (!currentCookie) {
          // If cookie is removed, clear data and redirect
          dispatch(folder({ take_action: "CLEAR_FOLDER", data: [] }));
          localStorage.clear();
          window.location.href = URL;
        } else {
          // If cookie value changed, reload the page
          dispatch(folder({ take_action: "CLEAR_FOLDER", data: [] }));
          window.location.href = "/";
        }
      }

      // Update previous cookie value
      previousCookieRef.current = currentCookie;
    };

    const handleTabFocus = () => {
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
  }, [dispatch]);

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
