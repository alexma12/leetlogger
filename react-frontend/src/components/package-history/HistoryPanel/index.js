import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as BackIcon } from "svg/back.svg";
import { ReactComponent as NextIcon } from "svg/next.svg";
import { milisecondsToDateString } from "utils/dateHelpers";
import historyDataSelector from "../selectors/historyDataSelector";
import NoFields from "components/common/NoFields";
import PaginationDataSelector from "components/common/Pagination/PaginatedDataSelector";
import { paginatedData } from "utils/paginatedData";
import "./historyPanel.scss";
import Question from "../../common/Question";

const PAGINATION_MAX_ITEMS = 6;

const HistoryPanel = () => {
  const [day, setDay] = useState(milisecondsToDateString(Date.now()));
  const [paginationPage, setPaginationPage] = useState(1);

  const historyData = useSelector((state) => {
    return historyDataSelector(state);
  });

  const onPreviousDay = () => {
    const currDay = new Date(day);
    setDay(milisecondsToDateString(currDay.setDate(currDay.getDate() - 1)));
  };

  const onNextDay = () => {
    const currDay = new Date(day);
    setDay(milisecondsToDateString(currDay.setDate(currDay.getDate() + 1)));
  };

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

  let paginatedHistoryData = useMemo(() => {
    if (!historyData) return {};
    return paginatedData(historyData[day], PAGINATION_MAX_ITEMS);
  }, [historyData, day]);

  const questions =
    Object.keys(paginatedHistoryData).length > 0 ? (
      (paginatedHistoryData[paginationPage] || []).map((question) => {
        return (
          <Question
            componentType="Question"
            title={question.title}
            date={milisecondsToDateString(question.submittedAt)}
            solvedWithSolution={question.solvedWithSolution}
            completionTimeHrs={question.approxCompletionHrs}
            completionTimeMins={question.approxCompletionMins}
            questionType={question.questionType}
            difficulty={question.difficulty}
          />
        );
      })
    ) : (
      <NoFields text={`No Entries`} lg />
    );
  return (
    <div className="HistoryPanel-wrapper">
      <div className="HistoryPanel">
        <div className="HistoryPanel-header">
          <BackIcon
            onClick={onPreviousDay}
            className="HistoryPanel-header-prev HistoryPanel-header-arrow-icon"
          />
          {day}
          <NextIcon
            onClick={
              day === milisecondsToDateString(Date.now()) ? null : onNextDay
            }
            className={`HistoryPanel-header-next HistoryPanel-header-arrow-icon 
              ${
                day === milisecondsToDateString(Date.now())
                  ? "HistoryPanel-header-arrow-icon-disabled"
                  : ""
              }`}
          />
        </div>
        <div className="HistoryPanel-questions">{questions} </div>
        <div className="HistoryPanel-pagination">
          <PaginationDataSelector
            numPages={
              historyData && historyData[day]
                ? historyData[day].length % PAGINATION_MAX_ITEMS === 0
                  ? Math.floor(historyData[day].length / PAGINATION_MAX_ITEMS)
                  : Math.floor(historyData[day].length / PAGINATION_MAX_ITEMS) +
                    1
                : 0
            }
            currPage={paginationPage}
            onNext={onPaginationNext}
            onPrev={onPagnationPrev}
            onPageSelect={onPagaintionPageSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;
