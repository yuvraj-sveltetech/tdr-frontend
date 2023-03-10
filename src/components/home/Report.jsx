import React, { useEffect, useState } from "react";
import { Sidebar, Header } from "../utils/index";
import useApiHandle from "../utils/useApiHandle";
import * as URL from "../utils/ConstantUrl";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";

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

  console.log(loading, loading);

  return (
    <>
      <div className="dashboard container-fluid">
        <div className="row ">
          <Sidebar />
          <div className="dashpage col-md-10">
            <Header />
            <div className="report">
              <h5 className="mb-3">Download Report</h5>

              {loading ? (
                <>
                  <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status" />
                  </div>
                  <span class="sr-only d-flex justify-content-center">Please wait...</span>
                </>
              ) : (
                <ul>
                  {reportData?.map((item) => {
                    return (
                      <div
                        className="item"
                        key={item.id}
                        style={
                          reportData.length > 1
                            ? { overflowX: "scroll" }
                            : { overflow: "unset" }
                        }
                      >
                        <li>
                          <BsFillFileEarmarkTextFill
                            className="file_icon mb-1 me-2"
                            size={20}
                          />
                          {item.result_name}
                        </li>
                        <button className="btn btn-primary">Download</button>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Report };
