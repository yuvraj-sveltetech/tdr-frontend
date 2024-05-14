import { MdOutlineDelete } from "react-icons/md";
import React, { useState, useCallback, useEffect } from "react";
import Modal from "bootstrap/js/dist/modal";
import fileImg from "../../assets/images/file.png";
import * as URL from "../utils/ConstantUrl";
import useApiHandle from "../utils/useApiHandle";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { folder } from "../../redux/slices/FolderSlice";

const DeleteModal = ({ ids, type, txt, setFileIds }) => {
  const { data, apiCall, status_code, loading } = useApiHandle();
  const [modalInstance, setModalInstance] = useState(null);

  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status_code === 200 && data?.data?.length > 0) {
      dispatch(folder({ take_action: "create_subfolder", data: data?.data }));
    }

    if (data?.message === "Deleted successfully") {
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

  const deleteApi = async () => {
    apiCall("delete", `${URL.DELETE}?type=${type}&file_id=${ids}`, {});
  };

  const getData = async () => {
    apiCall("get", `${URL.FOLDER_API}?project_id=${param?.parent_folder}`, {});
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
              Delete Files
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {`Are you sure want to delete ${txt}?`}
          </div>

          <div className="modal-footer">
            <footer className="d-flex justify-content-end">
              <button
                id="submit"
                className="btn btn-danger rounded-sm me-2"
                onClick={deleteApi}
              >
                Yes
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

export default DeleteModal;
