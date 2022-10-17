import { createSlice } from "@reduxjs/toolkit";
const initialState = {
 folders:[],
}

export const AddSlice=createSlice({
 name:'showData',
 initialState,
 reducers:{
  addfile:(state ,action) => {
   state.folders=[action.payload,...state.folders]
  },
 } 
})

export default AddSlice;