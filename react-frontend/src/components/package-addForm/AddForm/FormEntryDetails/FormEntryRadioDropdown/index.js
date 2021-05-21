import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "./formEntryRadioDropdown.scss";
import "react-datepicker/dist/react-datepicker.css";

const FormEntryRadioDropdown = ({
  label,
  onBoolChange,
  reviewLater,
  reviewDate,
  onDateChange,
}) => {
  let datepicker = reviewLater ? (
    <DatePicker
      selected={reviewDate}
      onChange={onDateChange}
      local="moment"
      name="review"
      dateFormat="MMMM d, yyyy"
    />
  ) : null;
  return (
    <div className="FormEntryRadioDropdown">
      <div className="FormEntryRadioDropdown-label"> {label} </div>
      <label
        className="FormEntryRadioDropdown-radio-label"
        onClick={!reviewLater && onBoolChange}
        id="willReview"
      >
        Yes
        <span
          className={`FormEntryRadioDropdown-radio-button ${
            reviewLater && "FormEntryRadioDropdown-radio-button-selected"
          }`}
          onClick={!reviewLater && onBoolChange}
          id="willReview"
        ></span>
      </label>
      <label
        className="FormEntryRadioDropdown-radio-label"
        onClick={reviewLater && onBoolChange}
        id="wontReview"
      >
        No
        <span
          className={`FormEntryRadioDropdown-radio-button ${
            !reviewLater && "FormEntryRadioDropdown-radio-button-selected"
          }`}
          onClick={reviewLater && onBoolChange}
          id="wontReview"
        ></span>
      </label>
      <div className="FormEntryRadioDropdown-datepicker">{datepicker}</div>
    </div>
  );
};

export default FormEntryRadioDropdown;
