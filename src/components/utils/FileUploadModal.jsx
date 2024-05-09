import { MdOutlineDelete } from "react-icons/md";
import React, { useState, useCallback, useEffect } from "react";
import Modal from "bootstrap/js/dist/modal";
import fileImg from "../../assets/images/file.png";
import * as API_URL from "../utils/ConstantUrl";
import useApiHandle from "../utils/useApiHandle";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { folder } from "../../redux/slices/FolderSlice";

const FileUploader = () => {
  const { data, loading, apiCall, status_code } = useApiHandle();
  const [files, setFiles] = useState([]);
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

      let myModal = Modal.getOrCreateInstance(
        document.getElementById("exampleModalToggle2"),
        {
          keyboard: false,
        }
      );

      myModal.hide();

      let modal = document?.querySelector(".modal-backdrop");
      console.log(modal, "myModal");
      if (modal) {
        modal.parentNode.removeChild(modal);
      }

      return;
    }

    if (status_code === 201) {
      setFiles([]);
      getAllFiles();
      return;
    }
  }, [status_code, data]);

  const getAllFiles = () => {
    apiCall(
      "get",
      `${API_URL.ALL_FILES}?project_id=${param?.parent_folder}&location_id=${param?.subfolder}`,
      {}
    );
  };

  const handleFileSelect = useCallback((event) => {
    const newFiles = event.target.files;
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleDelete = (fileName) => {
    const filteredFiles = files?.filter((file) => file?.name !== fileName);
    setFiles([...filteredFiles]);
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

  const sendFiles = () => {
    const formData = new FormData();

    files?.forEach((file) => {
      formData.append("file", file);
    });

    formData.append("project_id", param?.parent_folder);
    formData.append("location_id", param?.subfolder);

    apiCall("post", `${API_URL.ALL_FILES}`, formData);
  };

  return (
    <div
      className="modal fade"
      id="exampleModalToggle2"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabIndex="-1"
      data-bs-backdrop={loading ? "static" : true}
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
            ></button>
          </div>
          <div className="modal-body">
            {loading && (
              <div
                className=""
                style={{
                  position: "absolute",
                  width: "96%",
                  height: "97%",
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
                height: "23vh",
                border: "1px solid",
                borderStyle: "dashed",
              }}
              htmlFor="file-upload"
            >
              <div className="d-flex flex-column align-items-center justify-content-center">
                <span className="fw-normal">
                  Drag and drop your files anywhere or
                </span>
                <label
                  className="mt-3 border-0 px-2 py-1"
                  htmlFor="file-upload"
                  style={{
                    backgroundColor: "#E5E7EB80",
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
              <div className="py-3">
                <span style={{ fontSize: "1.2rem", paddingBottom: "5rem" }}>
                  To Upload
                </span>
                <div className="pt-3">
                  <div
                    className="w-full d-flex flex-wrap gap-3 list-none"
                    style={{ height: "35vh", overflowY: "scroll" }}
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
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <footer className="d-flex justify-content-end">
              <button
                id="submit"
                className="btn btn-primary rounded-sm me-3"
                disabled={files?.length === 0 && !loading}
                onClick={sendFiles}
              >
                Upload now
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
