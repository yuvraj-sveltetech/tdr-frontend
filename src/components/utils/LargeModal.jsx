import React from "react";
import { SelectHeaders } from "../utils/index";
import { useSelector } from "react-redux";

const LargeModal = () => {
  const headers = useSelector((state) => state.headers);
  // console.log(headers, "oo");

  return (
    <div className="modal fade modal-xl" tabIndex="-1" id="large_modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body overflow-auto">
            <SelectHeaders />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LargeModal };
