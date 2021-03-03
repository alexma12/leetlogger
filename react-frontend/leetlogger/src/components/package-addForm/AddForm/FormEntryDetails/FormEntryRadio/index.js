import React, { useState } from "react";
import "./formEntryRadio.scss";

const FormEntryRadioDropdown = ({ label, onBoolChange, value }) => {
  return (
    <div className="FormEntryRadio">
      <div className="FormEntryRadio-label"> {label} </div>
      <label
        className="FormEntryRadio-radio-label"
        onClick={!value && onBoolChange}
        id="withSolution"
      >
        With Solution
        <span
          className={`FormEntryRadio-radio-button ${
            value && "FormEntryRadio-radio-button-selected"
          }`}
          onClick={!value && onBoolChange}
          id="withSolution"
        ></span>
      </label>
      <label
        className="FormEntryRadio-radio-label"
        onClick={value && onBoolChange}
        id="withoutSolution"
      >
        Without Solution
        <span
          className={`FormEntryRadio-radio-button ${
            !value && "FormEntryRadio-radio-button-selected"
          }`}
          onClick={value && onBoolChange}
          id="withoutSolution"
        ></span>
      </label>
    </div>
  );
};

export default FormEntryRadioDropdown;
