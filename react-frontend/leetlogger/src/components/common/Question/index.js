import React from "react";
import RevisionButtons from "./RevisionButtons";
import Tag from "../Tag";
import "./question.scss";

const Question = ({
  componentType,
  title,
  date,
  due,
  subtypes,
  completionTimeHrs,
  completionTimeMins,
  solvedWithSolution,
  questionType,
  difficulty,
  dbType,
  entryCount,
}) => {
  const isRevisionQuestion = componentType === "RevisionQuestion";
  const isQuestion = componentType === "Question";
  const revisionButtons = (
    <div className="Question-buttons">
      <RevisionButtons />
    </div>
  );

  const solvedRecap = (
    <div className="Question-solvedRecap">
      <div className="Question-solvedRecap-completionTime">
        Completion Time:
        <span className="Question-solvedRecap-completionTime-time">{` ${completionTimeHrs} hrs ${completionTimeMins} mins`}</span>
      </div>
      {!solvedWithSolution ? (
        <div className="Question-solvedRecap-withoutSolution">
          solved without solution
        </div>
      ) : (
        <div className="Question-solvedRecap-withSolution">
          solved with solution
        </div>
      )}
    </div>
  );

  const subTypes =
    subtypes &&
    subtypes.map((subtype) => {
      return <Tag tag={subtype} size="sm" isDefault />;
    });

  const revisionReviewDate = (
    <div className="Question-date">
      review on:{" "}
      <span
        className={`Question-date-content ${
          due && "Question-date-content-due"
        }`}
      >{` ${date}`}</span>
    </div>
  );
  return (
    <div
      className={`Question ${
        dbType && `Question-dbQuestion Question-${dbType}`
      }`}
    >
      <div className="Question-title"> {title} </div>
      {isRevisionQuestion && revisionReviewDate}
      <div className="Question-tags">
        <Tag tag={difficulty || ""} size="sm" />
        <Tag tag={questionType || ""} size="sm" />
        {subTypes}
      </div>
      {isQuestion && solvedRecap}
      {isRevisionQuestion && revisionButtons}
      {entryCount && (
        <div className="Question-dbQuestion-entryCount">
          {`Logged Entries: ${entryCount}`}
        </div>
      )}
    </div>
  );
};
export default Question;
