import { createSlice, current,  } from "@reduxjs/toolkit";

export const structureSlice = createSlice({
  name: "Structure",
  initialState: {
    selected_data: {},
    folderOperatorRelation: {},
  },
  reducers: {
    selected_data: (state, action) => {
      let selected_data = current(state).selected_data;
      let kkk =current(state);
      console.log(kkk,'op-00000000000000000')
      const { parent_folder_name, type, count, file_data } = action.payload;

      let folderOperatorRelation = current(state).folderOperatorRelation;
      let folderName = folderOperatorRelation[parent_folder_name + type];
      let tempMap = { ...folderOperatorRelation };
      let data = { ...selected_data };
      if (!folderName) {
        tempMap[parent_folder_name + type] = "folder" + count;
        data["folder" + count] = {
          // file_name: file_data.file_name,
          // file_path: [file_data.file_path],
          parent_folder_name: parent_folder_name,
          operator: type,
        };
      }

      // let data = {};

      // let exists = Object.keys(add_data).some((d) => {
      //   return (
      //     add_data[d]?.name === action.payload?.file_data.parent_folder_name &&
      //     add_data[d]?.operator === action.payload?.file_data.subfolder_name
      //   );
      // });

      // if (!exists) {
      //   data = {
      //     ["folder" + action.payload?.count]: {
      //       name: action.payload?.file_data.parent_folder_name,
      //       operator: action.payload?.file_data.subfolder_name,
      //     },
      //   };
      // }

      return {
        ...state,
        // selected_data: {
        //   ...state.selected_data,
        //   ...data,
        // },

        selected_data: data,
        folderOperatorRelation: tempMap,
      };
    },
  },
});

export const { selected_data } = structureSlice.actions;
export default structureSlice.reducer;
