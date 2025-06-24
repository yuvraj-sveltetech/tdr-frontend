import React, { useEffect, useState, useRef } from "react";
import { ViewData } from "../../utils/index";
import { useDispatch, useSelector } from "react-redux";
import useApiHandle from "../../utils/useApiHandle";
import * as URL from "../../utils/ConstantUrl";
import { switchComponent } from "../../../redux/slices/BreadCrumbSlice";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import { BiTime } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { FcDownload } from "react-icons/fc";
import { CiCalendarDate } from "react-icons/ci";
import notFound from "../../../assets/images/data-not-found.png";
import { downloadFile } from "../../../utils/downloadFile";
import { useInView } from "react-intersection-observer";

const Report = () => {
  const { data, loading, apiCall, status_code } = useApiHandle();
  const [reportData, setReportData] = useState([]);
  const toComp = useSelector((state) => state.show_count.switch_component);
  const download_link = useRef(null);
  const dispatch = useDispatch();
  const report_id = useRef(null);
  const created_file_name = useRef(null);
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (status_code === 200 && data?.results) {
      if (pageNo === 1) {
        setReportData(data.results);
      } else {
        setReportData((prev) => [...prev, ...data.results]);
      }
      setHasMore(data.results.length > 0);
    }
  }, [data, status_code]);

  useEffect(() => {
    getGeneratedReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  useEffect(() => {
    if (inView && hasMore && reportData.length > 0) {
      setPageNo((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const getGeneratedReport = () => {
    apiCall("get", `${URL.GET_EXCEL_DATA}?page_no=${pageNo}`, "");
  };

  const switchTo = (item, component) => {
    report_id.current = item?.id;
    created_file_name.current = item?.folder_name;
    download_link.current = item.csv_file;
    dispatch(switchComponent(component));
  };

  return (
    <>
      <div className="dashboard container-fluid">
        {toComp === "/view-data" ? (
          <ViewData
            downloadLink={download_link.current}
            report_id={report_id.current}
            created_file_name={created_file_name.current}
          />
        ) : (
          <div className="report">
            <h6 className="mb-3">Report List</h6>
            <hr />
            {loading && reportData.length === 0 ? (
              <div className="data-not-found">
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status" />
                </div>
                <span className="sr-only d-flex justify-content-center">
                  Please wait...
                </span>
              </div>
            ) : reportData?.length > 0 ? (
              <ul
                style={
                  reportData?.length > 1
                    ? { overflowY: "scroll" }
                    : { overflow: "hidden" }
                }
              >
                {reportData?.map((item, idx) => {
                  const isLast = idx === reportData.length - 1;
                  return (
                    <div
                      className="item me-1"
                      key={item.id}
                      ref={isLast ? ref : null}
                    >
                      <li className="w-75 d-flex justify-content-between">
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 200, hide: 300 }}
                          overlay={
                            <Tooltip>
                              {item?.project_name} / {item?.location_name} (
                              {item?.result_type})
                            </Tooltip>
                          }
                        >
                          <div className="reportListName d-inline-block text-truncate">
                            <BsFillFileEarmarkTextFill
                              className="file_icon mb-1 me-2"
                              size={20}
                            />
                            {`${item?.project_name}/${item?.location_name} (${item?.result_type})`}
                          </div>
                        </OverlayTrigger>

                        <div className="date">
                          <span className="d-flex align-items-center">
                            <CiCalendarDate size={20} className="me-1" />
                            {item.created_date}
                          </span>
                        </div>

                        <div className="time">
                          <span className="d-flex align-items-center">
                            <BiTime className="me-1" />
                            {item.created_time}
                          </span>
                        </div>
                      </li>

                      <div className="btns">
                        {/* <button
                          className="btn btn-sm btn-light me-2"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="View"
                          onClick={() => switchTo(item, "/view-data")}
                        >
                          <FaEye />
                        </button> */}
                        <button
                          className="btn btn-sm btn-light"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Download"
                          onClick={() => downloadFile(item.file_path)}
                        >
                          <FcDownload />
                        </button>
                      </div>
                    </div>
                  );
                })}
                {hasMore && (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status" />
                  </div>
                )}
              </ul>
            ) : (
              <div className="data-not-found">
                <img src={notFound} alt="not-found" width="200" />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export { Report };
