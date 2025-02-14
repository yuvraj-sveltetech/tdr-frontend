import React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
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
import Search from "../home/search/Search";
import { useAuthToken } from "../auth/Authenticate";

const AppRouter = () => {
  useAuthToken();

  return (
    <Router basename="/">
      <Layout>
        <Routes>
          {/* <Route path="/" index element={<Login />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route element={<PrivateRoute />}>
            {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/:parent_folder" element={<SubFolder />} />
            <Route path="/:parent_folder/:subfolder" element={<DirFiles />} />
            <Route path="/report" element={<Report />} />
            <Route path="/search" element={<Search />} />
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
