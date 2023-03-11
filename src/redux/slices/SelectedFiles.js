import { createSlice, current } from "@reduxjs/toolkit";

export const selectedFiles = createSlice({
  name: "Selected Files",
  initialState: { files: [], count: [], structure: {} },
  reducers: {
    selected_files: (state, action) => {
      const { array, type } = action.payload;
      let all_files = current(state).files;

      if (type === "particular") {
        if (all_files.indexOf(...array) === -1) {
          all_files = [...state.files, ...array];
        } else {
          let copy_state = [...all_files];
          copy_state.splice(all_files.indexOf(...array), 1);
          all_files = [...copy_state];
        }
      } else {
        let copy_arr = array.filter((e) => all_files.indexOf(e) < 0);
        all_files = [...state.files, ...copy_arr];
      }

      return {
        ...state,
        files: all_files,
      };
    },

    select_unselect_all: (state, action) => {
      const { payload } = action;
      let all_files = current(state).files;
      let data = [];

      if (payload.isCheck) {
        data = payload.arr?.filter((e) => !all_files?.includes(e));
      } else {
        data = all_files?.filter((el) => !payload.arr?.includes(el));
      }

      return {
        ...state,
        files: payload.isCheck ? [...state.files, ...data] : data,
      };
    },

    add_files_into_redux: (state, action) => {
      const { payload } = action;
      let structure = current(state).structure;
      let new_structure = { ...structure };
      let data = {};

      if (new_structure[payload.parent_folder_name]) {
        // if parent folder exists

        if (new_structure[payload.parent_folder_name][payload.operator]) {
          // if operator exists
          let file_path =
            new_structure[payload.parent_folder_name][payload.operator]["path"];

          if (!file_path.includes(payload.path)) {
            data[payload.parent_folder_name] = {
              ...new_structure[payload.parent_folder_name],
              [payload.operator]: {
                path: [
                  ...new_structure[payload.parent_folder_name][
                    payload.operator
                  ]["path"],
                  ...payload.path,
                ],
              },
            };
          }
        } else {
          data[payload.parent_folder_name] = {
            ...new_structure[payload.parent_folder_name],
            [payload.operator]: {
              path: [...payload.path],
            },
          };
        }
      } else {
        data[payload.parent_folder_name] = {
          [payload.operator]: {
            path: [...payload.path],
          },
        };
      }

      return {
        ...state,
        structure: { ...state.structure, ...data },
      };
    },

    remove_files_into_redux: (state, action) => {
      const { payload } = action;
      let structure = current(state).structure;
      let new_structure = { ...structure };
      let data = {};

      if (new_structure[payload.parent_folder_name]) {
        let [payload_path] = payload.path;
        let file_path =
          new_structure[payload.parent_folder_name][payload.operator]["path"];

        if (file_path?.includes(payload_path) && file_path.length > 1) {
          data[payload.parent_folder_name] = {
            ...new_structure[payload.parent_folder_name],
            [payload.operator]: {
              ...new_structure[payload.parent_folder_name][payload.operator],
              path: file_path?.filter((path) => path !== payload_path),
            },
          };
        } else if (
          Object.keys(new_structure[payload.parent_folder_name]).length > 1
        ) {
          // delete operator if it has 1 file but have multliple operator
          data[payload.parent_folder_name] = {
            ...new_structure[payload.parent_folder_name],
            [payload.operator]: undefined,
          };
        } else if (file_path?.length === 1) {
          // delete parent if 1 operator has 1 file
          data[payload.parent_folder_name] = undefined;
        }
      }

      return {
        ...state,
        structure: { ...state.structure, ...data },
      };
    },

    select_all_file: (state, action) => {
      const { payload } = action;
      let structure = current(state).structure;
      let new_structure = { ...structure };
      let data = [];

      data[payload.parent_folder_name] = {
        ...new_structure[payload.parent_folder_name],
        [payload.operator]: {
          path: payload.path,
        },
      };

      return {
        ...state,
        structure: { ...state.structure, ...data },
      };
    },

    select_all_parent_files: (state, action) => {
      const { all_files, parent_name, operator } = action.payload;
      let structure = current(state).structure;
      let new_structure = { ...structure };

      operator?.forEach((optr) => {
        if (new_structure[parent_name]) {
          new_structure[parent_name] = {
            ...new_structure[parent_name],
            [optr]: {
              path:
                all_files[optr] !== undefined
                  ? [...all_files[optr]["path"]]
                  : [],
            },
          };
        } else {
          new_structure[parent_name] = {
            ...new_structure[parent_name],
            [optr]: {
              path:
                all_files[optr] !== undefined ? all_files[optr]["path"] : [],
            },
          };
        }
      });

      return {
        ...state,
        structure: { ...state.structure, ...new_structure },
      };
    },

    unselect_all_file: (state, action) => {
      const { payload } = action;
      let structure = current(state).structure;
      let new_structure = { ...structure };

      if (new_structure[payload.parent_folder_name]) {
        new_structure[payload.parent_folder_name] = {
          ...new_structure[payload.parent_folder_name],
          [payload.operator]: undefined,
        };
      }

      return { ...state, structure: new_structure };
    },

    append_headers: (state, action) => {
      const { parent_folder_name, operator, selected_headers } = action.payload;
      let structure = current(state).structure;
      let new_structure = { ...structure };

      if (new_structure[parent_folder_name]) {
        new_structure[parent_folder_name] = {
          ...new_structure[parent_folder_name],
          [operator]: {
            ...new_structure[parent_folder_name][operator],
            headers: [...selected_headers],
          },
        };
      }

      return { ...state, structure: new_structure };
    },
  },
});

export const {
  selected_files,
  select_unselect_all,
  // counter,
  add_files_into_redux,
  select_all_parent_files,
  remove_files_into_redux,
  select_all_file,
  unselect_all_file,
  append_headers,
} = selectedFiles.actions;
export default selectedFiles.reducer;
