import React from "react";
import Question from "../../../common/Question";
import "./revisionQuestions.scss";

const RevisionQuestions = () => {
  return (
    <div className="RevisionQuestions">
      <Question
        componentType="RevisionQuestion"
        title="Reverse a Linked List"
        date="January 15, 2021"
        due={true}
        questionType="array"
        difficulty="easy"
      />
      <Question
        componentType="RevisionQuestion"
        title="In Order Traversal of A Binary Tree"
        date="January 29, 2021"
        due={false}
        questionType="tree"
        difficulty="medium"
      />
      <Question
        componentType="RevisionQuestion"
        title="Number of Connected Components in an Undirected Graph"
        date="February 22, 2021"
        due={false}
        questionType="graph"
        difficulty="hard"
      />
      <Question
        componentType="RevisionQuestion"
        title="Maximum Subarray"
        date="February 27, 2021"
        due={false}
        questionType="backtracking"
        difficulty="easy"
      />
      <Question
        componentType="RevisionQuestion"
        title="Median of Two Sorted Arrays"
        date="March 3, 2021"
        due={false}
        questionType="divide & conquer"
        difficulty="medium"
      />
    </div>
  );
};

export default RevisionQuestions;
