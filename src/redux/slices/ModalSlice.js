import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "Modal",
  initialState: {
    modal_type: "",
    isFileProcessing: false,
  },

  reducers: {
    modalType: (state, action) => {
      return {
        ...state,
        modal_type: action.payload,
      };
    },

    fileProcess: (state, action) => {
      return {
        ...state,
        isFileProcessing: action.payload,
      };
    },
  },
});

export const { modalType, fileProcess } = modalSlice.actions;
export default modalSlice.reducer;
