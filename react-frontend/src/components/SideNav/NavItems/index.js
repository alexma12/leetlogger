import React from "react";
import NavItem from "./NavItem";
import "./navItems.scss";

const NavItems = () => {
  return (
    <div className="NavItems">
      <NavItem title="home" />
      <NavItem title="new" />
      <NavItem title="database" />
      <NavItem title="history" />
    </div>
  );
};

export default NavItems;
