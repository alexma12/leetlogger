import React from "react";
import "./formEntryText.scss";
const FormEntryText = ({ label, placeholder, value, onChange }) => {
  let input;
  if (label === "title") {
    input = (
      <span
        className={`FormEntryText-title ${
          value.trim() === "" && "FormEntryText-title-placeholder"
        }`}
      >
        {value.trim() !== "" ? `${value}` : "Title Generated From Url"}
      </span>
    );
  } else {
    input = (
      <input
        className="FormEntryText-input"
        placeholder={placeholder}
        value={value}
        name={label.toLowerCase()}
        onChange={onChange}
        autocomplete="off"
      />
    );
  }
  return (
    <div className="FormEntryText">
      <div className="FormEntryText-label"> {label} </div>
      {input}
    </div>
  );
};

export default FormEntryText;
