import React from "react";
import { useHistory } from "react-router-dom";
import Tag from "../Tag";
import "./question.scss";

const Question = ({
  componentType,
  title,
  date,
  due,
  tags,
  completionTimeHrs,
  completionTimeMins,
  solvedWithSolution,
  questionType,
  difficulty,
  dbType,
  questionID,
  entryCount,
  onClick,
}) => {
  const history = useHistory();

  const isRevisionQuestion = componentType === "RevisionQuestion";
  const isQuestion = componentType === "Question";
  const revisionButtons = (
    <div className="Question-buttons">
      <Tag
        tag="review"
        size="sm"
        onClick={() => {
          history.push("/database/" + questionType + "/" + questionID);
        }}
      />
    </div>
  );

  const completionTime = (
    <div className="Question-solvedRecap-completionTime">
      Completion Time:
      <span className="Question-solvedRecap-completionTime-time">{` ${completionTimeHrs} hrs ${completionTimeMins} mins`}</span>
    </div>
  );

  const solvedRecap = !solvedWithSolution ? (
    <div className="Question-solvedRecap-withoutSolution">
      solved without solution
    </div>
  ) : (
    <div className="Question-solvedRecap-withSolution">
      solved with solution
    </div>
  );

  const tagComponents =
    tags &&
    tags.map((tag) => {
      return <Tag tag={tag} size="sm" isDefault />;
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
      onClick={onClick}
    >
      <div className="Question-row Question-row-1">
        <div className="Question-title"> {title} </div>
        {isRevisionQuestion && revisionReviewDate}
        {isQuestion && completionTime}
      </div>
      <div className="Question-row Question-row-2">
        <div className="Question-tags">
          <Tag tag={difficulty || ""} size="sm" />
          <Tag tag={questionType || ""} size="sm" />
          {tagComponents}
        </div>
        {isQuestion && solvedRecap}
        {isRevisionQuestion && revisionButtons}
        {entryCount && (
          <div className="Question-dbQuestion-entryCount">
            {`Logged Entries: ${entryCount}`}
          </div>
        )}
      </div>
    </div>
  );
};
export default Question;
