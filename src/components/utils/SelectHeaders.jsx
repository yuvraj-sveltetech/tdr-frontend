import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selected_headers } from "../../redux/slices/HeaderSlice";

const SelectHeaders = () => {
  const headers = useSelector((state) => state.headers);
  const dispatch = useDispatch();

  const headerSelected = (headerKey) => {
    dispatch(selected_headers(headerKey));
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {headers?.all_headers.length > 0 &&
              Object.keys(headers?.all_headers[0]).map((keys, i) => (
                <th scope="col" key={`tableHead${i}`}>
                  <label htmlFor={keys}>{keys}</label>
                  <input
                    type="checkbox"
                    value={keys}
                    id={keys}
                    className="ms-1"
                    onChange={(e) => headerSelected(keys)}
                  />
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
