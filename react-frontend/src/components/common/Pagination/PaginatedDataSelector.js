import React from "react";
import { ReactComponent as BackIcon } from "svg/back.svg";
import { ReactComponent as NextIcon } from "svg/next.svg";

import "./paginationDataSelector.scss";
const PaginatedDataSelector = ({
  numPages,
  onPrev,
  onPageSelect,
  onNext,
  top,
  currPage,
  sm,
}) => {
  const componentArr = [];
  if (numPages !== 0) {
    for (let i = 1; i <= numPages; i++) {
      componentArr.push(
        <span
          id={i}
          className={`PaginationDataSelector-page  ${
            sm && "PaginationDataSelector-page-sm"
          } ${i === currPage ? "PaginationDataSelector-page-active" : ""}`}
          onClick={onPageSelect}
        >
          {i}
        </span>
      );
    }
  }
  return (
    numPages !== 0 && (
      <div className="PaginationDataSelector">
        <BackIcon
          className={`PaginationDataSelector-icon ${
            sm && "PaginationDataSelector-icon-sm"
          } ${currPage === 1 ? "PaginationDataSelector-icon-disabled" : ""}`}
          onClick={currPage === 1 ? null : onPrev}
        />
        <span className="PaginationDataSelector-page-box">{componentArr}</span>
        <NextIcon
          className={`PaginationDataSelector-icon ${
            sm && "PaginationDataSelector-icon-sm"
          } ${currPage === numPages && "PaginationDataSelector-icon-disabled"}`}
          onClick={currPage === numPages ? null : onNext}
        />
      </div>
    )
  );
};

export default PaginatedDataSelector;
