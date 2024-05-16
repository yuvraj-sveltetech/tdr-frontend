import React, { useEffect, useState, useRef } from "react";
import { switchComponent } from "../../../redux/slices/BreadCrumbSlice";
import useApiHandle from "../../utils/useApiHandle";
import * as URL from "../../utils/ConstantUrl";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { DataOnDom, Chart } from "../../utils/index";
import { MdBubbleChart } from "react-icons/md";

const ViewData = ({
  downloadFile,
  downloadLink,
  report_id,
  created_file_name,
}) => {
  const { data, loading, apiCall } = useApiHandle();
  const [pageNo, setPageNo] = useState(1);
  const [items, setItems] = useState([]);
  const [number, setNumber] = useState("");
  const [singleNoData, setSingleNoData] = useState([]);
  const divRef = useRef(null);
  const isAllDataFetched = useRef(null);
  const dispatch = useDispatch();
  const reportID = sessionStorage.getItem("reportID");

  useEffect(() => {
    if (data?.data?.result?.[0]?.length > 0) {
      setItems([...items, ...data.data?.result[0]]);
      isAllDataFetched.current = data.data?.result[0].length;
    } else if (data?.data?.length > 0) {
      setSingleNoData(data?.data);
    }
  }, [data]);

  useEffect(() => {
    let copiedRef = divRef.current;
    const fetchData = async () => {
      apiCall(
        "get",
        URL.GET_EXCEL_PAGINATION + `${reportID}/?page_no=${pageNo}`,
        ""
      );
    };
    fetchData();

    copiedRef.addEventListener("scroll", handleScroll);
    return () => copiedRef.removeEventListener("scroll", handleScroll);
  }, [pageNo]);

  useEffect(() => {
    let getSingleNoData = "";
    if (number.length > 0) {
      getSingleNoData = setTimeout(() => {
        apiCall(
          "get",
          URL.SINGLE_NUMBER_CHART_DATA + `${report_id}/?number=${number}`,
          ""
        );
      }, 2000);
    } else if (number === "") {
      setSingleNoData([]);
    }
    return () => clearInterval(getSingleNoData);
  }, [number]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = divRef.current;
    if (scrollTop + clientHeight === scrollHeight) {
      if (isAllDataFetched.current !== 0) setPageNo((prevPage) => prevPage + 1);
    }
  };

  const switchTo = () => {
    sessionStorage.setItem("reportID", null);
    dispatch(switchComponent("/report"));
  };

  const downloadExcel = () => {
    downloadFile(downloadLink);
  };

  let style =
    items.length > 0
      ? {
          visibility: "visible",
        }
      : {
          visibility: "hidden",
          height: "0px",
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

        <div className="d-flex align-items-center">
          <div className="input-group me-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{ borderRadius: "0.375rem 0 0 0.375rem" }}
              >
                <MdBubbleChart size={24} />
              </span>
            </div>

            <input
              type="text"
              className="form-control shadow-none"
              placeholder="Enter mobile number"
              aria-label="Mobile number"
              aria-describedby="basic-addon1"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <button className="btn btn-success" onClick={downloadExcel}>
            Download
          </button>
        </div>
      </div>
      <hr className="m-0 mx-2" />

      <Chart
        singleNoData={singleNoData}
        report_id={report_id}
        itemsLength={items.length}
        number={number}
      />

      <div
        className="data_table table-responsive my-4 mx-2"
        ref={divRef}
        style={style}
      >
        {items.length > 0 && <DataOnDom items={items} loading={loading} />}
      </div>
    </>
  );
};

export { ViewData };
