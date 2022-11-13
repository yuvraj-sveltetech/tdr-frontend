import { createSlice } from "@reduxjs/toolkit";

export const selectedOperatorSlice = createSlice({
  name: "Operators",
  initialState: {
    airtel: [],
    jio: [],
    bsnl: [],
    voda: [],
  },

  reducers: {
    select_operator_files: (state, action) => {
      let file_path = state[action.payload?.type].some(
        (file) => file.file_path === action.payload?.file_data.file_path
      );

      return {
        ...state,
        [action.payload?.type]:
          state[action.payload?.type].length !== 0 && file_path
            ? state[action.payload?.type].filter(
                (file) => file.file_path !== action.payload?.file_data.file_path
              )
            : [
                ...state[action.payload?.type],
                {
                  file_name: action.payload?.file_data.file_name,
                  file_path: action.payload?.file_data.file_path,
                  operator: action.payload?.file_data.subfolder_name,
                },
              ],
      };
    },

    all_operator_wise_files: (state, action) => {
      return {
        ...state,
        [action.payload.operator]: [...action.payload.files],
      };
    },
  },
});

export const { select_operator_files, all_operator_wise_files } =
  selectedOperatorSlice.actions;
export default selectedOperatorSlice.reducer;
