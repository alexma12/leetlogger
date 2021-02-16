import React from "react";
import { useSelector } from "react-redux";
import RecentQuestion from "./RecentQuestion";
import NoFields from "components/common/NoFields";
import { milisecondsToDateStringWithoutWeekDay } from "utils/dateHelpers";
import "./recentQuestions.scss";

const RecentQuestions = () => {
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
  return <div className="RecentsQuestions">{recentQuestions}</div>;
};

export default RecentQuestions;
