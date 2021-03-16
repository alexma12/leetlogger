import React from "react";
import { milisecondsToDateStringWithTime } from "utils/dateHelpers";
import Tag from "components/common/Tag";
import "./entrySummary.scss";
const EntrySummary = ({
  tags,
  difficulty,
  submittedAt,
  approxCompletionHrs,
  approxCompletionMins,
  questionType,
  solvedWithSolution,
  id,
  onEntryClick,
}) => {
  const tagComponents = tags.map((tag) => {
    return <Tag id={id} isDefault tag={tag} />;
  });
  return (
    <div
      id={id}
      className={`EntrySummary EntrySummary-${difficulty}`}
      onClick={onEntryClick}
    >
      <div id={id} className="EntrySummary-time">
        {milisecondsToDateStringWithTime(submittedAt)}
      </div>
      <div id={id} className="EntrySummary-completion">
        Completed In:
        <span id={id} className={`EntrySummary-completion-${questionType}`}>
          {` ${approxCompletionHrs} hrs ${approxCompletionMins} mins`}
        </span>
      </div>
      <div id={id} className="EntrySummary-solved">
        Solved:
        {solvedWithSolution ? (
          <span id={id} className="EntrySummary-solved-withSolution">
            {" "}
            With Solution
          </span>
        ) : (
          <span id={id} className="EntrySummary-solved-withoutSolution">
            {" "}
            Without Solution
          </span>
        )}
      </div>
      <div
        id={id}
        className={`EntrySummary-tags ${
          tagComponents.length === 0 && "EntrySummary-tags-empty"
        }`}
      >
        Tags:{" "}
        {tagComponents.length === 0 ? " N/A" : <span>{tagComponents}</span>}
      </div>
    </div>
  );
};

export default EntrySummary;
