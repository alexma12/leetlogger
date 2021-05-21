import React from "react";
import { ReactComponent as BackIcon } from "svg/left-arrow.svg";
import { ReactComponent as AddIcon } from "svg/addIcon.svg";
import "./questionTypeTitle.scss";

const QuestionTypeTitle = ({ title, onBack, type, onAdd }) => {
  const addNote = (
    <button className="QuestionTypeTitle-addNote" onClick={onAdd}>
      Add Note
      <AddIcon className="QuestionTypeTitle-addNote-icon" />
    </button>
  );
  return (
    <div className={`QuestionTypeTitle-title QuestionTypeTitle-${type}`}>
      <button className="QuestionTypeTitle-goback" onClick={onBack}>
        <BackIcon className="QuestionTypeTitle-goback-icon" />
        Back
      </button>
      {title}
      {onAdd && addNote}
    </div>
  );
};

export default QuestionTypeTitle;
