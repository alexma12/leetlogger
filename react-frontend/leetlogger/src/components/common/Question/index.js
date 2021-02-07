import React from "react";
import RevisionButtons from "./RevisionButtons";
import Tag from "../Tag";
import "./question.scss";
import { capitalizeFirstCharacters } from "../../../lib/text-helpers";

const Question = ({
  componentType,
  title,
  date,
  due,
  subtypes,
  completionTimeHrs,
  completionTimeMins,
  solved,
  questionType,
  difficulty,
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
      {solved ? (
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
      review on: <span className="Question-date-content">{` ${date}`}</span>
    </div>
  );
  return (
    <div className="Question">
      <div className="Question-title"> {capitalizeFirstCharacters(title)} </div>
      {isRevisionQuestion && revisionReviewDate}
      <div className="Question-tags">
        <Tag tag={difficulty} size="sm" />
        <Tag tag={questionType} size="sm" />
        {subTypes}
      </div>
      {isQuestion && solvedRecap}
      {isRevisionQuestion && revisionButtons}
    </div>
  );
};
export default Question;
