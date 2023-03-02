import { createSlice, current } from "@reduxjs/toolkit";

export const selectedFiles = createSlice({
  name: "Selected Files",
  initialState: { files: [], count: [], structure: {} },
  reducers: {
    selected_files: (state, action) => {
      const { array, type } = action.payload;
      console.log(array, "payload");
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

    counter: (state, action) => {
      const { name, type } = action.payload;
      let counter = current(state).count;
      console.log(action.payload, "conut");

      if (type === "add") {
        counter = !state.count.includes(name)
          ? [...state.count, name]
          : state.count;
      } else {
        console.log(name);
        counter = state.count?.filter((item) => item !== name);
        console.log(counter, "oo");
      }

      return {
        ...state,
        // count: !state.count.includes(payload)
        //   ? [...state.count, payload]
        //   : state.count,
        count: counter,
      };
    },

    add_files_into_redux: (state, action) => {
      const { payload } = action;
      let counter = current(state).count;
      let structure = current(state).structure;
      let index;
      let data = [];

      if (
        counter.includes(payload.parent_folder_name + "-" + payload.operator)
      ) {
        index = counter.indexOf(
          payload.parent_folder_name + "-" + payload.operator
        );
      }

      if (structure["folder" + index]) {
        let file_path = structure["folder" + index]["path"];
        if (!file_path.includes(payload.path)) {
          data["folder" + index] = {
            parent_folder_name: payload.parent_folder_name,
            operator: payload.operator,
            path: [...structure["folder" + index]["path"], ...payload.path],
          };
        }
      } else {
        data["folder" + index] = payload;
      }

      return {
        ...state,
        structure: { ...state.structure, ...data },
      };
    },

    remove_files_into_redux: (state, action) => {
      const { payload } = action;
      let counter = current(state).count;
      let structure = current(state).structure;
      let newStructure = { ...structure };
      let index;
      let data = {};

      if (
        counter.includes(payload.parent_folder_name + "-" + payload.operator)
      ) {
        index = counter.indexOf(
          payload.parent_folder_name + "-" + payload.operator
        );
      }

      if (newStructure["folder" + index]) {
        let file_path = newStructure["folder" + index]["path"];
        let [payload_path] = payload.path;

        if (file_path.includes(payload_path) && file_path.length > 1) {
          data["folder" + index] = {
            parent_folder_name: payload.parent_folder_name,
            operator: payload.operator,
            path: file_path.filter((path) => path !== payload_path),
          };
        } else if (file_path.length === 1) {
          data = {};
          delete newStructure["folder" + index];
        }
      }

      return {
        ...state,
        structure:
          Object.keys(data).length > 0
            ? { ...state.structure, ...data }
            : newStructure,
      };
    },

    select_all_file: (state, action) => {
      const { payload } = action;
      let count_state = current(state).count;
      let structure = current(state).structure;
      let index;
      let data = [];

      index = count_state.indexOf(
        payload.parent_folder_name + "-" + payload.operator
      );

      if (structure["folder" + index]) {
        data["folder" + index] = {
          parent_folder_name: payload.parent_folder_name,
          operator: payload.operator,
          path: payload.path,
        };
      } else {
        data["folder" + index] = payload;
      }

      return {
        ...state,
        structure: { ...state.structure, ...data },
      };
    },

    select_all_parent_files: (state, action) => {
      const { all_files, parent_name, operator } = action.payload;
      let count_state = current(state).count;
      let structure = current(state).structure;
      let index;
      let data = [];

      index = count_state.indexOf(parent_name + "-" + operator);

      if (structure["folder" + index]) {
        data["folder" + index] = {
          parent_folder_name: parent_name,
          operator: operator,
          path:
            all_files[operator] !== undefined
              ? [
                  // ...structure["folder" + index]["path"],
                  ...all_files[operator]["path"],
                ]
              : [],
        };
      } else {
        data["folder" + index] = {
          parent_folder_name: parent_name,
          operator: operator,
          path:
            all_files[operator] !== undefined
              ? all_files[operator]["path"]
              : [],
        };
      }

      return {
        ...state,
        structure: { ...state.structure, ...data },
      };
    },

    unselect_all_file: (state, action) => {
      const { payload } = action;
      let counter = current(state).count;
      let structure = current(state).structure;
      let newStructure = { ...structure };
      let index;

      if (
        counter.includes(payload.parent_folder_name + "-" + payload.operator)
      ) {
        index = counter.indexOf(
          payload.parent_folder_name + "-" + payload.operator
        );
      }

      if (newStructure["folder" + index]) {
        delete newStructure["folder" + index];
      }

      return { ...state, structure: newStructure };
    },

    append_headers: (state, action) => {
      const { parent_folder_name, operator, selected_headers } = action.payload;
      let counter = current(state).count;
      let structure = current(state).structure;
      let newStructure = { ...structure };
      let index;

      if (counter.includes(parent_folder_name + "-" + operator)) {
        index = counter.indexOf(parent_folder_name + "-" + operator);
      }

      if (newStructure["folder" + index]) {
        newStructure["folder" + index] = {
          ...newStructure["folder" + index],
          headers: [...selected_headers],
        };
      }

      return { ...state, structure: newStructure };
    },
  },
});

export const {
  selected_files,
  select_unselect_all,
  counter,
  add_files_into_redux,
  select_all_parent_files,
  remove_files_into_redux,
  select_all_file,
  unselect_all_file,
  append_headers,
} = selectedFiles.actions;
export default selectedFiles.reducer;
