import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchTable from "./SearchTable";
import notFound from "../../../assets/images/data-not-found.png";
import * as URL from "../../utils/ConstantUrl";
import useApiHandle from "../../utils/useApiHandle";
import { toast } from "react-toastify";

const Search = () => {
  const { data, apiCall, status_code, loading } = useApiHandle();
  const [mobileNumber, setMobileNumber] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (status_code === 200) {
      setTableData(data);
    } else {
      setTableData([]);
    }
  }, [status_code]);

  const handleChange = (number) => {
    setMobileNumber(number);
  };

  const getExistingFilesData = async (e) => {
    e.preventDefault();

    if (mobileNumber?.length === 0) {
      toast.warn("Enter Valid Mobile Number");
      return;
    }

    apiCall("get", `${URL.SEARCH_NUMBER}?search_number=${mobileNumber}`, {});
  };

  return (
    <div className="dashboard container-fluid mt-3">
      <SearchBar
        handleChange={handleChange}
        mobileNumber={mobileNumber}
        handleSubmit={getExistingFilesData}
      />

      <div className="mt-2">
        {loading ? (
          <div className="data-not-found">
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status"></div>
              <br />
            </div>
            <span>Please wait...</span>
          </div>
        ) : tableData?.length > 0 ? (
          <SearchTable data={tableData} />
        ) : (
          <div className="data-not-found">
            <img src={notFound} alt="not-found" width="200" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
