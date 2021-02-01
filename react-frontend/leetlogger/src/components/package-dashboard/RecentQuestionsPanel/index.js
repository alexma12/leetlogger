import React from "react";
import { ReactComponent as ReviewIcon } from "svg/review.svg";
import RecentQuestions from "./RecentQuestions";

import "./recentQuestionsPanel.scss";

const RecentQuestionsPanel = () => {
  return (
    <div className="RecentQuestionsPanel">
      <div className="RecentQuestionsPanel-title">
        <div className="RecentQuestionsPanel-icon-box">
          <ReviewIcon className="RecentQuestionsPanel-icon" />
        </div>
        Recent Entries
      </div>
      <RecentQuestions />
    </div>
  );
};

export default RecentQuestionsPanel;
