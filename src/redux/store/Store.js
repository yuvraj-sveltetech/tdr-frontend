import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import folderReducer from "../slices/FolderSlice";
import headerSlice from "../slices/HeaderSlice";
import breadCrumbSlice from "../slices/BreadCrumbSlice";
import selectedFiles from "../slices/SelectedFiles";

export const store = configureStore({
  reducer: {
    folder: folderReducer,
    headers: headerSlice,
    show_count: breadCrumbSlice,
    selected_files: selectedFiles,
  },
  middleware: [thunk],
});
