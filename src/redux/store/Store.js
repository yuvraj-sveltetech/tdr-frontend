import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import folderReducer from "../slices/FolderSlice";
import headerSlice from "../slices/HeaderSlice";

export const store = configureStore({
  reducer: {
    folder: folderReducer,
    headers: headerSlice,
  },
  middleware: [thunk],
});
