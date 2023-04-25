import React from "react";
import { useSelector } from "react-redux";

const DataOnDom = () => {
  const excelData = useSelector((state) => state.show_count.excel_data);

  const tableHeaders = (
    <tr>
      {excelData.data?.length > 0 &&
        Object.keys(excelData.data[0])?.map((head, i) => (
          <th key={`head${head + i}`}>
            {head
              .replace(/_/g, " ")
              .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase()
              )}
          </th>
        ))}
    </tr>
  );

  const tableRows =
    excelData.data?.length > 0 &&
    excelData.data?.map((item, i) => (
      <tr key={`row${item + i}`}>
        {Object.values(item)?.map((inner_item, i) => (
          <td key={`row${inner_item + i}`}>{inner_item}</td>
        ))}
      </tr>
    ));

  return (
    <table className="table table-striped table-bordered table-sm">
      <thead>{tableHeaders}</thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export { DataOnDom };
