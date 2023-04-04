import { createSlice, current } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "Folder",
  initialState: {
    created_folders: [],
    sub_folders: {
      parent_folder: "",
      subfolder: "",
      folders: {
        name: [],
      },
    },
    all_files: [],
  },

  reducers: {
    folder: (state, action) => {
      const { new_data, take_action } = action.payload;
      const folder_state = current(state).created_folders;

      const a = folder_state;
      const b = new_data;

      const isChecked = (a, b) => a.isChecked !== b.isChecked;
      const isNonChecked = (a, b) => a.isChecked === b.isChecked;
      const createdFolder = (a, b) => a.folder_name === b.folder_name;

      const filterOutData = (left, right, compareFunction) =>
        left.filter((leftValue) =>
          right.some((rightValue) => compareFunction(leftValue, rightValue))
        );

      const filterOutData2 = (left, right, compareFunction) =>
        left.filter(
          (leftValue) =>
            !right.some((rightValue) => compareFunction(leftValue, rightValue))
        );

      const is_checked_arr = filterOutData(a, b, isChecked);
      const is_non_checked_arr = filterOutData(a, b, isNonChecked);

      const result = [...is_checked_arr, ...is_non_checked_arr];

      const created_new_folder =
        take_action === "create_folder"
          ? filterOutData2(b, result, createdFolder)
          : [];

      const final_result = [...created_new_folder, ...result];

      return {
        ...state,
        created_folders: folder_state.length === 0 ? new_data : final_result,
      };
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

    is_parent_checked: (state, action) => {
      const { index, checked } = action.payload;

      return {
        ...state,
        created_folders: checked
          ? state.created_folders.map((item, i) =>
              i === index ? { ...item, isChecked: true } : item
            )
          : state.created_folders.map((item, i) =>
              i === index ? { ...item, isChecked: false } : item
            ),
      };
    },

    uncheck_all_parent: (state, action) => {
      return {
        ...state,
        created_folders: state.created_folders.map((item, i) =>
          item.isChecked === true ? { ...item, isChecked: false } : item
        ),
      };
    },
  },
});

export const {
  folder,
  sub_folder,
  is_parent_checked,
  uncheck_all_parent,
  add_subfolder_name,
  all_files,
  selected_files,
  add_parentfolder_name,
} = folderSlice.actions;
export default folderSlice.reducer;
