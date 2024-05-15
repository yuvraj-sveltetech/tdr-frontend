import React, { useEffect, useState, useRef } from "react";
import tower from "../../../assets/images/tower-icon.png";
import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { FiActivity } from "react-icons/fi";
// import { HiOutlineUpload } from "react-icons/hi";

const Sidebar = () => {
  let superuser = localStorage.getItem("superuser");
  const links = useRef([
    {
      name: "Dashboard",
      icons: <MdOutlineSpaceDashboard id="navicons" />,
      to: "/",
    },
    {
      name: "Report",
      icons: <TbReportAnalytics id="navicons" />,
      to: "/report",
    },
    // {
    //   name: "Upload SDR",
    //   icons: <HiOutlineUpload id="navicons" size={19} />,
    //   to: "/upload-sdr",
    // },
  ]);
  useEffect(() => {
    if (superuser) {
      let isNavExists = links.current.every((links) => {
        return links.name !== "User Log";
      });

      // if (isNavExists) {
      //   links.current.push({
      //     name: "User Log",
      //     icons: <FiActivity id="navicons" size={19} />,
      //     to: "/user-log",
      //   });
      // }
    }
  }, [superuser]);

  return (
    <div className="sidebar col-md-2 ">
      <div className="logo">
        <h1>T.D.R</h1>
        <img src={tower} alt="tower_icon" width="25" height="25" />
      </div>
      <hr />
      <nav>
        <ul>
          {links.current.map((nav, i) => {
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
