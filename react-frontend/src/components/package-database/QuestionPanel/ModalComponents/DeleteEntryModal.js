import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeModal } from "store/actions/modalActions/modalActionCreators";
import ModalComponent from "./ModalComponent";
import Spinner from "components/common/Spinner";

const SPINNER_FOR_DELETE_ENTRY = "SPINNER_FOR_DELETE_ENTRY";

const DeleteNoteModal = ({ entry, onDeleteEntry }) => {
  const dispatch = useDispatch();
  const isDeleteEntryLoading = useSelector((state) => {
    return state.spinner.spinnerType === SPINNER_FOR_DELETE_ENTRY;
  });
  return (
    <ModalComponent height="22rem" width="45%" header="Confirmation">
      <div className="ReviewDateEditModal">
        <div> Would you like to proceed in deleting this entry? </div>
      </div>
      <hr />
      <div className="ReviewDateEditModal-buttons">
        {isDeleteEntryLoading ? (
          <div className="ReviewDateEditModal-spinner">
            <Spinner />
          </div>
        ) : (
          <div>
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
        )}
      </div>
    </ModalComponent>
  );
};

export default DeleteNoteModal;
