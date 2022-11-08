import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const SelectHeaders = () => {
  const headers = useSelector((state) => state.headers);
  const [headersKey, setHedersKey] = useState([]);

  useEffect(() => {
    if (headers?.all_headers?.length > 0) {
      setHedersKey(Object.keys(headers.all_headers[0]));
      // setHedersValue(Object.values(headers.all_headers));
      // setHead([headers.all_headers]);
    }
  }, [headers.all_headers]);

  console.log(headers, "oo");

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            {headersKey.map((head) => (
              <th scope="col">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {headers?.all_headers[0]?.map((dt, i) => {
            return (
              <tr key={`searchedData${i}`}>
                {headersKey?.map((header, i) => (
                  <td
                    style={{
                      backgroundColor: "lightgray",
                      textAlign: "center",
                    }}
                    key={`searchedDataHeaders${i}`}
                  >
                    {dt[header]}
                  </td>
                ))}
              </tr>
            );
          })} */}

          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export { SelectHeaders };
