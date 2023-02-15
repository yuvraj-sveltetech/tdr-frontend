import { createSlice } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "Folder",
  initialState: {
    created_folders: [],
    sub_folders: {
      parent_folder: "",
      subfolder: "",
      folders: {
        name: [],
        path: "",
      },
    },
    all_files: [],
    selected_files: [],
  },
  reducers: {
    folder: (state, action) => {
      return { ...state, created_folders: action.payload };
    },

    sub_folder: (state, action) => {
      return {
        ...state,
        sub_folders: {
          ...state.sub_folders,
          parent_folder: action.payload.parent_path,
          folders: {
            ...state.sub_folders.folders,
            name: action.payload.subfolders,
          },
        },
      };
    },

    add_subfolder_name: (state, action) => {
      return {
        ...state,
        sub_folders: {
          ...state.sub_folders,
          subfolder: action.payload,
        },
      };
    },

    add_parentfolder_name: (state, action) => {
      return {
        ...state,
        sub_folders: {
          ...state.sub_folders,
          parent_folder: action.payload,
        },
      };
    },

    all_files: (state, action) => {
      return { ...state, all_files: action.payload };
    },

    // selected_files: (state, action) => {
    //   let file_path = state.selected_files.some(
    //     (file) => file.file_path === action.payload.file_path
    //   );

    //   return {
    //     ...state,
    //     selected_files:
    //       state.selected_files.length !== 0 && file_path
    //         ? state.selected_files.filter(
    //             (file) => file.file_path !== action.payload.file_path
    //           )
    //         : [...state.selected_files, action.payload],
    //   };
    // },

    selected_all_files: (state, action) => {
      return {
        ...state,
        selected_files: action?.payload?.isChecked
          ? [...state.selected_files, ...action.payload?.arr]
          : action.payload?.arr,
      };
    },
  },
});

export const {
  folder,
  sub_folder,
  add_subfolder_name,
  all_files,
  selected_files,
  selected_all_files,
  add_parentfolder_name,
} = folderSlice.actions;
export default folderSlice.reducer;
