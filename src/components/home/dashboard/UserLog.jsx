import React, { useState, useEffect } from "react";
import { Sidebar, Header } from "../../utils/index";
import useApiHandle from "../../utils/useApiHandle";
import { USER_LOGS } from "../../utils/ConstantUrl";
import notFound from "../../../assets/images/data-not-found.png";

const UserLog = () => {
  const { data, loading, apiCall } = useApiHandle();
  const [userLog, setUserLog] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setUserLog(data.data.data);
    }
  }, [data]);

  console.log(userLog, "pp");

  useEffect(() => {
    getUserLogs();
  }, []);

  const getUserLogs = () => {
    apiCall("get", USER_LOGS, "");
  };

  const tableHeaders = (
    <tr>
      {userLog?.length > 0 &&
        Object.keys(userLog[0])?.map((head, i) => (
          <th key={`user_head_logs${head + i}`}>
            {head
              .replace(/_/g, " ")
              .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase()
              )}
          </th>
        ))}
    </tr>
  );

  const tableRows =
    userLog?.length > 0 &&
    userLog?.map((item, i) => (
      <tr key={`user_row${item + i}`}>
        {Object.values(item)?.map((inner_item, i) => (
          <td key={`user_row${inner_item + i}_logs`}>{inner_item}</td>
        ))}
      </tr>
    ));

  return (
    <>
      <div className="dashboard container-fluid">
        <div className="row">
          <Sidebar />
          <div className="dashpage col-md-10">
            <Header />

            <div className="report">
              <h6 className="mb-3">User Log</h6>
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
              ) : userLog.length > 0 ? (
                <div className="user_log_table table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>{tableHeaders}</thead>
                    <tbody>{tableRows}</tbody>
                  </table>
                </div>
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

export { UserLog };
