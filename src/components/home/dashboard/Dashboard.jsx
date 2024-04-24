import React, { useState } from "react";
import { CreateFolder } from "../../utils/index";
import { useSelector } from "react-redux";
import Modal from "../../utils/Modal";
import FileUploadModal from "../../utils/FileUploadModal";
import { Navbar } from "../../utils/index";

const Dashboard = () => {
  const showCount = useSelector((state) => state.show_count.show);
  const [show, setShow] = useState(false);

  const toggleFileUploadModal = () => setShow(!show);

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
