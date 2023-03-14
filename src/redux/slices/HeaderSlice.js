import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
  name: "Headers",
  initialState: {
    all_headers: [],
  },

  reducers: {
    all_headers: (state, action) => {
      return {
        ...state,
        all_headers: [action.payload],
      };
    },
  },
});

export const { all_headers } = headerSlice.actions;
export default headerSlice.reducer;
