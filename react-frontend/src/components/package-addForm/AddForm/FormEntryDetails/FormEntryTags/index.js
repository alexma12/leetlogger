import React from "react";
import "./formEntryTags.scss";
import { ReactComponent as AddButton } from "svg/button.svg";
const FormEntryTags = ({
  tags = [],
  inputValue,
  onInputChange,
  onAddTag,
  onRemoveTag,
}) => {
  const formTags = tags.map((tag) => {
    return (
      <span className="FormEntryTags-tags">
        {tag.title}
        <span
          className="FormEntryTags-tags-delete"
          onClick={onRemoveTag}
          id={tag.id}
        >
          x
        </span>
      </span>
    );
  });

  return (
    <div className="FormEntryTags">
      <div className="FormEntryTags-label"> Tags </div>
      <input
        className="FormEntryTags-input"
        placeholder="Add An Entry Tag"
        name="tags"
        value={inputValue}
        autocomplete="off"
        onChange={onInputChange}
      />
      <span className="FormEntryTags-addButton-box">
        <AddButton className="FormEntryTags-addButton" onClick={onAddTag} />
      </span>
      {tags.length !== 0 && (
        <div className="FormEntryTags-tags-box">{formTags}</div>
      )}
    </div>
  );
};

export default FormEntryTags;
