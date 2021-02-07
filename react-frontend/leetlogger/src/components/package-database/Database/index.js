import React from "react";
import DatabaseItem from "./DatabaseItem";
import "./database.scss";

const Database = () => {
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
      return <DatabaseItem type={qType} />;
    });
  return (
    <div className="Database">
      <div className="Database-items">{dbItems}</div>
    </div>
  );
};

export default Database;
