import React, { useLayoutEffect, useState } from "react";
import { CreateFolder } from "../../utils/index";
import { useDispatch, useSelector } from "react-redux";
// import Modal from "../../utils/Modal";
// import FileUploadModal from "../../utils/FileUploadModal";
import { Navbar } from "../../utils/index";
// import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { folder } from "../../../redux/slices/FolderSlice";

const Dashboard = () => {
  const showCount = useSelector((state) => state.show_count.show);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const toggleFileUploadModal = () => setShow(!show);

  useLayoutEffect(() => {
    let auth = Cookies.get("ss_tkn");
    if (!auth) {
      dispatch(folder({ take_action: "CLEAR_FOLDER", data: [] }));
      window.close();
    } else {
      localStorage.setItem("auth_token", auth);
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
