import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
  name: "headers_from_api",
  initialState: {
    all_headers: [],
    selected_headers: [],
  },
  reducers: {
    all_headers: (state, action) => {
      return {
        ...state,
        all_headers: [action.payload],
      };
    },
    selected_headers: (state, action) => {
      return {
        ...state,
        selected_headers: [...state.selected_headers, action.payload],
      };
    },
  },
});

export const { all_headers, selected_headers } = headerSlice.actions;
export default headerSlice.reducer;
