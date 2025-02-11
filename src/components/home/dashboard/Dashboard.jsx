import React, { useState, Suspense, useEffect } from "react";
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
        window.location.reload(); // Reload page if localStorage user changes
        // navigate("/");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
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
