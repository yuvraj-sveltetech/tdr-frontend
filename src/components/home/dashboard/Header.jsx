import React from "react";
import { FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import { CreateUserModal } from "../../utils/index";

const Header = () => {
  const username = Cookies.get("user") || "User";

  return (
    <>
      <div className="header">
        <div className="h-100 profile row m-0">
          <div className="col-md-6"></div>

          <div className="col-md-6">
            <span className="text-white me-2 fw-bold">{username}</span>
            <FaUser color="#fff" size="1.3rem" />
          </div>
        </div>
      </div>

      <CreateUserModal />
    </>
  );
};

export { Header };
