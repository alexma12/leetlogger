import React from "react";
import { useSelector } from "react-redux";
import RecentQuestion from "./RecentQuestion";
import { milisecondsToDateStringWithoutWeekDay } from "utils/dateHelpers";
import "./recentQuestions.scss";

const RecentQuestions = () => {
  const recentQuestionsFromRedux = useSelector(({ entryData }) => {
    return entryData.recentEntries;
  });

  const recentQuestions = (recentQuestionsFromRedux || []).map(
    ({ title, submittedAt, difficulty }) => {
      return (
        <RecentQuestion
          difficulty={difficulty}
          title={title}
          date={milisecondsToDateStringWithoutWeekDay(submittedAt)}
        />
      );
    }
  );
  return <div className="RecentsQuestions">{recentQuestions}</div>;
};

export default RecentQuestions;
