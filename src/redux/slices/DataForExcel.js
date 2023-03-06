import { createSlice } from "@reduxjs/toolkit";

export const dataForExcel = createSlice({
  name: "Data For Excel",
  initialState: {
    data: [],
  },
  reducers: {
    setExcelData: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        data: payload,
      };
    },
  },
});

export const { setExcelData } = dataForExcel.actions;
export default dataForExcel.reducer;
