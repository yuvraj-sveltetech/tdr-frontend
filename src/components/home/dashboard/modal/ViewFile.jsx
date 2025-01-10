import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApiHandle from "../../../utils/useApiHandle";
import * as URL from "../../../utils/ConstantUrl";
import { useInView } from "react-intersection-observer";

const ViewFile = ({ locationID, setIsModalOpen }) => {
  const { data, loading, apiCall, status_code } = useApiHandle();
  const [fileData, setFileData] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false); // Track ongoing requests
  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  const param = useParams();

  useEffect(() => {
    if (inView && locationID && !isFetching) {
      viewFile();
    }
  }, [inView, locationID]);

  useEffect(() => {
    if (status_code === 200) {
      setFileData((prevData) => [...prevData, ...data?.results]); // Append new data
      setPage((prev) => prev + 1); // Increment page number
      setIsFetching(false); // Mark fetching as complete
    }
  }, [status_code, data]);

  const viewFile = () => {
    setIsFetching(true); // Prevent duplicate calls
    apiCall(
      "get",
      `${URL.EXPORT_CSV}?location_id=${locationID}&project_id=${param?.parent_folder}&page=${page}&download=false`,
      {}
    );
  };

  const reset = () => {
    setIsModalOpen(false);
    setFileData([]);
    setPage(1);
  };

  const renderTableContent = () => {
    const headers = Object.keys(fileData?.[0] ?? {});

    return (
      <div
        className="table-responsive"
        style={{ height: "60vh", overflowX: "auto" }}
      >
        {!loading && fileData?.length === 0 && (
          <div className="text-center">No data available.</div>
        )}

        <table className="table table-striped table-bordered">
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#f5f5f5",
            }}
          >
            <tr>
              {headers.map((header) => (
                <th key={header}>
                  {header?.replace(/_/g, " ")?.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fileData?.length > 0 &&
              fileData?.map((row, index) => (
                <tr key={index}>
                  {headers.map((header) => (
                    <td key={header}>{String(row[header])}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>

        {/* Loader at the bottom for pagination */}
        <div ref={ref} style={{ textAlign: "center", padding: "10px" }}>
          {loading && (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      aria-labelledby="viewFileModalToggle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="viewFileModalToggle">
              View Files
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={reset}
            ></button>
          </div>
          <div className="modal-body">{renderTableContent()}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={reset}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFile;
