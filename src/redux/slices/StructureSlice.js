import { createSlice } from "@reduxjs/toolkit";

export const structureSlice = createSlice({
  name: "Structure",
  initialState: {
    selected_data: [],
  },
  reducers: {
    selected_data: (state, action) => {
      return {
        ...state,
        all_headers: [action.payload],
      };
    },
  },
});

export const { selected_data } = structureSlice.actions;
export default structureSlice.reducer;
