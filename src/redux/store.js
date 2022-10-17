import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import counterReducer from "./counter";
export default configureStore({
  reducer: { counter: counterReducer },
  devTools: composeWithDevTools(),
});
