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
        path: "",
      },
    },
    all_files: [],
    selected_files: [],
  },
  reducers: {
    folder: (state, action) => {
      const folder_state = current(state).created_folders;
      console.log(action.payload, "pay");
      const result1 =
        state.created_folders.length > 0
          ? folder_state.filter(function (o1) {
              return state.created_folders.some(function (o2) {
                return o1.folder_name == o2.folder_name; // id is unnique both array object
              });
            })
          : action.payload;
      // files.all_files.every((v) => allSelectedFiles.includes(v.file_path));

      return { ...state, created_folders: result1 };
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
  is_parent_checked,
  add_subfolder_name,
  all_files,
  selected_files,
  selected_all_files,
  add_parentfolder_name,
} = folderSlice.actions;
export default folderSlice.reducer;
