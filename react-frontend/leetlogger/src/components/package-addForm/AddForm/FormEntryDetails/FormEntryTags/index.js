import React from "react";
import "./formEntryTags.scss";
import { ReactComponent as AddButton } from "svg/button.svg";
const FormEntryTags = () => {
  return (
    <div className="FormEntryTags">
      <div className="FormEntryTags-label"> Subtypes </div>
      <input
        className="FormEntryTags-input"
        placeholder="Add A Question Subtype"
      />
      <span className="FormEntryTags-addButton-box">
        <AddButton className="FormEntryTags-addButton" />
      </span>
    </div>
  );
};

export default FormEntryTags;
