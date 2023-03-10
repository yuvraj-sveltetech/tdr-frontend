import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdCreateNewFolder } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setExcelData } from "../../redux/slices/DataForExcel";

const AddFolder = ({ category, setModal }) => {
  const [isDone, setIsDone] = useState({ isDisable: true, loading: false });
  const redux_store = useSelector((state) => state.selected_files);
  const dispatch = useDispatch();

  // window.to_electron.API_DATA("API_DATA", (event, result) => {
  //   console.log(event, result);
  // });
 
  useEffect(() => {
    if (Object.keys(redux_store.structure).length > 0) {
      setIsDone({ ...isDone, isDisable: false });
    }
  }, [redux_store.structure]);

  const getFilesData = async () => {
    // setIsDone({ ...isDone, loading: true });

    // console.log(res, "res", res?.Error);

    let res = await window.to_electron.get_files_data(
      "get_files_data",
      redux_store.structure
    );
    console.log(res);

    if (res?.file) {
      // setIsDone({ ...isDone, loading: false });
      toast.success("Data Process Completed!");
      dispatch(setExcelData(res?.file));
    } else {
      // setIsDone({ ...isDone, loading: false });
      toast.error("Something went wrong. Please try again.");
    }
  };

  console.log(isDone.loading);

  return (
    <div className="folder bb">
      {/* <h5>{category === "IPDR" ? "I.P.D.R" : "C.D.R"}</h5> */}
      <button
        className="btn btn-primary me-2"
        id="send_data"
        onClick={getFilesData}
        disabled={isDone.isDisable}
      >
        {isDone.loading ? (
          <div>
            <div class="spinner-border spinner-border-sm me-1" role="status" />
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
