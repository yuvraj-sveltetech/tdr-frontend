import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CreateUserModal } from "../../utils/index";
import { useDispatch } from "react-redux";
import { folder } from "../../../redux/slices/FolderSlice";

const Header = () => {
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.setItem("auth_token", "");
    dispatch(folder("remove_created_files"));
    window.close()
  };

  return (
    <>
      <div className="header">
        <div className="profile row m-0">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            {/* <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "#fff" }}
              >
                {localStorage.getItem("user_email")}
              </button>
              <ul className="dropdown-menu">
                {localStorage.getItem("superuser") === "true" ? (
                  <>
                    <li>
                      <button
                        className="dropdown-item"
                        to="#!"
                        data-bs-toggle="modal"
                        data-bs-target="#create-user-modal"
                      >
                        Create User
                      </button>
                    </li>
                  </>
                ) : null}
                <li>
                  <Link className="dropdown-item" to="/" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
            <FaUser color="#fff" size="1.3rem" /> */}
          </div>
        </div>
      </div>

      <CreateUserModal />
    </>
  );
};

export { Header };
