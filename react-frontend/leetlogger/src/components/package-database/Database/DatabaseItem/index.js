import React from "react";
import "./databaseItem.scss";
import { typeToTitleMap } from "utils/titleAndTypeMaps";
import { NavLink } from "react-router-dom";

const DatabaseItem = ({ type, entryCount }) => {
  const titleClass = `DatabaseItem-title DatabaseItem-${type}`;
  const title = typeToTitleMap[type];
  const pathName = `database/${type}`;
  return (
    <NavLink to={pathName} className="DatabaseItem">
      <div className={titleClass}> {title} </div>
      <div className="DatabaseItem-details">{`Logged Questions: ${entryCount}`}</div>
    </NavLink>
  );
};

export default DatabaseItem;
