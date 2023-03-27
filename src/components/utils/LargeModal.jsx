import React, { useState, useRef } from "react";
import { SelectHeaders } from "../utils/index";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { append_headers } from "../../redux/slices/SelectedFiles";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const LargeModal = ({
  show,
  handleClose,
  operator_files,
  parent_folder,
  sub_folders,
}) => {
  const [hasValue, setHasValue] = useState(new Map());
  const files = useSelector((state) => state.folder);
  const headerCount = useRef(null);
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
        toast.error("Duplicate header found!");
      } else if (findUnique.size !== headerCount.current) {
        toast.warning("Please select remaining headers!");
      } else {
        let data = {
          parent_folder_name: files.sub_folders.parent_folder,
          operator: files.sub_folders.subfolder,
          selected_headers: arr,
        };
        dispatch(append_headers(data));
        handleClose();
      }
    } else {
      toast.warning("Please select header!");
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
          parent_folder={parent_folder}
          sub_folders={sub_folders}
          operator_files={operator_files}
          headerCount={headerCount}
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
