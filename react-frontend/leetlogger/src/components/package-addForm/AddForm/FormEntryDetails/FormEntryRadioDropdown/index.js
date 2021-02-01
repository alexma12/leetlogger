import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import moment from "moment";
import "./formEntryRadioDropdown.scss";
import "react-datepicker/dist/react-datepicker.css";

const FormEntryRadioDropdown = ({ label }) => {
  //! useMemo

  registerLocale("moment", moment);
  const [startDate, setStartDate] = useState(new Date());
  let datepicker = (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      local="moment"
      dateFormat="MMMM d, yyyy"
    />
  );
  return (
    <div className="FormEntryRadioDropdown">
      <div className="FormEntryRadioDropdown-label"> {label} </div>
      <label className="FormEntryRadioDropdown-radio-label">
        Yes
        <input
          type="radio"
          className="FormEntryRadioDropdown-radio"
          name="solvedWithoutSolution"
        />
        <span className="checkmark"></span>
      </label>
      <label className="FormEntryRadioDropdown-radio-label">
        No
        <input
          type="radio"
          className="FormEntryRadioDropdown-radio"
          checked="checked"
          name="solvedWithoutSolution"
        />
        <span clasName="checkmark" n name="solvedWithoutSolution"></span>
      </label>
      {datepicker}
    </div>
  );
};

export default FormEntryRadioDropdown;
