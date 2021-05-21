import React, { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import AlphabeticalHeaderPanel from "./AlphabeticHeaderPanel";
import QuestionTypeTitle from "components/common/QuestionTypeTitle";
import { getQuestionDataByTypeSelector } from "./selectors/getQuestionDataByType";
import { typeToTitleMap } from "utils/titleAndTypeMaps";
import { alphabetArray } from "utils/alphabetArray";
import { alphabeticalSort } from "utils/alphabeticalSort";
import NoFields from "components/common/NoFields";
import "./databaseQuestion.scss";

const DatabaseQuestion = (props) => {
  const questionType = props.match.params.questionType || "";

  const questionsDataByType = useSelector((state) =>
    getQuestionDataByTypeSelector(state, questionType)
  );

  const alphabeticalRefs = {
    a: useRef(),
    b: useRef(),
    c: useRef(),
    d: useRef(),
    e: useRef(),
    f: useRef(),
    g: useRef(),
    h: useRef(),
    i: useRef(),
    j: useRef(),
    k: useRef(),
    l: useRef(),
    m: useRef(),
    n: useRef(),
    o: useRef(),
    p: useRef(),
    q: useRef(),
    r: useRef(),
    s: useRef(),
    t: useRef(),
    u: useRef(),
    v: useRef(),
    w: useRef(),
    x: useRef(),
    y: useRef(),
    z: useRef(),
  };

  const alphabeticalSortedQuestionData = useMemo(
    () => alphabeticalSort(questionsDataByType),
    [questionsDataByType]
  );

  const alphabeticalSortedComponents = [];

  Object.keys(alphabeticalSortedQuestionData)
    .sort()
    .forEach((letter) => {
      alphabeticalSortedComponents.push(
        <AlphabeticalHeaderPanel
          reference={alphabeticalRefs[letter]}
          letter={letter}
          data={alphabeticalSortedQuestionData[letter]}
          type={questionType}
        />
      );
    });

  const alphabeticalSelector = alphabetArray.map((letter) => {
    const ref = alphabeticalRefs[letter];
    return (
      <span
        onClick={
          alphabeticalSortedQuestionData[letter] &&
          (() =>
            ref.current.scrollIntoView({ block: "end", behavior: "smooth" }))
        }
        className={`DatabaseQuestion-alphabeticalSelector-letter  ${
          alphabeticalSortedQuestionData[letter]
            ? `DatabaseQuestion-alphabeticalSelector-letter-${questionType}`
            : "DatabaseQuestion-alphabeticalSelector-letter-inactive"
        }`}
      >
        {letter}
      </span>
    );
  });

  const title = typeToTitleMap[questionType];

  const questionDataRender =
    Object.keys(alphabeticalSortedQuestionData).length > 0 ? (
      <div>
        <div className="DatabaseQuestion-alphabeticalSelector">
          {alphabeticalSelector}
        </div>
        <div className="DatabaseQuestion-questions">
          {alphabeticalSortedComponents}
        </div>
      </div>
    ) : (
      <NoFields text={`No Questions Logged`} lg />
    );

  return (
    <div className="DatabaseQuestion-wrapper">
      <div className="DatabaseQuestion">
        <QuestionTypeTitle
          type={questionType}
          onBack={() => props.history.push("/database")}
          title={`${title} Questions`}
        />
        {questionDataRender}
      </div>
    </div>
  );
};

export default DatabaseQuestion;
