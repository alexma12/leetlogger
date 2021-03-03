import React from "react";
import "./formEntryTime.scss";
const FormEntryText = ({ label, onChange, completionMins, completionHrs }) => {
  return (
    <div className="FormEntryTime">
      <div className="FormEntryTime-label"> {label} </div>
      <input
        className="FormEntryTime-hrs"
        type="number"
        placeholder="hrs"
        name="hrs"
        value={completionHrs}
        onChange={onChange}
      />
      hrs
      <input
        className="FormEntryTime-mins"
        type="number"
        placeholder="mins"
        name="mins"
        value={completionMins}
        onChange={onChange}
      />
      mins
    </div>
  );
};

export default FormEntryText;
