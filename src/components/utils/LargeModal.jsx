import React from "react";
import { SelectHeaders } from "../utils/index";
import { useSelector } from "react-redux";

const LargeModal = () => {
  const headers = useSelector((state) => state.headers);
  // console.log(headers, "oo");

  return (
    <div class="modal fade modal-xl" tabindex="-1" id="large_modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <SelectHeaders />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LargeModal };
