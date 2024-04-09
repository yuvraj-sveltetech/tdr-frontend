import React, { useState } from "react";
import { CreateFolder } from "../../utils/index";
// import tower from "../../..../assets/images/tower.png";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../../utils/Modal";
import FileUploadModal from "../../utils/FileUploadModal";
import { Navbar } from "../../utils/index";

const Dashboard = () => {
  const [category, setCategory] = useState("IPDR");
  const [modalType, setModalType] = useState("");
  const [show, setShow] = useState(false);
  const [parentFolderIndex, setParentFolderIndex] = useState(null);

  const showCount = useSelector((state) => state.show_count.show);

  const toggleFileUploadModal = () => setShow(!show);

  return (
    <>
      <div className="main">
        <Navbar
          toggleFileUploadModal={toggleFileUploadModal}
          category={category}
        />

        {showCount === 0 && (
          <CreateFolder
            category={category}
            setParentFolderIndex={setParentFolderIndex}
          />
        )}
      </div>

      <Modal modalType={modalType} category={category} />

      <FileUploadModal />
    </>
  );
};

export { Dashboard };
