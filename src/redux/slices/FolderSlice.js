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
      const { data, take_action } = action.payload;
      const prevState = current(state);

      switch (take_action) {
        case "create_folder":
          return {
            ...state,
            created_folders: [...data],
          };

        case "create_subfolder":
          return {
            ...state,
            created_folders: prevState?.created_folders?.map((folder) =>
              folder?.id === data?.id
                ? {
                    ...folder,
                    subFolder: [...data?.sub_folder],
                  }
                : { ...folder }
            ),
          };

        case "add_files":
          return {
            ...state,
            created_folders: prevState?.created_folders?.map((folder) =>
              folder?.id === +data?.params?.parent_folder
                ? {
                    ...folder,
                    subFolder:
                      folder?.subFolder?.length > 0
                        ? folder?.subFolder?.map((sub_folder) =>
                            sub_folder?.id === +data?.params?.subfolder
                              ? {
                                  ...sub_folder,
                                  file: [...data?.api_data],
                                }
                              : { ...sub_folder }
                          )
                        : [],
                  }
                : { ...folder }
            ),
          };

        case "file_checkbox":
          return {
            ...state,
            created_folders: prevState?.created_folders?.map((folder) =>
              folder?.id === +data?.parent_folder
                ? {
                    ...folder,
                    subFolder:
                      folder?.subFolder?.length > 0
                        ? folder?.subFolder?.map((sub_folder) =>
                            sub_folder?.id === +data?.subfolder
                              ? {
                                  ...sub_folder,
                                  file: sub_folder?.file?.map((fl) =>
                                    fl?.id === data?.id
                                      ? {
                                          ...fl,
                                          isChecked: data?.checked,
                                        }
                                      : { ...fl }
                                  ),
                                }
                              : { ...sub_folder }
                          )
                        : [],
                  }
                : { ...folder }
            ),
          };

        case "select_all_checkbox":
          return {
            ...state,
            created_folders: prevState?.created_folders?.map((folder) =>
              folder?.id === +data?.parent_folder
                ? {
                    ...folder,
                    subFolder:
                      folder?.subFolder?.length > 0
                        ? folder?.subFolder?.map((sub_folder) =>
                            sub_folder?.id === data?.subfolder_id
                              ? {
                                  ...sub_folder,
                                  select_all: data?.checked,
                                  file: sub_folder?.file?.map((fl) => ({
                                    ...fl,
                                    isChecked: data?.checked,
                                  })),
                                }
                              : { ...sub_folder }
                          )
                        : [],
                  }
                : { ...folder }
            ),
          };

        case "select_all_subfolder":
          return {
            ...state,
            created_folders: prevState?.created_folders?.map((folder) =>
              folder?.id === +data?.parent_folder
                ? {
                    ...folder,
                    select_all: data?.checked,
                    subFolder:
                      folder?.subFolder?.length > 0
                        ? folder?.subFolder?.map((sub_folder) => ({
                            ...sub_folder,
                            select_all: data?.checked,
                            file: sub_folder?.file?.map((fl) => ({
                              ...fl,
                              isChecked: data?.checked,
                            })),
                          }))
                        : [],
                  }
                : { ...folder }
            ),
          };

        case "unselect_all_checkbox":
          return {
            ...state,
            created_folders: prevState?.created_folders?.map((folder) =>
              folder?.id === +data?.parent_folder
                ? {
                    ...folder,
                    select_all: data?.checked,
                  }
                : { ...folder }
            ),
          };

        case "unselect_all":
          return {
            ...state,
            created_folders: prevState?.created_folders?.map((folder) => {
              return {
                ...folder,
                subFolder:
                  folder?.subFolder?.length > 0
                    ? folder?.subFolder?.map((sub) => {
                        return {
                          ...sub,
                          select_all: false,
                          file: sub?.file?.map((fl) => ({
                            ...fl,
                            isChecked: false,
                          })),
                        };
                      })
                    : [],
              };
            }),
          };

        default:
          return { ...state };
      }
    },

    // sub_folder: (state, action) => {
    //   return {
    //     ...state,
    //     sub_folders: {
    //       ...state.sub_folders,
    //       parent_folder: action.payload.parent_path,
    //       folders: {
    //         ...state.sub_folders.folders,
    //         name: action.payload.subfolders,
    //       },
    //     },
    //   };
    // },

    // add_subfolder_name: (state, action) => {
    //   return {
    //     ...state,
    //     sub_folders: {
    //       ...state.sub_folders,
    //       subfolder: action.payload,
    //     },
    //   };
    // },

    // add_parentfolder_name: (state, action) => {
    //   return {
    //     ...state,
    //     sub_folders: {
    //       ...state.sub_folders,
    //       parent_folder: action.payload,
    //     },
    //   };
    // },

    // all_files: (state, action) => {
    //   return { ...state, all_files: action.payload };
    // },

    // is_parent_checked: (state, action) => {
    //   const { index, checked } = action.payload;

    //   return {
    //     ...state,
    //     created_folders: checked
    //       ? state.created_folders.map((item, i) =>
    //           i === index ? { ...item, isChecked: true } : item
    //         )
    //       : state.created_folders.map((item, i) =>
    //           i === index ? { ...item, isChecked: false } : item
    //         ),
    //   };
    // },

    // uncheck_all_parent: (state, action) => {
    //   return {
    //     ...state,
    //     created_folders: state.created_folders.map((item, i) =>
    //       item.isChecked === true ? { ...item, isChecked: false } : item
    //     ),
    //   };
    // },
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
