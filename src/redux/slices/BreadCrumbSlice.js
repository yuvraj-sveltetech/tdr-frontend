import { createSlice } from "@reduxjs/toolkit";

export const breadCrumbSlice = createSlice({
  name: "BreadCrumb",
  initialState: {
    show: 0,
    switch_component: "",
    excel_data: {},
  },
  reducers: {
    setShowCount: (state, action) => {
      return {
        ...state,
        show: action.payload,
      };
    },

    switchComponent: (state, action) => {
      return {
        ...state,
        switch_component: action.payload,
      };
    },

    excelData: (state, action) => {
      return {
        ...state,
        excel_data: action.payload,
      };
    },
  },
});

export const { setShowCount, switchComponent, excelData } = breadCrumbSlice.actions;
export default breadCrumbSlice.reducer;
