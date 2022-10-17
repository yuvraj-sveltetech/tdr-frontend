import { configureStore } from "@reduxjs/toolkit";
import AddSliceReducer from "../slice/CreateSlice"
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = configureStore({
 reducer:{
  showFile:AddSliceReducer.reducer
 }
},composeWithDevTools()
)
