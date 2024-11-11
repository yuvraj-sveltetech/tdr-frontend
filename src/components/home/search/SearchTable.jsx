import React from "react";

const SearchTable = ({ data }) => {
  const extractFileName = (url) => {
    if (url?.length > 0) {
      console.log(url);
      const arr = url?.split("/");
      return arr[arr.length - 1];
    }
  };

  return (
    <div style={{ height: "78vh", overflow: "auto" }}>
      <table className="table">
        <thead
          style={{ position: "sticky", top: "0", backgroundColor: "#fff" }}
        >
          <tr>
            <th scope="col">#</th>
            <th scope="col">File Name</th>
            <th scope="col">Date & Time</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, i) => (
            <tr key={item?.file_id}>
              <th scope="row">{i + 1}</th>
              <td>{extractFileName(item?.file_name)}</td>
              <td>
                {item?.time?.split("T")?.[0] +
                  " | " +
                  item?.time?.split("T")?.[1]}
              </td>
              <td>{item?.project + " / " + item?.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchTable;
