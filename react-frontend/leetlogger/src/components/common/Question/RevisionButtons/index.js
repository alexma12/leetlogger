import React from "react";
import Tag from "../../Tag";
import "./revisionButtons.scss";

const RevisionButtons = () => {
  return (
    <div>
      <Tag tag="postpone" size="sm" />
      <Tag tag="expedite" size="sm" />
      <Tag tag="delete" size="sm" />
    </div>
  );
};

export default RevisionButtons;
