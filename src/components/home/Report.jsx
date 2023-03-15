import React, { useEffect, useState } from "react";
import { Sidebar, Header } from "../utils/index";
import useApiHandle from "../utils/useApiHandle";
import * as URL from "../utils/ConstantUrl";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import notFound from "../../assets/images/data-not-found.png";

const Report = () => {
  const { data, loading, apiCall } = useApiHandle();
  const [reportData, setReportData] = useState([]);

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

  return (
    <>
      <div className="dashboard container-fluid">
        <div className="row">
          <Sidebar />
          <div className="dashpage col-md-10">
            <Header />
            <div className="report">
              <h5 className="mb-3">Report List</h5>
              {loading ? (
                <div className="data-not-found">
                  <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status" />
                  </div>
                  <span class="sr-only d-flex justify-content-center">
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
                        <button
                          className="btn btn-primary"
                          onClick={() => downloadFile(item.file_location)}
                        >
                          Download
                        </button>
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
          </div>
        </div>
      </div>
    </>
  );
};

export { Report };
