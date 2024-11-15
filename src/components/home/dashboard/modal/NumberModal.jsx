import React from "react";

const NumberModal = ({ data }) => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title fs-5" id="exampleModalLabel">
              Numbers Found
            </h3>
          </div>
          <div className="modal-body">
            <div
              className="row overflow-auto"
              style={{
                maxHeight: "40vh",
              }}
            >
              {data?.map((item, i) => (
                <div className="col-3 my-2" key={`number-${item}-${i}`}>
                  <span className="number-list">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberModal;
