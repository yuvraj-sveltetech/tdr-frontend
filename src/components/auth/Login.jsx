import React, { useState } from "react";
import background_img from "../../assets/images/background_img.jpg";
import logo from "../../assets/images/logo.png";
import useApiHandle from "../utils/useApiHandle";
import * as URL from "../utils/ConstantUrl";

const Login = () => {
  const { data, loading, apiCall } = useApiHandle();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
  };

  const login = () => {
    apiCall("post", URL.LOGIN, credential);
  };

  if (data?.data) {
    localStorage.setItem("auth_token", data?.data?.access_token);
    localStorage.setItem("refresh_token", data?.data?.refresh_token);
    localStorage.setItem("user_email", data?.data?.email);
  }

  return (
    <div
      className="login container-fluid bg-opacity-75"
      style={{
        backgroundImage: `url(${background_img})`,
      }}
    >
      <div className="row">
        <img src={logo} alt="sveltetech_logo" />
      </div>

      <div className="row h-75">
        <div className="col-md-6 h-100 d-flex flex-column justify-content-center">
          <h1 className="fs-1 text-white">Welcome to Svelte T.D.R</h1>
          <h3 className="fs-2 text-white mt-3">Analytical Tool</h3>
        </div>

        <div className="col-md-6 h-100 m-auto d-flex ">
          <div className="login-panel">
            <h2 className="fs-1 text-white">LOG IN</h2>
            <div className="l d-flex flex-column justify-content-evenly">
              <div className="email d-flex flex-column">
                <label htmlFor="email" className="text-white mb-2">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="password d-flex flex-column">
                <label htmlFor="pass" className="text-white mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="pass"
                  placeholder="Enter Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="submit-login -d-flex align-items-center justify-content-center">
              <button onClick={login} disabled={loading ? true : false}>
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
