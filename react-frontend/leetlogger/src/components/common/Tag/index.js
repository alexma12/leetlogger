import React from "react";
import "./tag.scss";
import { capitalizeFirstCharacters } from "../../../lib/text-helpers";

const tagPropToClassMap = {
  sm: "Tag-sm",
  md: "Tag-md",
  lg: "Tag-lg",
  array: "Tag-array",
  "dynamic programming": "Tag-dp",
  "linked list": "Tag-linkedlist",
  queue: "Tag-queue",
  stack: "Tag-stack",
  graph: "Tag-graph",
  string: "Tag-string",
  greedy: "Tag-greedy",
  "divide & conquer": "Tag-dc",
  "bit manipulation": "Tag-bit",
  tree: "Tag-tree",
  sorting: "Tag-sort",
  backtracking: "Tag-backtracking",
  regular: "Tag-regular",
  easy: "Tag-easy",
  medium: "Tag-medium",
  hard: "Tag-hard",
  postpone: "Tag-postpone",
  expedite: "Tag-expedite",
  delete: "Tag-delete",
};

const Tag = ({ tag, size }) => {
  const mappedClassName = tagPropToClassMap[tag];
  const classNames = `Tag ${
    mappedClassName ? mappedClassName : "Tag-default"
  } ${tagPropToClassMap[size]}`;

  return <div className={classNames}>{capitalizeFirstCharacters(tag)}</div>;
};

export default Tag;
