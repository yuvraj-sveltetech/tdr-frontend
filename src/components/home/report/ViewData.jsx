import React, { useEffect } from "react";
import {
  switchComponent,
  excelData,
} from "../../../redux/slices/BreadCrumbSlice";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { DataOnDom, Chart } from "../../utils/index";

const ViewData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(excelData({}));
  }, []);

  const switchTo = () => {
    dispatch(switchComponent("/report"));
  };

  return (
    <>
      <div className="top-content d-flex align-items-center justify-content-between p-2">
        <button
          className="btn btn-sm btn-light shadow bg-white rounded"
          data-toggle="tooltip"
          data-placement="top"
          title="Go back"
          onClick={switchTo}
        >
          <IoArrowBack />
        </button>
        <button className="btn btn-success">Download</button>
      </div>
      {/* <Chart /> */}
      <div className="data_table table-responsive mt-4 mx-2">
        <DataOnDom />
      </div>
    </>
  );
};

export { ViewData };
