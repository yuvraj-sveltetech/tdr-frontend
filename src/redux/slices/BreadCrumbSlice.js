import { createSlice } from "@reduxjs/toolkit";

export const breadCrumbSlice = createSlice({
  name: "BreadCrumb",
  initialState: {
    show: 0,
    switch_component: "",
    is_selected: "export-ist-numbers",
    isProccesed: { isDisable: false, loading: false },
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

export const { setShowCount, switchComponent, is_selected, isProccesed } =
  breadCrumbSlice.actions;
export default breadCrumbSlice.reducer;
