import React from "react";
import RevisionQuestions from "./RevisionQuestions";
import "./revisionQuestionsPanel.scss";

const RevisionQuestionPanel = () => {
  return (
    <div className="RevisionQuestionsPanel">
      <div className="RevisionQuestionsPanel-title"> Questions To Review </div>
      <RevisionQuestions />
    </div>
  );
};

export default RevisionQuestionPanel;
