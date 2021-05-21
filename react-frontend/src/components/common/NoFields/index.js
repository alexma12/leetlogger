import React from "react";
import "./noFields.scss";

const NoFields = ({ text, lg, style }) => {
  return (
    <div className="NoFields-box" style={style}>
      <div className={`NoFields ${lg ? "NoFields-lg" : ""}`}>{text}</div>
    </div>
  );
};

export default NoFields;
