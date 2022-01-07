import React from "react";
import { NavLink } from "react-router-dom";
import "./alphabeticalHeaderPanel.scss";
import Question from "components/common/Question";
const AlphabeticalHeaderPanel = ({ reference, letter, data, type }) => {
  const questions = data
    .sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      }
      return -1;
    })
    .map((item) => {
      return (
        <NavLink
          to={`../database/${type}/${item.questionID}`}
          className="AlphabeticalHeaderPanel-navlink"
        >
          <Question
            title={item.title}
            difficulty={item.difficulty}
            dbType={type}
            entryCount={item.entryCount}
          />
        </NavLink>
      );
    });
  return (
    <div className="AlphabeticalHeaderPanel" ref={reference}>
      <div
        className={`AlphabeticalHeaderPanel-letter AlphabeticalHeaderPanel-letter-${type}`}
      >
        {letter.toUpperCase()}
      </div>
      <div className="AlphabeticalHeaderPanel-questions-box"> {questions}</div>
    </div>
  );
};

export default AlphabeticalHeaderPanel;
