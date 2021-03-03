import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./formEntrySelect.scss";

const FormEntrySelect = ({ label, value, onChange }) => {
  let optionsMap;
  let placeholder;

  switch (label) {
    case "type":
      optionsMap = {
        array: "Array",
        backtracking: "Backtracking",
        bit: "Bit Manipulation",
        dc: "Divide & Conquer",
        dp: "Dynamic Programming",
        graph: "Graph",
        greedy: "Greedy",
        linkedlist: "Linked List",
        queue: "Queue",
        stack: "Stack",
        string: "String",
        tree: "Tree",
      };
      placeholder = "Select A Question Type";
      break;
    case "difficulty":
      optionsMap = {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
      };
      placeholder = "Select A Difficulty";
      break;
    default:
      break;
  }

  const options = Object.values(optionsMap);
  return (
    <div className="FormEntrySelect">
      <div className="FormEntrySelect-label"> {label} </div>
      <Dropdown
        className={
          label === "type" ? "FormEntrySelect-type" : "FormEntrySelect-diff"
        }
        options={options}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default FormEntrySelect;
