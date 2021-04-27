import React from "react";
import { useDispatch } from "react-redux";
import ModalComponent from "./ModalComponent";
import "./modalComponents.scss";
import { milisecondsToDateString } from "utils/dateHelpers";
import { closeModal } from "store/actions/modalActions/modalActionCreators";
import { useHistory } from "react-router-dom";
import {
  editRevisionDate,
  removeRevisionDate,
} from "store/actions/questionsActions/questionsActionCreators";
import { getStartOfDayInMiliseconds } from "utils/dateHelpers";
import {
  setValidation,
  removeValidation,
} from "store/actions/validationActions/validationActionCreators";

const ReviewDateEditModal = ({ originalDate, date, isRemove, height }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const questionID = history.location.pathname.split("/")[3];

  const refresh = () => {
    history.go(0);
  };
  const onClickYes = () => {
    if (isRemove) {
      dispatch(removeRevisionDate(questionID, refresh));
    } else {
      const dateInMiliSeconds = getStartOfDayInMiliseconds(date);
      if (dateInMiliSeconds < getStartOfDayInMiliseconds(Date.now())) {
        dispatch(closeModal());
        dispatch(
          setValidation({
            message:
              "You Can Only Set The Revision Date Of Question To A Future Date",
          })
        );
        setTimeout(() => {
          dispatch(removeValidation());
        }, 10000);
      } else {
        dispatch(editRevisionDate(dateInMiliSeconds, questionID, refresh));
      }
    }
  };
  let formattedDate;
  if (date) {
    formattedDate = milisecondsToDateString(new Date(date).getTime());
  }
  return (
    <ModalComponent height={height} width="50%" header="Confirmation">
      <div className="ReviewDateEditModal">
        {isRemove
          ? `Would You Like To Proceed In Removing The Revision Date: `
          : originalDate === -1
          ? `Would You Like To Proceed In Setting The Revision Date To `
          : `Would You Like To Proceed In Changing The Revision Date From `}

        {originalDate && originalDate !== -1 && (
          <span>
            <span className="ReviewDateEditModal-date">
              {`${milisecondsToDateString(originalDate)} `}
            </span>
            {" To "}
          </span>
        )}

        {isRemove ? (
          <span>
            <span className="ReviewDateEditModal-date">{formattedDate}</span> ?
          </span>
        ) : (
          <div>
            <span className="ReviewDateEditModal-date">{formattedDate}</span> ?
          </div>
        )}
      </div>
      <hr />
      <div className="ReviewDateEditModal-buttons">
        <button
          className="ReviewDateEditModal-button ReviewDateEditModal-button-yes"
          onClick={onClickYes}
        >
          Yes
        </button>
        <button
          className="ReviewDateEditModal-button ReviewDateEditModal-button-no"
          onClick={() => dispatch(closeModal())}
        >
          No
        </button>
      </div>
    </ModalComponent>
  );
};

export default ReviewDateEditModal;
