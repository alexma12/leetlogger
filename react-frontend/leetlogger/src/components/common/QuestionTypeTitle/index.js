import React from "react";
import { ReactComponent as BackIcon } from "svg/left-arrow.svg";
import "./questionTypeTitle.scss";

const QuestionTypeTitle = ({ title, onBack, type }) => {
  return (
    <div className={`QuestionTypeTitle-title QuestionTypeTitle-${type}`}>
      <button className="QuestionTypeTitle-goback" onClick={onBack}>
        <BackIcon className="QuestionTypeTitle-goback-icon" />
        Back
      </button>
      {title}
    </div>
  );
};

export default QuestionTypeTitle;
