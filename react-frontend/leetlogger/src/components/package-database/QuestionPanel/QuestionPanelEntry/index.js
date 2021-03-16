import React from "react";
import "./questionPanelEntry.scss";
import { milisecondsToDateStringWithTime } from "utils/dateHelpers";
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
const QuestionPanelEntry = ({
  approxCompletionHrs,
  approxCompletionMins,
  solvedWithSolution,
  tags,
  submittedAt,
  notes,
}) => {
  return (
    <div className="QuestionPanelEntry">
      <div className="QuestionPanelEntry-header">
        {milisecondsToDateStringWithTime(submittedAt)}
      </div>
      <div className="QuestionPanelEntry-content">
        <div className="QuestionPanelEntry-content-notes"></div>
        <div className="QuestioPanelEntry-content-info"></div>
      </div>
    </div>
  );
};

export default QuestionPanelEntry;
