import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";
import { downloadFile } from "../../../../utils/downloadFile";

const ViewFile = ({
  ids = null,
  locationID = null,
  pro_id = null,
  setIsModalOpen,
  apiURL,
}) => {
  const param = useParams();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [filterModel, setFilterModel] = useState({});
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const requestLock = useRef(false); // Lock to manage API calls
  const prevStatesRef = useRef({ paginationModel: {}, filterModel: {} });
  const auth = Cookies.get("ss_tkn");

  const memoizedFilterModel = useMemo(
    () => filterModel,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(filterModel)]
  );

  const fetchData = async (page = 0, pageSize = 5, filterModel = {}) => {
    if (requestLock.current) return; // Prevent if a request is already in progress
    requestLock.current = true; // Set lock

    setLoading(true);
    try {
      let params = {
        page: page + 1,
        page_size: pageSize,
        filter: JSON.stringify(filterModel?.items || []),
        // download: false,
      };

      // Only add these if it is not null or undefined
      if (locationID) {
        params.location_id = locationID;
      }

      if (ids?.length) {
        const uniqueIds = [...new Set(ids)]; // Ensure unique IDs
        params.ids = uniqueIds.join(",");
      }

      if (pro_id) {
        params.pro_id = pro_id;
      } else {
        params.project_id = param?.parent_folder;
      }

      if (!auth) {
        console.error("Authorization token not found in cookies");
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}${apiURL}`,
        {
          headers: { Authorization: `Bearer ${auth}` },
          params,
        }
      );

      const {
        results = [],
        total_records,
        current_page,
        page_size,
        file_path = "",
      } = response.data;

      setRows(results);
      setTotalRowCount(total_records || 0);
      setPaginationModel({ page: current_page - 1, pageSize: page_size });
      setDownloadURL(file_path);

      if (!columns.length && results.length) {
        const dynamicColumns = Object.keys(results[0]).map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          width: 150,
        }));
        setColumns(dynamicColumns);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      requestLock.current = false; // Release lock
    }
  };

  useEffect(() => {
    const { paginationModel: prevPagination, filterModel: prevFilter } =
      prevStatesRef.current;
    const paginationChanged =
      prevPagination.page !== paginationModel.page ||
      prevPagination.pageSize !== paginationModel.pageSize;
    const filterChanged =
      JSON.stringify(prevFilter) !== JSON.stringify(memoizedFilterModel);

    if (paginationChanged || filterChanged) {
      fetchData(
        paginationModel.page,
        paginationModel.pageSize,
        memoizedFilterModel
      );
    }

    prevStatesRef.current = {
      paginationModel,
      filterModel: memoizedFilterModel,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationModel, memoizedFilterModel]);

  const downloadExcel = () => {
    downloadFile(downloadURL);
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
              onClick={() => setIsModalOpen(false)}
            ></button>
          </div>
          <div className="modal-body">
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                rowCount={totalRowCount}
                loading={loading}
                pagination
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                filterMode="server"
                onFilterModelChange={(model) => setFilterModel(model)}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => {
                  if (!row?.uniqueId) {
                    row.uniqueId = uuidv4();
                  }
                  return row.uniqueId;
                }}
              />
            </Box>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-success"
              disabled={downloadURL?.length === 0}
              onClick={downloadExcel}
            >
              Download Excel
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFile;
