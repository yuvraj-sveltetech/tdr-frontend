import { MdOutlineDelete } from "react-icons/md";
import React, { useState, useCallback, useEffect } from "react";
import fileImg from "../../assets/images/file.png";
import Cookies from "js-cookie";
import * as API_URL from "../utils/ConstantUrl";
import useApiHandle from "../utils/useApiHandle";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { folder } from "../../redux/slices/FolderSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const FileUploader = () => {
  const { data, loading, apiCall, status_code } = useApiHandle();
  const activeBtnState = useSelector((state) => state.show_count?.active_btn);

  const [files, setFiles] = useState([]);
  const [erroredFiles, setErroredFiles] = useState([]);
  const [emptyFiles, setEmptyFiles] = useState(null);
  const [remainingFileCount, setRemainingFileCount] = useState(null);

  const [ipdrMultiFileLoader, setIpdrMultiFileLoader] = useState(false);
  const [uploadedFileCount, setUploadedFileCount] = useState(0);
  const auth = Cookies.get("ss_tkn");

  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status_code === 200 && data?.length > 0) {
      dispatch(
        folder({
          take_action: "add_files",
          data: { api_data: data, params: param },
        })
      );

      return;
    }

    if (status_code === 201) {
      if (activeBtnState !== "ipdr") {
        setFiles([]);
        getAllFiles();
      }

      // setFiles([]);
      // getAllFiles();
      // setErroredFiles(data?.invalid_files || []);
      setEmptyFiles(data?.empty_files?.empty_file_count || null);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_code, data]);

  useEffect(() => {
    if (files?.length > 0 && files.length === uploadedFileCount) {
      setIpdrMultiFileLoader(false);

      // Avoid unnecessary state updates
      if (uploadedFileCount !== 0) {
        setUploadedFileCount(0);
      }
      if (files.length > 0) {
        setFiles([]);
      }

      getAllFiles(); // Ensure this does not modify uploadedFileCount
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFileCount, files]);

  useEffect(() => {
    if (remainingFileCount === 0) {
      setRemainingFileCount(null); // Reset to null once all uploads are done
      toast.success("All Files are Uploaded");
    }
  }, [remainingFileCount]);

  const getAllFiles = () => {
    apiCall(
      "get",
      `${API_URL.ALL_FILES?.[activeBtnState]}?project_id=${param?.parent_folder}&location_id=${param?.subfolder}&file_type=${activeBtnState}`,
      {}
    );
  };

  const handleFileSelect = useCallback((event) => {
    setErroredFiles([]);
    const newFiles = event.target.files;
    setFiles((prev) => [...prev, ...newFiles]);
    setRemainingFileCount(newFiles?.length);
  }, []);

  const handleDelete = (fileName) => {
    const filteredFiles = files?.filter((file) => file?.name !== fileName);
    setFiles([...filteredFiles]);
    setRemainingFileCount((prev) => (prev !== null ? prev - 1 : null));
  };

  function formatFileSize(bytes) {
    if (bytes < 1) return "0 Bytes";
    const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const index = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      units.length - 1
    );
    const size = Number((bytes / Math.pow(1024, index)).toFixed(2));
    return `${size} ${units[index]}`;
  }

  const ipdrApiCall = async (fileFormData, fileName) => {
    setIpdrMultiFileLoader(true);

    try {
      await axios.post(
        `${BASE_URL}${API_URL.ALL_FILES?.[activeBtnState]}`,
        fileFormData,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
            "Content-Type": "multipart/form-data", // Ensure content type is set for file upload
          },
        }
      );
      // toast.success(response?.data?.Message);
    } catch (error) {
      console.error("Error fetching files:", fileFormData);
      setErroredFiles((prev) => [...prev, fileName]);
      return null;
    } finally {
      setUploadedFileCount((prevCount) => prevCount + 1);
    }
  };

  //  {API CALL IN ONE GOO..... BULK UPOLOAD}}}}}}}}}}
  // const sendFiles = () => {
  //   if (activeBtnState === "ipdr") {
  //     files.forEach((file, index) => {
  //       const fileFormData = new FormData();
  //       fileFormData.append("file", file);
  //       fileFormData.append("project_id", param?.parent_folder);
  //       fileFormData.append("location_id", param?.subfolder);
  //       fileFormData.append("file_type", activeBtnState);

  //       ipdrApiCall(fileFormData);
  //     });
  //   } else {
  //     // If not "ipdr", send files as a batch request
  //     const formData = new FormData();
  //     files?.forEach((file) => {
  //       formData.append("file", file);
  //     });

  //     formData.append("project_id", param?.parent_folder);
  //     formData.append("location_id", param?.subfolder);
  //     formData.append("file_type", activeBtnState);

  //     apiCall("post", `${API_URL.ALL_FILES?.[activeBtnState]}`, formData);
  //   }
  // };

  const sendFiles = async () => {
    if (activeBtnState === "ipdr") {
      // for (const file of files) {
      //   const fileFormData = new FormData();
      //   fileFormData.append("file", file);
      //   fileFormData.append("project_id", param?.parent_folder);
      //   fileFormData.append("location_id", param?.subfolder);
      //   fileFormData.append("file_type", activeBtnState);

      //   await ipdrApiCall(fileFormData, file?.name); // Wait for one request to finish before sending the next
      //   setRemainingFileCount((prev) => prev - 1);
      // }

      // ----------------------------------------------------

      const formData = new FormData();
      files?.forEach((file) => {
        formData.append("file", file);
      });

      formData.append("project_id", param?.parent_folder);
      formData.append("location_id", param?.subfolder);
      formData.append("file_type", activeBtnState);

      const response = await axios.get(
        // `${process.env.REACT_APP_API_KEY}${apiURL}`,
        "http://localhost:5000/upload",
        formData,
        {
          headers: { Authorization: `Bearer ${auth}` },
        }
      );

      console.log(response, "IPDR Upload");

      // apiCall("post", `${API_URL.ALL_FILES?.[activeBtnState]}`, formData);

      // ----------------------------------------------------
    } else {
      // If not "ipdr", send files as a batch request
      const formData = new FormData();
      files?.forEach((file) => {
        formData.append("file", file);
      });

      formData.append("project_id", param?.parent_folder);
      formData.append("location_id", param?.subfolder);
      formData.append("file_type", activeBtnState);

      apiCall("post", `${API_URL.ALL_FILES?.[activeBtnState]}`, formData);
    }

    // If not "ipdr", send files as a batch request
    // const formData = new FormData();
    // files?.forEach((file) => {
    //   formData.append("file", file);
    // });

    // formData.append("project_id", param?.parent_folder);
    // formData.append("location_id", param?.subfolder);
    // formData.append("file_type", activeBtnState);

    // apiCall("post", `${API_URL.ALL_FILES?.[activeBtnState]}`, formData);
  };

  return (
    <div
      className="modal fade"
      id="exampleModalToggle2"
      aria-labelledby="exampleModalToggleLabel2"
      tabIndex="-1"
      data-bs-keyboard="false"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            {/* <h5 className="modal-title" id="exampleModalToggleLabel2">
              Modal 2
            </h5> */}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss={loading ? "" : "modal"}
              aria-label="Close"
              // disabled={loading}
              disabled={loading || ipdrMultiFileLoader}
              onClick={() => {
                setErroredFiles([]);
                setFiles([]);
                setEmptyFiles(null);
              }}
            ></button>
          </div>
          <div className="modal-body">
            {(loading || ipdrMultiFileLoader) && (
              /* {loading && ( */
              <div
                style={{
                  position: "absolute",
                  width: "96%",
                  height: "93%",
                  backgroundColor: "#5e555570",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="spinner-border" role="status"></div>
                  <span>Uploading...</span>
                </div>
              </div>
            )}

            <label
              className="d-flex align-items-center justify-content-center"
              style={{
                height: "15vh",
                border: "1px solid",
                borderStyle: "dashed",
                cursor: "pointer",
              }}
              htmlFor="file-upload"
            >
              <div className="d-flex flex-column align-items-center justify-content-center">
                <label
                  className="border-0 px-2 py-1"
                  htmlFor="file-upload"
                  style={{
                    backgroundColor: "#E5E7EB80",
                    cursor: "pointer",
                  }}
                >
                  Upload a File
                </label>
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept=".xls,.xlsx,.xlsb,.csv"
                  className="d-none"
                  onChange={(e) => handleFileSelect(e)}
                />
              </div>
            </label>

            <div>
              <div className="pt-3">
                <span style={{ fontSize: "1rem", paddingBottom: "5rem" }}>
                  To Upload : <span className="fw-bold">{files?.length}</span>
                </span>
                <div className="pt-3">
                  <div
                    className="w-full d-flex flex-wrap gap-3 list-none"
                    style={{ height: "25vh", overflowY: "scroll" }}
                  >
                    {files?.length > 0 ? (
                      files?.map((file, i) => (
                        <div
                          className="p-2 bg-light rounded-3 d-flex flex-column justify-content-between"
                          key={`files${file?.name + i}`}
                          style={{ width: "23%", height: "19vh" }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <span
                              className=""
                              style={{
                                fontSize: "14px",
                                width: "75%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {file?.name}
                            </span>

                            <MdOutlineDelete
                              style={{
                                fontSize: "18px",
                                cursor: "pointer",
                                color: "red",
                              }}
                              onClick={() => handleDelete(file?.name)}
                            />
                          </div>

                          <img
                            src={fileImg}
                            alt="file"
                            style={{
                              width: "4rem",
                              height: "4rem",
                              margin: "auto",
                            }}
                          />

                          <span
                            className="text-black-50"
                            style={{ fontSize: "12px" }}
                          >
                            {formatFileSize(file?.size)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <li
                        id="empty"
                        className="h-100 w-100 d-flex flex-column justify-content-center align-items-center"
                      >
                        <img
                          className="mx-auto"
                          src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                          alt="no data"
                          style={{ width: "8rem" }}
                        />
                        <span className="text-muted">No files selected</span>
                      </li>
                    )}
                  </div>
                </div>

                {/* 
                <div
                  className="bg-black w-full mt-3 text-light px-3 py-2"
                  style={{ height: "8rem" }}
                >
                  <span>File Upload</span>
                </div> */}

                {erroredFiles?.length > 0 && (
                  <div
                    className="mt-4"
                    style={{ height: "5rem", overflow: "auto" }}
                  >
                    {erroredFiles?.map((file) => (
                      <div className="alert alert-danger m-0 mt-1" role="alert">
                        Error in <strong>{file}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <footer className="w-100 d-flex align-items-center justify-content-between">
              {typeof emptyFiles === "number" && (
                <span>Empty Files: {emptyFiles}</span>
              )}

              {remainingFileCount && ipdrMultiFileLoader && (
                <span>Remaining Files: {remainingFileCount}</span>
              )}

              <button
                id="submit"
                className="btn btn-primary rounded-sm ms-auto me-3"
                disabled={
                  (files?.length === 0 && !loading) ||
                  (files?.length > 0 && loading) ||
                  (files?.length > 0 && ipdrMultiFileLoader)
                }
                onClick={sendFiles}
              >
                Upload
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
