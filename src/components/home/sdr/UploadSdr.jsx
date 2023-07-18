import React, { useState, useEffect, useRef } from "react";
import { Sidebar, Header } from "../../utils/index";
import { Table } from "react-bootstrap";
import { SdrTableData, SdrHeaders } from "../../utils/index";
import { GET_SDR_FILE_DATA, UPLOAD_SDR_FILE } from "../../utils/ConstantUrl";
import useApiHandle from "../../utils/useApiHandle";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UploadSdr = () => {
  const { data, loading, apiCall } = useApiHandle();
  const [selectedFile, setSelectedFile] = useState([]);
  const [loader, setLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const [table, setTable] = useState([]);
  const [sdrTopRows, setSdrTopRows] = useState({});
  const [tableName, setTableName] = useState("");
  const [isReload, setIsReload] = useState(false);
  const [id, setId] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [operator, setOperator] = useState("bsnl");
  const isSdrLoad = useSelector((state) => state.sdr.isSdrLoad);
  const inputRef = useRef();
  let component = localStorage.getItem("showComponent");

  useEffect(() => {
    if (data?.data?.data) {
      setLoader(false);
      setTableLoader(false);
      setTable(data?.data?.data);
      setSelectedFile([]);
      inputRef.current.value = null;
    } else if (data?.data?.table_name) {
      toast.success(data?.data?.Message);
      setSelectedFile([]);
      getSdrFiles();
      inputRef.current.value = null;
    } else {
      setTableLoader(false);
      setLoader(false);
      inputRef.current.value = null;
    }
  }, [data]);

  useEffect(() => {
    getSdrFiles();
  }, [operator]);

  const changeHandler = (e) => {
    const { files } = e.target;
    setSelectedFile(files);
  };

  const getSdrFiles = () => {
    setTableLoader(true);
    apiCall("get", `${GET_SDR_FILE_DATA}?operator=${operator}`, "");
  };

  const uploadSdrFile = async () => {
    setLoader(true);

    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append("file", selectedFile[i]);
      if (component === "sdr") {
        formData.append("operator", operator);
      }
    }

    apiCall("post", `${UPLOAD_SDR_FILE}?operator=${operator}`, formData);
  };

  return (
    <>
      <div className="dashboard container-fluid">
        <div className="row">
          <Sidebar />
          <div className="dashpage col-md-10">
            <Header />
            <div className="border m-2">
              <div
                className="mt-4"
                style={{
                  margin: "20px",
                }}
              >
                {!isSdrLoad ? (
                  <div>
                    <div className="main d-flex align-items-center justify-content-between mb-2 ">
                      <div className="tower-file w-100 d-flex align-items-center justify-content-end">
                        <form
                          encType="multipart/form-data"
                          id="form1"
                          className="mr-2"
                        >
                          <div className="custom-file">
                            <input
                              id="myFile"
                              type="file"
                              name="file"
                              multiple
                              className="custom-file-input p-1 me-2"
                              onChange={changeHandler}
                              disabled={loader}
                              ref={inputRef}
                              style={{
                                backgroundColor: "#f1f3f3",
                                cursor: "pointer",
                              }}
                            />
                            <label
                              id="filelabel1"
                              className="custom-file-label"
                              htmlFor="customFile"
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            ></label>
                          </div>
                        </form>

                        <select
                          name="operator"
                          style={{
                            height: "2.4rem",
                            marginRight: "0.5rem",
                          }}
                          onChange={(e) => {
                            setOperator(e.target.value);
                          }}
                          value={operator}
                          disabled={loader}
                        >
                          <option value="bsnl">BSNL</option>
                          <option value="airtel">AIRTEL</option>
                          <option value="vi">VI</option>
                          <option value="jio">JIO</option>
                        </select>

                        <button
                          className="btn btn-success"
                          disabled={
                            selectedFile.length > 0 && !loader ? false : true
                          }
                          onClick={uploadSdrFile}
                        >
                          {loader ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              <span className="ps-1">loading...</span>
                            </>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </div>

                    <div
                      className="files"
                      style={{ height: "74vh", overflowY: "scroll" }}
                    >
                      <Table striped bordered className="mt-0">
                        <thead
                          style={{
                            position: "sticky",
                            top: "0",
                            width: "100%",
                            color: "white",
                            background: "grey",
                            zIndex: "1",
                          }}
                        >
                          <tr>
                            <th>S.No.</th>
                            <th>File Name</th>
                            <th>Select Table</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableLoader ? (
                            <tr>
                              <td colSpan="4">
                                <div className="d-flex justify-content-center">
                                  <div
                                    className="spinner-border"
                                    role="status"
                                    id="spinn"
                                  />
                                </div>
                              </td>
                            </tr>
                          ) : table?.length > 0 ? (
                            table?.map((t, i) => {
                              return (
                                <SdrTableData
                                  table={t}
                                  index={i}
                                  id={t.id}
                                  setSdrTopRows={setSdrTopRows}
                                  sdrTopRows={sdrTopRows}
                                  setTableName={setTableName}
                                  tableName={tableName}
                                  setId={setId}
                                  setIsReload={setIsReload}
                                  setIsLoaded={setIsLoaded}
                                  component={component}
                                  operator={operator}
                                  key={`mappingTable_${i}`}
                                />
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="4">
                                <h3
                                  style={{ color: "gray" }}
                                  className="text-center"
                                >
                                  No Data Found!
                                </h3>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <SdrHeaders
                    sdrTopRows={sdrTopRows}
                    isReload={isReload}
                    isLoaded={isLoaded}
                    component={component}
                    operator={operator}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { UploadSdr };
