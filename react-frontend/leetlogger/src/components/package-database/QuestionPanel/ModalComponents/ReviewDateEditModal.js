import React from "react";
import { useDispatch } from "react-redux";
import ModalComponent from "./modalComponent";
import "./modalComponents.scss";
import { milisecondsToDateString } from "utils/dateHelpers";
import { closeModal } from "store/actions/modalActions/modalActionCreators";

const ReviewDateEditModal = ({ date, isRemove, height }) => {
  const dispatch = useDispatch();
  let formattedDate;
  if (date) {
    formattedDate = milisecondsToDateString(new Date(date).getTime());
  }
  return (
    <ModalComponent height={height} width="50%" header="Confirmation">
      <div className="ReviewDateEditModal">
        {isRemove
          ? `Would You Like To Proceed In Removing The Revision Date ?`
          : `Would You Like To Proceed In Setting The Revision Date To`}

        {!isRemove && (
          <div className="ReviewDateEditModal-date">{formattedDate}?</div>
        )}
      </div>
      <hr />
      <div className="ReviewDateEditModal-buttons">
        <button className="ReviewDateEditModal-button ReviewDateEditModal-button-yes">
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
