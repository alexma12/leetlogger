import React from "react";
import { ReactComponent as HomeIcon } from "../../../../svg/home.svg";
import { ReactComponent as ClipboardIcon } from "../../../../svg/clipboard.svg";
import { ReactComponent as AddIcon } from "../../../../svg/add.svg";
import { ReactComponent as HistoryIcon } from "../../../../svg/history.svg";
import { NavLink } from "react-router-dom";

import "./navItem.scss";

const NavItem = ({ title }) => {
  let navItem;
  switch (title) {
    case "home":
      navItem = (
        <NavLink
          to="/"
          exact
          className="NavItem"
          activeClassName="NavItem-enabled"
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
          exact
          className="NavItem"
          activeClassName="NavItem-enabled"
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
          exact
          className="NavItem"
          activeClassName="NavItem-enabled"
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
          exact
          className="NavItem"
          activeClassName="NavItem-enabled"
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
