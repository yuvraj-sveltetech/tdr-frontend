import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SelectHeaders = ({ hasValue, setHasValue }) => {
  const headers = useSelector((state) => state.headers);
  let staticOptions = [
    "SOURCE IP",
    "SOURCE IP ADDRESS",
    "SOURCE PORT",
    "DESTINATION IP",
    "DESTINATION PORT",
  ];

  useEffect(() => {
    return () => {
      hasValue.clear();
    };
  }, []);

  const handleChange = (e, i, keys) => {
    const { value } = e.target;

    let data = new Map(hasValue);
    data.set(i, { id: i, [value]: keys });

    for (const x of data.entries()) {
      if (Object.keys(x[1])[1] === "default") {
        data.delete(Object.values(x[1])[0]);
      }
    }

    setHasValue(data);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {headers?.all_headers?.length > 0 &&
              Object.keys(headers?.all_headers[0]).map((keys, i) => (
                <th scope="col" key={`tableHead${i}`}>
                  <label htmlFor={keys}>{keys}</label>
                  <select
                    name="staticValues"
                    onChange={(e) => handleChange(e, i, keys)}
                    defaultValue="default"
                  >
                    <option value="default">Select</option>
                    {staticOptions?.map((item, innerIndex) => (
                      <option
                        value={item}
                        id={innerIndex}
                        key={`headersInOptions${innerIndex}`}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {headers?.all_headers.length > 0 &&
            Object.entries(headers?.all_headers[0]).map(
              (header, i) =>
                i < header[1]?.length && (
                  <tr key={`tableRow${i}`}>
                    {Object.values(headers?.all_headers[0]).map(
                      (value, innerIndex) => (
                        <td key={`tableData${innerIndex}`}>{value[i]}</td>
                      )
                    )}
                  </tr>
                )
            )}
        </tbody>
      </table>
    </div>
  );
};

export { SelectHeaders };
