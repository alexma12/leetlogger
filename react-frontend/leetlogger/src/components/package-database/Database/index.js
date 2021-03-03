import React from "react";
import { useSelector } from "react-redux";
import DatabaseItem from "./DatabaseItem";
import "./database.scss";

const Database = () => {
  const questionCounts = useSelector((state) => {
    if (!state.questionData) {
      return {};
    }
    return state.questionData.questionsByTypeMap || {};
  });

  const dbItems = [
    "array",
    "bit",
    "linkedlist",
    "stack",
    "graph",
    "string",
    "greedy",
    "dc",
    "dp",
    "queue",
    "tree",
    "backtracking",
  ]
    .sort()
    .map((qType) => {
      return (
        <DatabaseItem
          type={qType}
          entryCount={
            (questionCounts[qType] && questionCounts[qType].length) || 0
          }
        />
      );
    });
  return (
    <div className="Database">
      <div className="Database-items">{dbItems}</div>
    </div>
  );
};

export default Database;
