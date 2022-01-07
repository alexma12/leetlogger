import React from "react";
import { ReactComponent as HomeIcon } from "../../../../svg/home.svg";
import { ReactComponent as ClipboardIcon } from "../../../../svg/clipboard.svg";
import { ReactComponent as AddIcon } from "../../../../svg/add.svg";
import { ReactComponent as HistoryIcon } from "../../../../svg/history.svg";
import { NavLink } from "react-router-dom";

import "./navItem.scss";

const NavItem = ({ title }) => {
  let navItem;
  const activeClassName = "NavItem NavItem-enabled";
  const className = "NavItem";
  switch (title) {
    case "home":
      navItem = (
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClassName : className)}
        >
          <HomeIcon className="NavItem-icon" />
          <span> Home </span>
        </NavLink>
      );
      break;
    case "new":
      navItem = (
        <NavLink
          to="/new"
          className={({ isActive }) => (isActive ? activeClassName : className)}
        >
          <AddIcon className="NavItem-icon" />
          <span> New </span>
        </NavLink>
      );
      break;
    case "history":
      navItem = (
        <NavLink
          to="/history"
          className={({ isActive }) => (isActive ? activeClassName : className)}
        >
          <HistoryIcon className="NavItem-icon" />
          <span> History </span>
        </NavLink>
      );
      break;
    case "database":
      navItem = (
        <NavLink
          to="/database"
          className={({ isActive }) => (isActive ? activeClassName : className)}
        >
          <ClipboardIcon className="NavItem-icon" />
          <span> Database </span>
        </NavLink>
      );
      break;
    default:
      break;
  }

  return navItem;
};

export default NavItem;
