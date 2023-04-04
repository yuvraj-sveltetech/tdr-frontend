import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { clear_structure } from "../../../redux/slices/SelectedFiles";
import { uncheck_all_parent } from "../../../redux/slices/FolderSlice";

const AddFolder = ({ category, setModal }) => {
  const [isDone, setIsDone] = useState({ isDisable: true, loading: false });
  const redux_store = useSelector((state) => state.selected_files);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(redux_store.structure).length > 0) {
      setIsDone({ ...isDone, isDisable: false });
    }
  }, [redux_store.structure]);

  const getFilesData = async () => {
    setIsDone({ isDisable: true, loading: true });
    let res = await window.to_electron.get_files_data("get_files_data", {
      structure: redux_store.structure,
      auth_token: localStorage.getItem("auth_token"),
    });

    setIsDone({ isDisable: false, loading: res });
    dispatch(clear_structure());
    dispatch(uncheck_all_parent());
  };

  return (
    <div className="folder bb">
      {/* <h5>{category === "IPDR" ? "I.P.D.R" : "C.DoR"}</h5> */}
      <button
        className="btn btn-primary me-2"
        id="send_data"
        onClick={getFilesData}
        disabled={isDone.isDisable}
      >
        {isDone.loading ? (
          <div>
            <div
              className="spinner-border spinner-border-sm me-1"
              role="status"
            />
            Processing...
          </div>
        ) : (
          <h6 className="m-0">Process</h6>
        )}
      </button>
      <button
        className="add-folder d-flex align-items-center btn-color"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={setModal}
      >
        <MdCreateNewFolder className="me-1" size="23" />
        <h6 className="m-0">Create Folder</h6>
      </button>
    </div>
  );
};

export { AddFolder };
