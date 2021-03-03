import React from "react";
import { ReactComponent as ReviewIcon } from "svg/review.svg";
import { useSelector } from "react-redux";
import RecentQuestion from "./RecentQuestion";
import NoFields from "components/common/NoFields";
import { milisecondsToDateStringWithoutWeekDay } from "utils/dateHelpers";
import "./recentQuestionsPanel.scss";

const RecentQuestionsPanel = () => {
  const recentQuestionsFromRedux = useSelector(({ entryData }) => {
    return entryData.recentEntries;
  });

  const recentQuestions =
    recentQuestionsFromRedux && recentQuestionsFromRedux.length > 0 ? (
      recentQuestionsFromRedux.map(({ title, submittedAt, difficulty }) => {
        return (
          <RecentQuestion
            difficulty={difficulty}
            title={title}
            date={milisecondsToDateStringWithoutWeekDay(submittedAt)}
          />
        );
      })
    ) : (
      <NoFields text="No entries" />
    );

  return (
    <div className="RecentQuestionsPanel">
      <div className="RecentQuestionsPanel-title">
        <div className="RecentQuestionsPanel-icon-box">
          <ReviewIcon className="RecentQuestionsPanel-icon" />
        </div>
        Recent Entries
      </div>
      <div className="RecentQuestionsPanel-questions">{recentQuestions}</div>
    </div>
  );
};

export default RecentQuestionsPanel;
