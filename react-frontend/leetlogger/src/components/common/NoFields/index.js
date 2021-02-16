import React from "react";
import "./noFields.scss";

const NoFields = ({ text, lg }) => {
  return (
    <div className="NoFields-box">
      <div className={`NoFields ${lg ? "NoFields-lg" : ""}`}>{text}</div>
    </div>
  );
};

export default NoFields;
