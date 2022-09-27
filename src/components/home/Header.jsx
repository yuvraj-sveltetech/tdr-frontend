import React from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header">
      <div className="profile row m-0">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              admin@gmail.com
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="!#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <FaUser color="#fff" size="1.3rem" />
        </div>
      </div>
    </div>
  );
};

export { Header };
