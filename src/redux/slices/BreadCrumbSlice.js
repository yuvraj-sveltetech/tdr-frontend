import { createSlice } from "@reduxjs/toolkit";

export const breadCrumbSlice = createSlice({
  name: "BreadCrumb",
  initialState: {
    show: 0,
    switch_component: "",
    active_btn: localStorage.getItem("active_btn") || "cdr",
    is_selected: "export-ist-numbers",
    is_sub_ipdr_option: "all",
    ipdr_communication_apps: {
      selected: "",
      list: [],
    },
    isProccesed: { isDisable: false, loading: false },
  },

  reducers: {
    setIpdrCommunicationList: (state, action) => {
      return {
        ...state,
        ipdr_communication_apps: { selected: "", list: action?.payload },
      };
    },

    setSelectedIpdrCommunication: (state, action) => {
      return {
        ...state,
        ipdr_communication_apps: {
          ...state.ipdr_communication_apps,
          selected: action?.payload,
        },
      };
    },

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
      const { value, is_sub_category_option } = action.payload;

      return {
        ...state,
        is_selected: is_sub_category_option ? state?.is_selected : value,
        is_sub_ipdr_option: is_sub_category_option
          ? value
          : state?.is_sub_ipdr_option,
      };
    },

    activeBtn: (state, action) => {
      return {
        ...state,
        active_btn: action.payload,
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
  is_selected,
  isProccesed,
  activeBtn,
  setIpdrCommunicationList,
  setSelectedIpdrCommunication,
} = breadCrumbSlice.actions;
export default breadCrumbSlice.reducer;
