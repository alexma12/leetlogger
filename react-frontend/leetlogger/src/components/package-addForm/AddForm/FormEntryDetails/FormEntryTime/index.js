import React from "react";
import "./formEntryTime.scss";
const FormEntryText = ({ label }) => {
  return (
    <div className="FormEntryTime">
      <div className="FormEntryTime-label"> {label} </div>
      <input className="FormEntryTime-hrs" type="number" placeholder="hrs" />
      hrs
      <input className="FormEntryTime-mins" type="number" placeholder="mins" />
      mins
    </div>
  );
};

export default FormEntryText;
