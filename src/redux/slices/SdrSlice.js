import { createSlice } from "@reduxjs/toolkit";

export const sdrSlice = createSlice({
  name: "SDR",
  initialState: {
    isSdrLoad: false,
    tableId: "",
    tableName: "",
  },

  reducers: {
    isSdr: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        isSdrLoad: payload,
      };
    },
  },
});

export const { isSdr } = sdrSlice.actions;
export default sdrSlice.reducer;
