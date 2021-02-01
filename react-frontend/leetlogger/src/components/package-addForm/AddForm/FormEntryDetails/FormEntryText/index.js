import React from "react";
import "./formEntryText.scss";
const FormEntryText = ({ label, placeholder }) => {
  return (
    <div className="FormEntryText">
      <div className="FormEntryText-label"> {label} </div>
      <input className="FormEntryText-input" placeholder={placeholder} />
    </div>
  );
};

export default FormEntryText;
