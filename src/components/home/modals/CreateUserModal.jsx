import React, { useState, useEffect, useRef } from "react";
import { CREATE_USER_ACCOUNT } from "../../utils/ConstantUrl";
import useApiHandle from "../../utils/useApiHandle";

const CreateUserModal = () => {
  const { data, loading, apiCall } = useApiHandle();
  const [user, setUser] = useState({ email: "", password: "" });
  const form = useRef(null);

  useEffect(() => {
    if (data?.data) {
      form.current.reset();
    }
    if (data.length === 0) {
      form.current.reset();
    }
  }, [data]);

  const createUserAccount = (e) => {
    e.preventDefault();
    apiCall("post", CREATE_USER_ACCOUNT, user);
    setUser({ email: "", password: "" });
  };

  return (
    <div
      className="modal fade"
      id="create-user-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Create New User Account
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => createUserAccount(e)} ref={form}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  user.email === "" || user.password === "" ? true : loading
                }
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />

                    <span className="sr-only">Loading...</span>
                  </>
                ) : (
                  "Create User"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateUserModal };
