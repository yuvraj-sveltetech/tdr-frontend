import { configureStore } from "@reduxjs/toolkit";
import folder_slice from "../slices/FolderSlice";

export const store = configureStore({
  reducer: {
    addFolder: folder_slice.reducer,
  },
});
