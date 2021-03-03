import React from "react";
import "./formEntryTags.scss";
import { ReactComponent as AddButton } from "svg/button.svg";
const FormEntryTags = ({
  subTypes = [],
  inputValue,
  onInputChange,
  onAddSubType,
  onRemoveSubType,
}) => {
  const formSubTypes = subTypes.map((subType) => {
    return (
      <span className="FormEntryTags-subTypes">
        {subType.title}
        <span
          className="FormEntryTags-subTypes-delete"
          onClick={onRemoveSubType}
          id={subType.id}
        >
          x
        </span>
      </span>
    );
  });

  return (
    <div className="FormEntryTags">
      <div className="FormEntryTags-label"> Subtypes </div>
      <input
        className="FormEntryTags-input"
        placeholder="Add A Question Subtype"
        name="subTypes"
        value={inputValue}
        autocomplete="off"
        onChange={onInputChange}
      />
      <span className="FormEntryTags-addButton-box">
        <AddButton className="FormEntryTags-addButton" onClick={onAddSubType} />
      </span>
      {subTypes.length !== 0 && (
        <div className="FormEntryTags-subTypes-box">{formSubTypes}</div>
      )}
    </div>
  );
};

export default FormEntryTags;
