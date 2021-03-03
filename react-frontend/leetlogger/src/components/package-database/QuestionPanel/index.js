import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import QuestionTypeTitle from "components/common/QuestionTypeTitle";
import QuestionPanelEntry from "./QuestionPanelEntry";
import { axiosAWSInstance } from "../../../axios";
import { ReactComponent as RightArrow } from "svg/right-arrow.svg";

import "./questionPanel.scss";

const QuestionPanel = (props) => {
  const [questionData, setQuestionData] = useState({});
  const questionID = props.match.params.questionId;

  const questionType = props.match.params.questionType;
  useEffect(() => {
    axiosAWSInstance
      .get(`/questions/${questionID}`)
      .then((res) => {
        setQuestionData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const entries = useSelector((state) => {
    if (
      !questionData.title ||
      !state.entryData ||
      !state.entryData.entriesByTitleMap
    )
      return [];
    return state.entryData.entriesByTitleMap[questionData.title];
  });

  const entryData = useMemo(() => {
    if (Object.keys(entries) === 0) return [];
    const notes = questionData.notes;
    return entries.map((entry) => {
      console.log(entry);
      const {
        approxCompletionHrs,
        approxCompletionMins,
        solvedWithSolution,
        tags,
        submittedAt,
        entryID,
      } = entry;
      let entryNotes = {};
      (notes || []).forEach((note) => {
        if (note.entryID === entryID) {
          entryNotes = note;
        }
      });
      return (
        <QuestionPanelEntry
          submittedAt={submittedAt}
          tags={tags}
          approxCompletionHrs={approxCompletionHrs}
          approxCompletionMins={approxCompletionMins}
          solvedWithSolution={solvedWithSolution}
          notes={entryNotes}
        />
      );
    });
  }, [entries]);

  return (
    <div className="QuestionPanel">
      <QuestionTypeTitle
        title={questionData && questionData.title}
        onBack={() => props.history.push(`/database/${questionType}`)}
        type={questionType}
      />
      <div className="QuestionPanel-info-bar">
        <span
          className={`QuestionPanel-info QuestionPanel-${questionData.difficulty}`}
        >{`Difficulty: ${questionData ? questionData.difficulty : ""}`}</span>
        <a
          href="https://leetcode.com/problems/two-sum/"
          target="_blank"
          rel="noreferrer"
          className={`QuestionPanel-info QuestionPanel-url QuestionPanel-${questionType}`}
        >
          Go To Leetcode Question
          <RightArrow className="QuestionPanel-url-icon" />
        </a>
      </div>
      <div className="QuestionPanel-box">{entryData}</div>
    </div>
  );
};

export default QuestionPanel;
