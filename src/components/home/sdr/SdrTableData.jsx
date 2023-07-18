import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { GET_SDR_TOP_ROWS } from "../../utils/ConstantUrl";
import { isSdr } from "../../../redux/slices/SdrSlice";
import useApiHandle from "../../utils/useApiHandle";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

const SdrTableData = ({
  component,
  table,
  index,
  id,
  setSdrTopRows,
  setTableName,
  tableName,
  setId,
  setIsReload,
  setIsLoaded,
  operator,
}) => {
  const { data, loading, apiCall } = useApiHandle();
  const [isChange, setIsChange] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data) {
      setSdrTopRows(data?.data?.data);
      dispatch(isSdr(true));
      setIsLoaded(false);
      setSpinner(false);
    } else {
      setIsLoaded(false);
      setSpinner(false);
    }
  }, [data]);

  const handleChange = (e) => {
    const { value } = e.target;
    setIsChange(false);
    setTableName(value);
    localStorage.setItem("sdrTableName", value);
  };

  const editHeaders = async (e) => {
    let url = "";
    setId(id);
    setIsLoaded(true);
    setSpinner(true);
    setIsChange(true);
    localStorage.setItem("sdrTableId", id);

    apiCall(
      "get",
      `${GET_SDR_TOP_ROWS}${id}/?table_name=${tableName}&operator=${operator}`,
      ""
    );
  };

  return (
    <tr key={`sdrTableData${index}`}>
      <td>{index + 1}</td>
      <td>{table.name}</td>
      <td>
        <select
          name="table"
          className="w-100"
          onChange={(e) => handleChange(e)}
        >
          <option value="" disabled={true} selected>
            Select Option
          </option>
          {table?.table_name?.map((t, i) => {
            return (
              <option value={t} key={`tableNameData${i}`}>
                {t}
              </option>
            );
          })}
        </select>
      </td>
      <td>
        <button
          className="btn btn-sm btn-light shadow-sm"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            tableName !== "" && editHeaders(e);
            setIsReload(true);
          }}
          disabled={isChange}
        >
          {spinner ? <Spinner animation="border" size="sm" /> : <FaEye />}
        </button>
      </td>
    </tr>
  );
};

export { SdrTableData };
