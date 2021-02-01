import React from "react";
import RecentQuestion from "./RecentQuestion";
import "./recentQuestions.scss";

const RecentQuestions = () => {
  return (
    <div className="RecentsQuestions">
      <RecentQuestion
        difficulty="easy"
        title="Add Pagination"
        date="Jan 9, 2021"
      />
      <RecentQuestion
        difficulty="easy"
        title="Implement Mergesort"
        date="Jan 14, 2021"
      />
      <RecentQuestion
        difficulty="medium"
        title="Reverse a Binary Tree"
        date="Jan 15, 2021"
      />
      <RecentQuestion
        difficulty="hard"
        title="Add Truncation To Title"
        date="Jan 21, 2021"
      />
      <RecentQuestion
        difficulty="hard"
        title="Add Truncation To Title"
        date="Jan 21, 2021"
      />
    </div>
  );
};

export default RecentQuestions;
