import { createSlice } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "Folder",
  initialState: {
    folders: [],
  },
  reducers: {
    addFolder: (state, action) => {
      return { ...state, folders: action.payload };
    },
  },
});

export default folderSlice;
