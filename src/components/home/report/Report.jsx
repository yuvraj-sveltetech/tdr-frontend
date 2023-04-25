import React, { useEffect, useState, useRef } from "react";
import { Sidebar, Header, ViewData } from "../../utils/index";
import { useDispatch, useSelector } from "react-redux";
import useApiHandle from "../../utils/useApiHandle";
import * as URL from "../../utils/ConstantUrl";
import {
  switchComponent,
  excelData,
} from "../../../redux/slices/BreadCrumbSlice";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { FcDownload } from "react-icons/fc";
import notFound from "../../../assets/images/data-not-found.png";

const Report = () => {
  const { data, loading, apiCall } = useApiHandle();
  const [reportData, setReportData] = useState([]);
  const toComp = useSelector((state) => state.show_count.switch_component);
  const download_link = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data) {
      setReportData(data.data.data);
    }
  }, [data]);

  useEffect(() => {
    getExcelData();
  }, []);

  const getExcelData = () => {
    apiCall("get", URL.GET_EXCEL_DATA, "");
  };

  const downloadFile = async (download_link) => {
    await window.to_electron.DOWNLOAD_FILE("DOWNLOAD_FILE", download_link);
  };

  const switchTo = (item, component) => {
    dispatch(excelData(item));
    dispatch(switchComponent(component));
    download_link.current = item.file_location;
  };

  return (
    <>
      <div className="dashboard container-fluid">
        <div className="row">
          <Sidebar />
          <div className="dashpage col-md-10">
            <Header />
            {toComp === "/view-data" ? (
              <ViewData
                downloadFile={downloadFile}
                downloadLink={download_link.current}
              />
            ) : (
              <div className="report">
                <h5 className="mb-3">Report List</h5>
                <hr />
                {loading ? (
                  <div className="data-not-found">
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status" />
                    </div>
                    <span className="sr-only d-flex justify-content-center">
                      Please wait...
                    </span>
                  </div>
                ) : reportData.length > 0 ? (
                  <ul
                    style={
                      reportData.length > 1
                        ? { overflowY: "scroll" }
                        : { overflow: "hidden" }
                    }
                  >
                    {reportData?.map((item) => {
                      return (
                        <div className="item me-1" key={item.id}>
                          <li>
                            <BsFillFileEarmarkTextFill
                              className="file_icon mb-1 me-2"
                              size={20}
                            />
                            {item.result_name}
                          </li>

                          <div className="btns">
                            <button
                              className="btn btn-sm btn-light me-2"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="View"
                              onClick={() => switchTo(item, "/view-data")}
                            >
                              <FaEye />
                            </button>
                            <button
                              className="btn btn-sm btn-light"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Download"
                              onClick={() => downloadFile(item.file_location)}
                            >
                              <FcDownload />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="data-not-found">
                    <img src={notFound} alt="not-found" width="200" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { Report };
