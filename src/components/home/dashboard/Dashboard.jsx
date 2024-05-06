import React, { useLayoutEffect, useState } from "react";
import { CreateFolder } from "../../utils/index";
import { useSelector } from "react-redux";
import Modal from "../../utils/Modal";
import FileUploadModal from "../../utils/FileUploadModal";
import { Navbar } from "../../utils/index";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const showCount = useSelector((state) => state.show_count.show);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const toggleFileUploadModal = () => setShow(!show);

  useLayoutEffect(() => {
    let auth = Cookies.get("ss_tkn");
    if (!auth) {
      console.log(auth, "auht");
      window.close();
    } else {
      localStorage.setItem("auth_token", auth);
      console.log(auth, "auhtXX");
    }
  }, []);

  return (
    <>
      <div className="main">
        <Navbar toggleFileUploadModal={toggleFileUploadModal} />
        {showCount === 0 && <CreateFolder />}
      </div>

      {/* <Modal controller={controller} setController={setController} /> */}
      {/* <FileUploadModal /> */}
    </>
  );
};

export { Dashboard };
