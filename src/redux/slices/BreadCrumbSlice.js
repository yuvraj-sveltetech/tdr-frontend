import { createSlice } from "@reduxjs/toolkit";

export const breadCrumbSlice = createSlice({
  name: "BreadCrumb",
  initialState: {
    show: 0,
    switch_component: "",
    is_selected: "compare",
    isProccesed: { isDisable: false, loading: false },
    excel_data: { fileName: "", data: {} },
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
      const { result_name, result_data } = action.payload;
      return {
        ...state,
        excel_data: { fileName: result_name, data: result_data },
      };
    },

    is_selected: (state, action) => {
      return {
        ...state,
        is_selected: action.payload,
      };
    },

    isProccesed: (state, action) => {
      const { isDisable, loading } = action.payload;
      return {
        ...state,
        isProccesed: { ...state.isProccesed, isDisable, loading },
      };
    },
  },
});

export const {
  setShowCount,
  switchComponent,
  excelData,
  is_selected,
  isProccesed,
} = breadCrumbSlice.actions;
export default breadCrumbSlice.reducer;
