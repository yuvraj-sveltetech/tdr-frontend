import React from "react";
import tower from "../../../assets/images/tower-icon.png";
import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { FiActivity } from "react-icons/fi";

const Sidebar = () => {
  const navlinks = [
    {
      name: "Dashboard",
      icons: <MdOutlineSpaceDashboard id="navicons" />,
      to: "/dashboard",
    },
    {
      name: "Report",
      icons: <TbReportAnalytics id="navicons" />,
      to: "/report",
    },
    {
      name: "User Log",
      icons: <FiActivity id="navicons" size={19} />,
      to: "/user-log",
    },
  ];

  return (
    <div className="sidebar col-md-2 ">
      <div className="logo">
        <h1>T.D.R</h1>
        <img src={tower} alt="tower_icon" width="25" height="25" />
      </div>
      <hr />
      <nav>
        <ul>
          {navlinks.map((nav, i) => {
            return (
              <li key={`navlinks${i}`}>
                <NavLink
                  to={nav.to}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                  end
                >
                  {nav.icons}
                  {nav.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export { Sidebar };
