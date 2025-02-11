import React, { useState, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navbar, CreateFolder } from "../../utils/index";

const Dashboard = () => {
  const showCount = useSelector((state) => state.show_count.show);
  const [show, setShow] = useState(false);

  const toggleFileUploadModal = () => setShow(!show);

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
