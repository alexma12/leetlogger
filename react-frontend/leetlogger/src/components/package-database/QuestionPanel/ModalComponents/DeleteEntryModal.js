import React from "react";
import { useDispatch } from "react-redux";

import { closeModal } from "store/actions/modalActions/modalActionCreators";
import ModalComponent from "./ModalComponent";

const DeleteNoteModal = ({ entry, onDeleteEntry }) => {
  const dispatch = useDispatch();
  return (
    <ModalComponent height="22%" width="45%" header="Confirmation">
      <div className="ReviewDateEditModal">
        <div> Would you like to proceed in deleting the entry? </div>
      </div>
      <hr />
      <div className="ReviewDateEditModal-buttons">
        <button
          className="ReviewDateEditModal-button ReviewDateEditModal-button-yes"
          onClick={() => onDeleteEntry()}
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
