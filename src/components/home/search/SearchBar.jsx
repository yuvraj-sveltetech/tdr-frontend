import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ handleChange, mobileNumber, handleSubmit }) => {
  return (
    <form
      className="search-bar d-flex align-items-center justify-content-center"
      onSubmit={handleSubmit}
    >
      <input
        type="number"
        name="search"
        placeholder="Enter Mobile Number"
        value={mobileNumber}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button type="submit">
        <IoSearch color="#fff" />
      </button>
    </form>
  );
};

export default SearchBar;
