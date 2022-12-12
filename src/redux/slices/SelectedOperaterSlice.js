import { createSlice, current } from "@reduxjs/toolkit";

export const selectedOperatorSlice = createSlice({
  name: "Operator",
  initialState: {
    files: {},
    selected_data: {},
    folderOperatorRelation: {},
  },

  reducers: {
    select_operator_files: (state, action) => {
      let files = current(state).files;
      const { parent_folder_name, type, count, file_data } = action.payload;

      let folderOperatorRelation = current(state).folderOperatorRelation;
      let folderName = folderOperatorRelation[parent_folder_name + type];
      let tempMap = { ...folderOperatorRelation };
      let data = { ...files };
      if (!folderName) {
        tempMap[parent_folder_name + type] = "folder" + count;
        data["folder" + count] = {
          file_name: file_data.file_name,
          file_path: [file_data.file_path],
          parent_folder_name: parent_folder_name,
          operator: type,
        };
      } else {
        const isAlreadyExistIndex = data[folderName].file_path.indexOf(
          file_data.file_path
        );

        if (isAlreadyExistIndex !== -1) {
          let tempData = { ...data[folderName] };
          let tempArray = [...tempData.file_path];
          tempArray.splice(isAlreadyExistIndex, 1);
          tempData.file_path = tempArray;
          data[folderName] = tempData;
          if (tempArray.length === 0) {
            delete data[folderName];
            delete tempMap[parent_folder_name + type];
          }
        } else {
          data[folderName] = {
            ...data[folderName],
            file_path: [...data[folderName].file_path, file_data.file_path],
          };
        }
      }

      return {
        ...state,
        files: data,
        folderOperatorRelation: tempMap,
      };
    },

    all_operator_wise_files: (state, action) => {
      let files = current(state).files;
      const { parent_folder_name, type, count, file_data, isChecked } =
        action.payload;

      let folderOperatorRelation = current(state).folderOperatorRelation;
      let folderName = folderOperatorRelation[parent_folder_name + type];
      let tempMap = { ...folderOperatorRelation };
      let data = { ...files };
      if (!folderName) {
        tempMap[parent_folder_name + type] = "folder" + count;
        data["folder" + count] = {
          file_name: "file_data.file_name",
          file_path: file_data,
          parent_folder_name: parent_folder_name,
          operator: type,
        };
      } else if (folderName && isChecked) {
        data[folderName] = {
          ...data[folderName],
          file_path: file_data,
        };
      } else {
        delete data[folderName];
        delete tempMap[parent_folder_name + type];
      }

      return {
        ...state,
        files: data,
        folderOperatorRelation: tempMap,
      };
    },

    add_selected_headers: (state, action) => {
      const { parent_folder_name, subfolder_name, selected_headers } =
        action.payload;
      let files = current(state).files;
      let folderOperatorRelation = current(state).folderOperatorRelation;
      let folderName =
        folderOperatorRelation[parent_folder_name + subfolder_name];
      let tempMap = { ...folderOperatorRelation };
      let data = { ...files };

      if (folderName) {
        let new_data = {};
        for (let key in selected_headers) {
          new_data[Object.keys(selected_headers[key])[1]] = Object.values(
            selected_headers[key]
          )[1];
        }

        data[folderName] = {
          ...data[folderName],
          ...new_data,
        };
      }

      return { ...state, files: data, folderOperatorRelation: tempMap };
    },
  },
});

export const {
  select_operator_files,
  all_operator_wise_files,
  add_selected_headers,
} = selectedOperatorSlice.actions;
export default selectedOperatorSlice.reducer;
