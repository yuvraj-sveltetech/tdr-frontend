import React, { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { folder } from "../../../redux/slices/FolderSlice";
import { Navbar, CreateFolder } from "../../utils/index";

const Dashboard = () => {
  const showCount = useSelector((state) => state.show_count.show);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const toggleFileUploadModal = () => setShow(!show);
  const auth = Cookies.get("ss_tkn");

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth_token", auth);
    } else {
      dispatch(folder({ take_action: "CLEAR_FOLDER", data: [] }));
      localStorage.clear();
      window.location.href = process.env.REACT_APP_REDIRECT_URL;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

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
