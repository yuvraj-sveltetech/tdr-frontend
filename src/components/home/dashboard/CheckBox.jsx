import React, { useEffect } from "react";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { folder } from "../../../redux/slices/FolderSlice";
import { RxCross2 } from "react-icons/rx";
import useApiHandle from "../../utils/useApiHandle";
import * as URL from "../../utils/ConstantUrl";

const CheckBox = ({ file, index }) => {
  const { data, apiCall, status_code } = useApiHandle();

  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    if (status_code === 200 && data?.data?.length > 0) {
      let mdata=data?.data.map((items)=>({...items,id:String(items.id)}))
      dispatch(folder({ take_action: "create_subfolder", data: mdata }));
    }

    if (data?.message === "Deleted successfully") { 
      getData();
    }
  }, [status_code, data]);

  const getData = async () => {
    apiCall("get", `${URL.FOLDER_API}?project_id=${params?.parent_folder}`, {});
  };

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

  const deleteFile = (id) => {
    apiCall("delete", `${URL.DELETE}?type=file_id&file_id=${id}`, {});
  };

  return (
    <>
      <div className="dot" onClick={() => deleteFile(file.id)}>
        <RxCross2 size={13} />
      </div>
      <label
        className="subfolder-box box d-flex justify-content-between align-items-center mb-3"
        htmlFor={file?.name}
      >
        <BsFillFileEarmarkTextFill className="file_icon" size={20} />
        <p
          className="ellipsis"
          data-toggle="tooltip"
          data-placement="top"
          title={file?.name}
        >
          {file?.name}
        </p>
        <input
          type="checkbox"
          id={file?.name}
          value={file?.name}
          onChange={(e) => selectedFileHandle(e, file)}
          checked={file?.isChecked}
        />
      </label>
    </>
  );
};

export default CheckBox;
