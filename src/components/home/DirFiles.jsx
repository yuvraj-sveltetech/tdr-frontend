import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPath } from "../../redux/slices/FolderSlice";

const DirFiles = () => {
  const dispatch = useDispatch();
  const all_files = useSelector((state) => state.folder.all_files);
  const get_path = useSelector((state) => state.folder.getPath);
  console.log(get_path);
  const handleChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      dispatch(getPath([...get_path, value]));
    } else {
      let temp = [...get_path];
      temp.splice(temp.indexOf(value), 1);
      dispatch(getPath(temp));
    }
  };
  return (
    <div className="all_files">
      {all_files?.map((file, index) => {
        return (
          <div key={index}>
            <ul className="d-flex list-unstyled">
              <input
                type="checkbox"
                value={file}
                onChange={(e) => handleChange(e)}
              />
              <li className="">{file}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export { DirFiles };
