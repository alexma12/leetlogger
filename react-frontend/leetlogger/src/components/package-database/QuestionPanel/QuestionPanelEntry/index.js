import React from "react";
import "./questionPanelEntry.scss";
import { milisecondsToDateStringWithTime } from "utils/dateHelpers";
const QuestionPanelEntry = ({
  approxCompletionHrs,
  approxCompletionMins,
  solvedWithSolution,
  tags,
  submittedAt,
  notes,
}) => {
  console.log(notes);
  return (
    <div className="QuestionPanelEntry">
      <div className="QuestionPanelEntry-header">
        {milisecondsToDateStringWithTime(submittedAt)}
      </div>
      <div className="QuestionPanelEntry-content">
        <div className="QuestionPanelEntry-content-notes">{notes.content}</div>
        <div className="QuestioPanelEntry-content-info"></div>
      </div>
    </div>
  );
};

export default QuestionPanelEntry;
