import React from "react";
import Tag from "../../../../../common/Tag";
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
