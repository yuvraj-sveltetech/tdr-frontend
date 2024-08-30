import React, { useEffect } from "react";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { folder } from "../../../redux/slices/FolderSlice";
import { RxCross2 } from "react-icons/rx";
import useApiHandle from "../../utils/useApiHandle";
import * as URL from "../../utils/ConstantUrl";

const CheckBox = ({ file }) => {
  const { data, apiCall, status_code } = useApiHandle();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (status_code === 200 && data?.length !== undefined) {
      dispatch(
        folder({
          take_action: "add_files",
          data: { api_data: data, params },
        })
      );
      return;
    }
  
    if (data?.message === "Deleted successfully") {
      getData();
    }
  }, [status_code, data]);

  const selectedFileHandle = (e, file) => {
    const { checked } = e.target;
    dispatch(
      folder({
        take_action: "file_checkbox",
        data: { ...file, ...params, checked },
      })
    );

    if (!checked) {
      dispatch(
        folder({
          take_action: "select_only_subfolder",
          data: {
            checked,
            ...params,
          },
        })
      );
    }
  };

  const getData = async () => {
    apiCall(
      "get",
      `${URL.ALL_FILES}?project_id=${params?.parent_folder}&location_id=${params?.subfolder}`,
      {}
    );
  };

  const deleteFile = (id) => {
    apiCall("delete", `${URL.ALL_FILES}?file_id=${id}`, {});
  };

  return (
    <>
      <div className="dot" onClick={() => deleteFile(file.id)}>
        <RxCross2 size={13} />
      </div>

      <label
        className="subfolder-box box d-flex justify-content-between align-items-center mb-3"
        htmlFor={file?.file_name}
      >
        <BsFillFileEarmarkTextFill className="file_icon" size={20} />
        <p
          className="ellipsis"
          data-toggle="tooltip"
          data-placement="top"
          title={file?.file_name}
        >
          {file?.file_name}
        </p>
        <input
          type="checkbox"
          disabled
          id={file?.file_name}
          value={file?.file_name}
          onChange={(e) => selectedFileHandle(e, file)}
          checked={file?.isChecked}
        />
      </label>
    </>
  );
};

export default CheckBox;
