import React, { useLayoutEffect, useState } from "react";
import { CreateFolder } from "../../utils/index";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Navbar } from "../../utils/index";

const Dashboard = () => {
  const showCount = useSelector((state) => state.show_count.show);
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    let auth = Cookies.get("ss_tkn");
    if (!auth) {
      window.close();
    } else {
      localStorage.setItem("auth_token", auth);
    }
  }, []);

  const toggleFileUploadModal = () => setShow(!show);

  return (
    <>
      <div className="main">
        <Navbar toggleFileUploadModal={toggleFileUploadModal} />
        {showCount === 0 && <CreateFolder />}
      </div>
    </>
  );
};

export { Dashboard };
