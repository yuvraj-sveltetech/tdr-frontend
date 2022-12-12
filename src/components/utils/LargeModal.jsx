import React, { useState, useEffect } from "react";
import { SelectHeaders } from "../utils/index";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { add_selected_headers } from "../../redux/slices/SelectedOperaterSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const LargeModal = ({ show, handleClose, handleShow }) => {
  const [hasValue, setHasValue] = useState(new Map());
  const files = useSelector((state) => state.folder);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {
  //     setHasValue([]);
  //   };
  // }, []);

  const sendHeader = () => {
    let arr = Array.from(hasValue.values());

    const findUnique = new Set(
      arr.map((x) => {
        return Object.keys(x)[1];
      })
    );

    if (arr.length > 0) {
      if (findUnique.size < arr.length) {
        toast.error("Duplicate Header Found!");
      } else {
        let data = {
          parent_folder_name: files.sub_folders.parent_folder,
          subfolder_name: files.sub_folders.subfolder,
          selected_headers: arr,
        };

        dispatch(add_selected_headers(data));
        handleClose();
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title className="h5">Select Headers</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-auto">
          <SelectHeaders setHasValue={setHasValue} hasValue={hasValue} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={sendHeader}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { LargeModal };
