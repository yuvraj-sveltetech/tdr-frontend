import React from "react";
import { useSelector } from "react-redux";

const DirFiles = () => {
  const all_files = useSelector((state) => state.folder.all_files);
  console.log(all_files);
  return (
    <div className="all_files">
      {all_files?.map((file) => {
        return <li>{file}</li>;
      })}
    </div>
  );
};

export { DirFiles };
