import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import folderReducer from "../slices/FolderSlice";
import headerSlice from "../slices/HeaderSlice";
import selectedOperatorSlice from "../slices/SelectedOperaterSlice";
import selectedData from "../slices/StructureSlice";
import breadCrumbSlice from "../slices/BreadCrumbSlice";

export const store = configureStore({
  reducer: {
    folder: folderReducer,
    headers: headerSlice,
    operator_files: selectedOperatorSlice,
    selected_data: selectedData,
    show_count: breadCrumbSlice,
  },
  middleware: [thunk],
});
