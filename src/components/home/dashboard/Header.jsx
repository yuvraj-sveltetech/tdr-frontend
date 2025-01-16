import React from "react";
import { FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import { CreateUserModal } from "../../utils/index";
import { Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  const username = Cookies.get("user") || "User";

  const handleLogout = () => {
    // Remove all cookies
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });

    window.close();
  };

  return (
    <>
      <div className="header">
        <div className="h-100 profile row m-0">
          <div className="col-md-6"></div>

          <div className="col-md-6">
            <Nav>
              <NavDropdown
                id="user-nav-dropdown"
                title={username}
                menuVariant="white"
                className="nav-profile-dropdown"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <FaUser color="#fff" size="1.3rem" />
          </div>
        </div>
      </div>

      <CreateUserModal />
    </>
  );
};

export { Header };
