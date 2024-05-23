import React, { useState, useEffect } from "react";
import Modal from "bootstrap/js/dist/modal";
import * as URL from "./ConstantUrl";
import useApiHandle from "./useApiHandle";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { folder } from "../../redux/slices/FolderSlice";

const CrudModal = ({ ids, type, txt, setFileIds, operation }) => {
  const { data, apiCall, status_code, loading } = useApiHandle();
  const [modalInstance, setModalInstance] = useState(null);
  const [text, setText] = useState("");

  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status_code === 200 && data?.data?.length > 0) {
      if (operation === "delete") {
        dispatch(folder({ take_action: "create_subfolder", data: data?.data }));
      } else {
        dispatch(folder({ take_action: "create_folder", data: data?.data }));
      }
    }

    if (
      data?.message === "Deleted successfully" ||
      data?.message === "Updated successfully"
    ) {
      setText("");
      setFileIds([]);
      dispatch(
        folder({
          take_action: "select_only_subfolder",
          data: {
            checked: false,
            ...param,
          },
        })
      );
      modalInstance.hide();
      let modal = document?.querySelector(".modal-backdrop");
      if (modal) {
        modal.parentNode.removeChild(modal);
      }

      getData();
    }
  }, [status_code, data]);

  useEffect(() => {
    let myModal = Modal.getOrCreateInstance(
      document.getElementById("deleteModal"),
      {
        keyboard: false,
      }
    );
    setModalInstance(myModal);
  }, []);

  const callApi = async () => {
    if (operation === "delete") {
      apiCall("delete", `${URL.DELETE}?type=${type}&file_id=${ids}`, {});
    } else {
      apiCall("patch", `${URL.EDIT}?folder_id=${ids}`, { folder_name: text });
    }
  };

  const getData = async () => {
    if (operation === "delete") {
      apiCall(
        "get",
        `${URL.FOLDER_API}?project_id=${param?.parent_folder}`,
        {}
      );
    } else {
      apiCall("get", URL.FOLDER_API, {});
    }
  };

  const renderBody = () => {
    if (operation === "delete") {
      return `Are you sure want to delete ${txt}?`;
    } else {
      return (
        <input
          type="text"
          name="name"
          className="w-100"
          placeholder="Folder Name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      );
    }
  };

  return (
    <div
      className="modal fade"
      id="deleteModal"
      aria-hidden="true"
      aria-labelledby="deleteModalLabel"
      tabindex="-1"
      data-bs-backdrop={loading ? "static" : true}
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">
              {operation === "delete" ? "Delete Files" : "Rename Folder"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{renderBody()}</div>

          <div className="modal-footer">
            <footer className="d-flex justify-content-end">
              <button
                id="submit"
                className="btn btn-danger rounded-sm me-2"
                onClick={callApi}
              >
                {operation === "delete" ? "Yes" : "Edit"}
              </button>
              <button
                id="submit"
                className="btn btn-secondary rounded-sm"
                data-bs-dismiss="modal"
              >
                No
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudModal;
