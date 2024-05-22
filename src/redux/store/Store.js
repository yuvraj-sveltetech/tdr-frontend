import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/es/storage/session";
import folderReducer from "../slices/FolderSlice";
import headerSlice from "../slices/HeaderSlice";
import breadCrumbSlice from "../slices/BreadCrumbSlice";
import selectedFiles from "../slices/SelectedFiles";
import sdrSlice from "../slices/SdrSlice";
import modalSlice from "../slices/ModalSlice";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  blacklist: ["modal", "headers", "show_count", "selected_files", "sdr"],
};

const rootReducer = combineReducers({
  folder: folderReducer,
  modal: modalSlice,
  headers: headerSlice,
  show_count: breadCrumbSlice,
  selected_files: selectedFiles,
  sdr: sdrSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true,
});

export const persistor = persistStore(store);
