import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeModal } from "store/actions/modalActions/modalActionCreators";
import ModalComponent from "./ModalComponent";
import Spinner from "components/common/Spinner";

const SPINNER_FOR_DELETE_NOTE = "SPINNER_FOR_DELETE_NOTE";

const DeleteNoteModal = ({ note, onDeleteNote }) => {
  const dispatch = useDispatch();

  const isDeleteNoteLoading = useSelector((state) => {
    return state.spinner.spinnerType === SPINNER_FOR_DELETE_NOTE;
  });
  return (
    <ModalComponent height="25rem" width="45%" header="Confirmation">
      <div className="ReviewDateEditModal">
        <div> Would you like to proceed in deleting note: </div>
        <div>
          <span className="ReviewDateEditModal-date">{`${note.title}`}</span>{" "}
          <span> ? </span>
        </div>
      </div>
      <hr />
      <div className="ReviewDateEditModal-buttons">
        {isDeleteNoteLoading ? (
          <div className="ReviewDateEditModal-spinner">
            <Spinner />
          </div>
        ) : (
          <div>
            <button
              className="ReviewDateEditModal-button ReviewDateEditModal-button-yes"
              onClick={() => onDeleteNote()}
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
        )}
      </div>
    </ModalComponent>
  );
};

export default DeleteNoteModal;
