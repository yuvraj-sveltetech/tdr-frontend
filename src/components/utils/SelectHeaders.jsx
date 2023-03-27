import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const SelectHeaders = ({
  hasValue,
  setHasValue,
  parent_folder,
  sub_folders,
  headerCount,
}) => {
  const [selectedHeaders, setSelectedHeaders] = useState(new Map());
  const [previousHeader, setPreviousHeader] = useState();
  const redux_store = useSelector((state) => state.selected_files);
  const headers = useSelector((state) => state.headers);
  const staticOptions = [
    // "MSISDN",
    // "IMEI",
    // "IMSI",
    "SESSION START TIME",
    "SESSION END TIME",
    // "DURATION",
    // "CELL ID",
    // "TRANSLATED IP",
    // "TRANSLATED PORT",
    // "DESTINATION IP",
    // "DESTINATION PORT",
  ];

  useEffect(() => {
    headerCount.current = staticOptions.length;
    return () => {
      hasValue.clear();
    };
  }, []);

  useEffect(() => {
    if (
      redux_store.structure[parent_folder] &&
      redux_store.structure[parent_folder][sub_folders] &&
      redux_store.structure[parent_folder][sub_folders]["headers"]
    ) {
      setPreviousHeader(
        redux_store.structure[parent_folder][sub_folders]["headers"]
      );
      redux_store.structure[parent_folder][sub_folders]["headers"]?.forEach(
        (header) => {
          hasValue.set(header.id, header);
        }
      );
    }
  }, [parent_folder, sub_folders]);

  useEffect(() => {
    if (previousHeader) {
      Object.entries(previousHeader).forEach((header) => {
        setSelectedHeaders(
          new Map(
            selectedHeaders.set(
              Object.values(header[1])[0],
              Object.keys(header[1])[1]
            )
          )
        );
      });
    }
  }, [previousHeader]);

  const handleChange = (e, i, keys) => {
    const { value } = e.target;

    let data = new Map(hasValue);
    data.set(i, { id: i, [value]: keys });

    for (const x of data.entries()) {
      if (Object.keys(x[1])[1] === "default") {
        data.delete(Object.values(x[1])[0]);
      }
    }

    selectedHeaders.set(i, value);
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
                    value={selectedHeaders.get(i)}
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
