import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "Modal",
  initialState: {
    modal_type: "",
  },

  reducers: {
    modalType: (state, action) => {
      return {
        ...state,
        modal_type: action.payload,
      };
    },
  },
});

export const { modalType } = modalSlice.actions;
export default modalSlice.reducer;
