import React from "react";

const DataOnDom = ({ items }) => {
  const tableHeaders = (
    <tr>
      {items?.length > 0 &&
        Object.keys(items[0])?.map((head, i) => (
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
    items?.length > 0 &&
    items?.map((item, i) => (
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
