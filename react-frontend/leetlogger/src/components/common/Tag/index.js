import React from "react";
import "./tag.scss";
import { typeToTitleMap } from "utils/titleAndTypeMaps";
import { capitalizeFirstCharacters } from "lib/text-helpers";

const Tag = ({ tag, size, isDefault }) => {
  const title = typeToTitleMap[tag];

  let classNames = `Tag Tag-${tag}`;
  if (isDefault) {
    classNames = "Tag Tag-default";
  }

  return (
    <div className={classNames}>{title || capitalizeFirstCharacters(tag)}</div>
  );
};

export default Tag;
