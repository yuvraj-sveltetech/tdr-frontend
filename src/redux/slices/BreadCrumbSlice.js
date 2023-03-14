import { createSlice } from "@reduxjs/toolkit";

export const breadCrumbSlice = createSlice({
  name: "BreadCrumb",
  initialState: {
    show: 0,
  },
  reducers: {
    setShowCount: (state, action) => {
      return {
        ...state,
        show: action.payload,
      };
    },
  },
});

export const { setShowCount } = breadCrumbSlice.actions;
export default breadCrumbSlice.reducer;
 