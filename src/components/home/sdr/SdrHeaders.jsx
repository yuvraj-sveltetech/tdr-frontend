import React, { useState, useEffect } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { isSdr } from "../../../redux/slices/SdrSlice";
import useApiHandle from "../../utils/useApiHandle";
import { PROCESS_SDR_FILE, GET_SDR_TOP_ROWS } from "../../utils/ConstantUrl";
import { toast } from "react-toastify";

const SdrHeaders = ({
  component,
  sdrTopRows,
  isReload,
  isLoaded,
  operator,
}) => {
  const { data, loading, apiCall } = useApiHandle();
  let tableId = localStorage.getItem("sdrTableId");
  let uniqueTableName = localStorage.getItem("sdrTableName");
  const [staticHeaders, setStaticHeaders] = useState([]);
  const [postHeader, setPostHeader] = useState({});
  const [headerLength, setHeaderLength] = useState(0);
  const [displayTableDummy, setDisplayTableDummy] = useState("");
  const [displayTableHeader, setDisplayTableHeader] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data) {
      setIsLoading(false);
      // setSdrTopRows(data?.data?.data);
    } else {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setStaticHeaders([
      "MOBILE_NO",
      "NAME",
      "LOCAL_ADDR_HOUSE_NO_FLAT_NO",
      "LOCAL_ADDR_STREET_ADDRESS_NAME",
      "LOCAL_ADDR_LOCALITY",
      "LOCAL_ADDR_CITY",
      "LOCAL_ADDR_STATE_UT",
      "LOCAL_ADDR_POSTAL_CODE",
      "FATHER_HUSBAND_NAME",
      "PERM_ADDR_HOUSE_NO_FLAT_NO",
      "PERM_ADDR_STREET_ADDRESS_NAME",
      "PERM_ADDR_LOCALITY",
      "PERM_ADDR_CITY",
      "PERM_ADDR_STATE_UT",
      "PERM_ADDR_POSTAL_CODE",
      "CONTACT_NUMBER",
      "INITIAL_SVC_PROVIDER",
    ]);
  }, []);

  const headers = Object.keys(sdrTopRows);

  useEffect(() => {
    if (!isReload) editHeaders();
  }, [isReload]);

  useEffect(() => {
    if (Object.keys(sdrTopRows).length > 0) getDataFromObject();
  }, [sdrTopRows]);

  const editHeaders = async (e) => {
    apiCall(
      "get",
      `${GET_SDR_TOP_ROWS}${tableId}/?table_name=${uniqueTableName}&operator=${operator}`,
      ""
    );
  };

  const getDataFromObject = () => {
    let defaultHeader = {};
    headers.forEach((item, index) => {
      defaultHeader[index] = item;
    });
    setPostHeader(defaultHeader);
    setHeaderLength(headers.length);

    const _displayTableDummy = Object.entries(sdrTopRows)?.map(
      (entry, index) => (
        <tr key={`mappingSdrTopRows${index}`}>
          {headers?.map((headerData, i) => (
            <>
              {sdrTopRows[headerData][index] !== undefined ? (
                <td
                  className="text-center"
                  key={`_displayTableDummyHeader${i}`}
                >
                  {sdrTopRows[headerData][index] !== null
                    ? sdrTopRows[headerData][index]
                    : "-"}
                </td>
              ) : null}
            </>
          ))}
        </tr>
      )
    );

    const _displayTableHeader = headers?.map((item, index) => (
      <th className="text-center" key={`_displayTableHeader${index}`}>
        {item}
      </th>
    ));

    setDisplayTableDummy(_displayTableDummy);
    setDisplayTableHeader(_displayTableHeader);
  };

  const handleTowerHeaderChange = (e, index) => {
    const { value } = e.target;
    setPostHeader((prev) => {
      return {
        ...prev,
        [index]: value,
      };
    });
  };

  const handleSumbit = () => {
    setIsLoading(true);
    const postData = {};

    Object.entries(postHeader).forEach((item, index) => {
      if (postHeader[item[0]] === "select") {
        delete postHeader[index];
      }
    });

    const length = Object.values(postHeader).length;

    Object.entries(postHeader).forEach((item) => {
      postData[item[1]] = parseInt(item[0]);
    });

    if (Object.values(postData).length === length) {
      apiCall(
        "post",
        `${PROCESS_SDR_FILE}${localStorage.getItem(
          "sdrTableId"
        )}/?table_name=${localStorage.getItem(
          "sdrTableName"
        )}&operator=${operator}`,
        postData
      );
    } else {
      toast.warn("Make sure columns have unique headers.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="main d-flex align-items-center justify-content-between mb-2 pt-2">
        <div className="heading d-flex align-items-center">
          <button
            className="btn btn-light mr-3"
            onClick={() => {
              dispatch(isSdr(false));
              localStorage.setItem("sdrTableId", "");
              localStorage.setItem("sdrTableName", "");
            }}
            disabled={isLoading}
          >
            <IoIosArrowBack />
          </button>

          <h6 className="m-0 p-0 ps-2">
            <b>{component === "sdr" ? "SDR Headers" : "Tower Data Headers"}</b>
          </h6>
        </div>
        {isLoading ? (
          <Button variant="success" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="mr-2"
            />
            <span className="visually-hidden">Loading...</span>
            <span className="ps-2">Uploading...</span>
          </Button>
        ) : (
          <button
            className="btn btn-success"
            onClick={handleSumbit}
            disabled={
              Object.keys(sdrTopRows)?.length > 0 && !isLoaded ? false : true
            }
          >
            Upload File
          </button>
        )}
      </div>
      {Object.keys(sdrTopRows)?.length > 0 && !isLoaded ? (
        <div
          className="sdrTopHeader"
          style={{ overflowX: "scroll", height: "77vh" }}
        >
          <Table striped bordered className="mt-3">
            <thead>
              <tr>
                {[...Array(headerLength)]?.map((item, index) => {
                  return (
                    <th scope="col" key={`staticHeaders${index}`}>
                      <select
                        className="form-select w-100"
                        aria-label="Default select example"
                        onChange={(e) => handleTowerHeaderChange(e, index)}
                        value={postHeader[index]}
                      >
                        <option value="select" selected>
                          Select
                        </option>
                        {staticHeaders?.map((innerItem, innerIndex) => (
                          <option
                            value={innerItem}
                            disabled={isLoading}
                            key={`headersInOptions${innerIndex}`}
                          >
                            {innerItem}
                          </option>
                        ))}
                      </select>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>{displayTableHeader}</tr>
              {displayTableDummy}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="unkown" style={{ height: "74vh" }}>
          <div className="d-flex justify-content-center mt-3">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <Spinner animation="border" role="status">
                <span className="visually-hidden ">Loading...</span>
              </Spinner>
              <p>Please Wait...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { SdrHeaders };
