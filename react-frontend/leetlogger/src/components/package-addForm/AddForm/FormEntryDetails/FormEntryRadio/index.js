import React, { useState } from "react";
import "./formEntryRadio.scss";

const FormEntryRadioDropdown = ({ label }) => {
  return (
    <div className="FormEntryRadio">
      <div className="FormEntryRadio-label"> {label} </div>
      <label className="FormEntryRadio-radio-label">
        With Solution
        <input type="radio" className="FormEntryRadio-radio" name="radio" />
        <span className="checkmark"></span>
      </label>
      <label className="FormEntryRadio-radio-label">
        Without Solution
        <input
          type="radio"
          className="FormEntryRadio-radio"
          checked="checked"
          name="radio"
        />
      </label>
      <span clasName="checkmark" name="radio"></span>
    </div>
  );
};

export default FormEntryRadioDropdown;
