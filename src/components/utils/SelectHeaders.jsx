import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selected_headers } from "../../redux/slices/HeaderSlice";
import { add_selected_headers } from "../../redux/slices/SelectedOperaterSlice";

const SelectHeaders = () => {
  const [staticOptions, setStaticOptions] = useState([
    { "SOURCE IP": "", isDisabled: false },
    { "SOURCE IP ADDRESS": "", isDisabled: false },
    { "SOURCE PORT": "", isDisabled: false },
    { "DESTINATION IP": "", isDisabled: false },
    { "DESTINATION PORT": "", isDisabled: false },
  ]);

  const [hasValue, setHasValue] = useState([]);

  const headers = useSelector((state) => state.headers);
  const files = useSelector((state) => state.folder.sub_folders);
  const dispatch = useDispatch();

  const headerSelected = (headerKey) => {
    dispatch(selected_headers(headerKey));
  };

  // let staticOptions = [
  //   
  // ];

  const handleChange = (e, i, keys) => {
    const { value } = e.target;
    let index = e.target.selectedOptions[0].getAttribute("id");
    console.log(i);
    // if(staticOptions)
    let checkNewState = hasValue?.map((data) => {
      if (data.id === i) {
        return { ...data, item: value };
      }
      return { id: i, item: value };
    });
    setHasValue(checkNewState);
    // let hasValue = staticOptions.filter((item) => {
    //   // return item[value] == keys;
    //   return console.log(item["SOURCE PORT"], "ooo");
    // });
    console.log(hasValue, "lllll", checkNewState);
    let existValue = "";
    let newState = staticOptions.map((obj, i) => { 
      //   // console.log(obj[value], "-----------");
      //   //  console.log(Object.keys(obj));
      //   // console.log(Object.entries(obj));
      //   for (let option in obj) {
      //     if (obj[option] == keys) {
      //       console.log(option, "---ccccc-", typeof option);
      //       // existValue = option;
      //       console.log(obj[option],'lll')
      //       obj[option] = "";
      //       obj.isDisabled = false;
      //       console.log("exist value is ", existValue);
      //     }

      //     // else {
      //     //   setExistValue("");
      //     // }
      //     // }
      //     console.log(existValue, "oppppppppppp");
      //     // console.log(obj, "0-----------");
      //     // if (existValue) {
      //     //   return { ...obj, [existValue]: "", isDisabled: false };
      //   }
      //   Object.values(obj).fill("");
      // obj.isDisabled = false;

      if (i == index) {
        return { [value]: keys, isDisabled: true };
      }

      return obj;
    });

    setStaticOptions( );
  };
  let isAllOptionsSelected = Object.values(staticOptions).every(
    (value) => value !== ""
  );
  console.log(staticOptions, "---", hasValue);
  // staticOptions.map((a) => console.log(Object.keys(a), "op"));
  // staticOptions.forEach((c) => {
  //   console.log(c["SOURCE PORT"],'oiiiiiiiiiii')
  // })

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {headers?.all_headers?.length > 0 &&
              Object.keys(headers?.all_headers[0]).map((keys, i) => (
                <th scope="col" key={`tableHead${i}`}>
                  <label htmlFor={keys}>{keys}</label>
                  {/* <input
                    type="checkbox"
                    value={keys}
                    id={keys}
                    className="ms-1"
                    onChange={(e) => headerSelected(keys)}
                  /> */}
                  <select
                    name=""
                    id=""
                    onChange={(e) => handleChange(e, i, keys)}
                    // disabled={
                    //   isAllOptionsSelected &&
                    //   Object.values(staticOptions).every(
                    //     (value) => value === keys
                    //   )
                    //     ? true
                    //     : false
                    // }
                    // disabled={
                    //   staticOptions[0]['SOURCE IP'] != keys ? true : false
                    // }
                  >
                    {/* {console.log(
                      staticOptions[0]["SOURCE IP"],
                      "poooooooooooo"
                    )} */}
                    <option value="select" selected>
                      Select
                    </option>
                    {staticOptions?.map((item, innerIndex) => (
                      <option
                        value={Object.keys(item)[0]}
                        // disabled={
                        //   Object.values(item)[0] != keys &&
                        //   Object.values(item)[1]
                        //     ? true
                        //     : false
                        // }
                        id={innerIndex}
                        key={`headersInOptions${innerIndex}`}
                      >
                        {/* {console.log(Object.values(item)[0])} */}
                        {Object.keys(item)[0]}
                      </option>
                    ))}
                    {/* <option value="d">dddd</option> */}
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
