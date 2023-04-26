import React, { useEffect, useState, useRef } from "react";
import { switchComponent } from "../../../redux/slices/BreadCrumbSlice";
import useApiHandle from "../../utils/useApiHandle";
import * as URL from "../../utils/ConstantUrl";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { DataOnDom, Chart } from "../../utils/index";

const ViewData = ({
  downloadFile,
  downloadLink,
  report_id,
  created_file_name,
}) => {
  const { data, loading, apiCall } = useApiHandle();
  const [pageNo, setPageNo] = useState(1);
  const [items, setItems] = useState([]);
  const divRef = useRef(null);
  const isAllDataFetched = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data) {
      setItems([...items, ...data.data?.result_data]);
      isAllDataFetched.current = data.data?.result_data.length;
    }
  }, [data]);

  useEffect(() => {
    let copiedRef = divRef.current;
    const fetchData = async () => {
      apiCall(
        "get",
        URL.GET_EXCEL_PAGINATION + `${report_id}/?page_no=${pageNo}`,
        ""
      );
    };
    fetchData();

    copiedRef.addEventListener("scroll", handleScroll);
    return () => copiedRef.removeEventListener("scroll", handleScroll);
  }, [pageNo]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = divRef.current;
    if (scrollTop + clientHeight === scrollHeight) {
      if (isAllDataFetched.current !== 0) setPageNo((prevPage) => prevPage + 1);
    }
  };
  const switchTo = () => {
    dispatch(switchComponent("/report"));
  };

  const downloadExcel = () => {
    downloadFile(downloadLink);
  };

  return (
    <>
      <div className="top-content d-flex align-items-center justify-content-between p-2">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-sm btn-light shadow bg-white rounded "
            data-toggle="tooltip"
            data-placement="top"
            title="Go back"
            onClick={switchTo}
          >
            <IoArrowBack />
          </button>
          <h6 className="m-0 ms-2">{created_file_name}</h6>
        </div>
        <button className="btn btn-success" onClick={downloadExcel}>
          Download
        </button>
      </div>
      <hr className="m-0 mx-2" />
      {/* <Chart /> */}

      <div className="data_table table-responsive mt-4 mx-2" ref={divRef}>
        <DataOnDom items={items} loading={loading} />
      </div>
      {/* <div className="table-spinner">
        <div className="text-center">
          <div className="spinner-border" role="status" />
        </div>
      </div> */}
    </>
  );
};

export { ViewData };
