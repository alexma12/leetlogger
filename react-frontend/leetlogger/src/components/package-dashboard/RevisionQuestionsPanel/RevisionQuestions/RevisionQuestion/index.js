import React from "react";
import RevisionButtons from "./RevisionButtons";
import Tag from "../../../../common/Tag";
import "./revisionQuestion.scss";
import { capitalizeFirstCharacters } from "../../../../../lib/text-helpers";

const RevisionQuestion = ({ title, date, due, questionType, difficulty }) => {
  return (
    <div className="RevisionQuestion">
      <div className="RevisionQuestion-title">
        {" "}
        {capitalizeFirstCharacters(title)}{" "}
      </div>
      <div className="RevisionQuestion-date">
        review on:{" "}
        <span className="RevisionQuestion-date-content">{` ${date}`}</span>
      </div>
      <div className="RevisionQuestion-tags">
        <Tag tag={questionType} size="sm" />
        <Tag tag={difficulty} size="sm" />
      </div>
      <div className="RevisionQuestion-buttons">
        <RevisionButtons />
      </div>
    </div>
  );
};

export default RevisionQuestion;
