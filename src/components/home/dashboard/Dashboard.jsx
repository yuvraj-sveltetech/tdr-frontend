import React, { useState, Suspense } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Navbar, CreateFolder } from "../../utils/index";

const Dashboard = () => {
  const showCount = useSelector((state) => state.show_count.show);
  const [show, setShow] = useState(false);

  const toggleFileUploadModal = () => setShow(!show);

  // Simulate login with a new auth token
  const handleLogin = () => {
    Cookies.set("ss_tkn", "new-auth-token"); // Update auth token in cookies
    localStorage.setItem("auth_change", Date.now()); // Notify all tabs
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="main">
        <Navbar toggleFileUploadModal={toggleFileUploadModal} />
        {showCount === 0 && <CreateFolder />}
        <button onClick={handleLogin}>Simulate Login</button>
      </div>
    </Suspense>
  );
};

export { Dashboard };
