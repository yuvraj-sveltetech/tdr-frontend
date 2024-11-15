import React, { useEffect, useState } from "react";
import { SEARCH_NUMBER } from "../../utils/ConstantUrl";
import { isNumberFound } from "../../../redux/slices/SdrSlice";
import { useDispatch } from "react-redux";

const Search = ({ getData }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let handler;
    if (getData && inputValue?.length > 0) {
      handler = setTimeout(() => {
        getData(SEARCH_NUMBER, inputValue);
      }, 1000);
      dispatch(isNumberFound({ data: false, type: "isSearchEmpty" }));
    } else if (inputValue === "") {
      dispatch(isNumberFound({ data: true, type: "isSearchEmpty" }));
      getData();
    }

    return () => clearTimeout(handler);
  }, [inputValue]);

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <input
      type="text"
      className="file-search form-select-sm"
      placeholder="Enter mobile numbers separated by commas"
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default Search;
