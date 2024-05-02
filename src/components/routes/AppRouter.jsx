import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
  // useNavigate,
} from "react-router-dom";
import {
  Login,
  Dashboard,
  PageNotFound,
  Report,
  UserLog,
  UploadSdr,
  SubFolder,
  DirFiles,
} from "../utils/index";
import PrivateRoute from "../utils/PrivateRoute";
import Layout from "../home/layout/Layout";
import Cookies from "js-cookie";

const AppRouter = () => {
  const isAuth = Cookies.get("ss_tkn");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/");
  //   } else {
  //     navigate("/dashboard");
  //   }
  // }, [isAuth]);

  return (
    <Router>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path="/" index element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/:parent_folder" element={<SubFolder />} />
            <Route path="/:parent_folder/:subfolder" element={<DirFiles />} />
            <Route path="/report" element={<Report />} />
            <Route path="/user-log" element={<UserLog />} />
            <Route path="/upload-sdr" element={<UploadSdr />} />
          </Route>
          <Route path="/not-found" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
