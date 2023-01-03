import React, { useState } from "react";
import { SelectHeaders } from "../utils/index";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { add_selected_headers } from "../../redux/slices/SelectedOperaterSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const LargeModal = ({ show, handleClose, handleShow, operator_files }) => {
  const [hasValue, setHasValue] = useState(new Map());
  const files = useSelector((state) => state.folder);
  const dispatch = useDispatch();

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
    } else {
      toast.warning("Please Select Header!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title className="h5">Select Headers</Modal.Title>
      </Modal.Header>
      <Modal.Body className="overflow-auto">
        <SelectHeaders
          setHasValue={setHasValue}
          hasValue={hasValue}
          parent_folder={files.sub_folders.parent_folder}
          sub_folders={files.sub_folders.subfolder}
          operator_files={operator_files}
        />
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
  );
};

export { LargeModal };
