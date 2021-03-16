import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Question from "../../common/Question";
import {
  milisecondsToDateStringWithoutWeekDay,
  getStartOfDayInMiliseconds,
} from "utils/dateHelpers";
import { revisionQuestionsSelector } from "./selectors/revisionQuestionsSelector";
import PaginationSelector from "components/common/Pagination/PaginatedDataSelector";
import { paginatedData } from "utils/paginatedData";
import "./revisionQuestionsPanel.scss";

const PAGINATION_MAX_ITEMS = 5;

const RevisionQuestionPanel = () => {
  const revisionQuestions = useSelector((state) =>
    revisionQuestionsSelector(state)
  );
  const [paginationPage, setPaginationPage] = useState(1);

  const onPaginationNext = () => {
    setPaginationPage((prevState) => {
      return prevState + 1;
    });
  };

  const onPagnationPrev = () => {
    setPaginationPage((prevState) => prevState - 1);
  };

  const onPagaintionPageSelect = (event) => {
    setPaginationPage(Number(event.target.id));
  };
  const paginatedRevisionQuestions = useMemo(() => {
    if (!revisionQuestions) return {};
    return paginatedData(revisionQuestions, PAGINATION_MAX_ITEMS);
  }, [revisionQuestions]);

  const questionsArr = (paginatedRevisionQuestions[paginationPage] || []).map(
    (q) => {
      return (
        <Question
          componentType="RevisionQuestion"
          title={q.title}
          date={milisecondsToDateStringWithoutWeekDay(q.revisionDate)}
          questionType={q.questionType}
          difficulty={q.difficulty}
          due={
            getStartOfDayInMiliseconds(Date.now()) >
            getStartOfDayInMiliseconds(q.revisionDate)
          }
        />
      );
    }
  );
  return (
    <div className="RevisionQuestionsPanel">
      <div className="RevisionQuestionsPanel-title"> Questions To Review </div>
      <div className="RevisionQuestionsPanel-questions">{questionsArr}</div>;
      <PaginationSelector
        top="74.5rem"
        numPages={
          revisionQuestions
            ? revisionQuestions.length % PAGINATION_MAX_ITEMS === 0
              ? Math.floor(revisionQuestions.length / PAGINATION_MAX_ITEMS)
              : Math.floor(revisionQuestions.length / PAGINATION_MAX_ITEMS) + 1
            : 0
        }
        currPage={paginationPage}
        onNext={onPaginationNext}
        onPrev={onPagnationPrev}
        onPageSelect={onPagaintionPageSelect}
        sm={true}
      />
    </div>
  );
};

export default RevisionQuestionPanel;
