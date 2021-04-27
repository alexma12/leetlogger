import React from "react";
import { useDispatch } from "react-redux";

import { closeModal } from "store/actions/modalActions/modalActionCreators";
import ModalComponent from "./ModalComponent";

const DeleteNoteModal = ({ note, onDeleteNote }) => {
  const dispatch = useDispatch();
  return (
    <ModalComponent height="26.5%" width="45%" header="Confirmation">
      <div className="ReviewDateEditModal">
        <div> Would you like to proceed in deleting note: </div>
        <div>
          <span className="ReviewDateEditModal-date">{`${note.title}`}</span>{" "}
          <span> ? </span>
        </div>
      </div>
      <hr />
      <div className="ReviewDateEditModal-buttons">
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
    </ModalComponent>
  );
};

export default DeleteNoteModal;
