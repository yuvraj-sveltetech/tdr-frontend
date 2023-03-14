import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./components/routes/AppRouter";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store/Store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <ToastContainer />
    <AppRouter />
    {/* </React.StrictMode> */}
  </Provider>
);
