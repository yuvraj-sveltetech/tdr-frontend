import { createSlice } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "Folder",
  initialState: {
    created_folders: [],
  },
  reducers: {
    folder: (state, action) => {
      return { ...state, created_folders: action.payload };
    },
  },
});

export const { folder } = folderSlice.actions;
export default folderSlice.reducer;
