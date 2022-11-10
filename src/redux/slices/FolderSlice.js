import { createSlice, current } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "Folder",
  initialState: {
    created_folders: [],
    sub_folders: {
      parent_folder: "",
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

    all_files: (state, action) => {
      return { ...state, all_files: action.payload };
    },

    selected_files: (state, action) => {
      let file_name = "";
      state.selected_files.forEach((file) => {
        if (action.payload.file_name === file.file_name) {
          file_name = action.payload.file_name;
        }
      });

      return {
        ...state,
        selected_files:
          state.selected_files.length !== 0 && file_name !== ""
            ? state.selected_files.filter(
                (file) => file.file_name !== action.payload.file_name
              )
            : [...state.selected_files, action.payload],
      };
    },

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
  all_files,
  selected_files,
  selected_all_files,
} = folderSlice.actions;
export default folderSlice.reducer;
