import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import folderReducer from "../slices/FolderSlice";

export const store = configureStore({
  reducer: {
    folder: folderReducer,
  },
  middleware: [thunk],
});
