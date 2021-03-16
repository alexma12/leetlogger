import React from "react";
import "./tag.scss";
import { typeToTitleMap } from "utils/titleAndTypeMaps";
import { lowercaseFirstCharacters } from "utils/textHelpers";
const Tag = ({ tag, size, isDefault, id }) => {
  const title = typeToTitleMap[tag];

  let classNames = `Tag Tag-${tag}`;
  if (isDefault) {
    classNames = "Tag Tag-default";
  }

  return (
    <div id={id} className={classNames}>
      {lowercaseFirstCharacters(title) || tag}
    </div>
  );
};

export default Tag;
