import React from "react";
import ModalComponent from "./modalComponent";
import FormEntryNotes from "components/package-addForm/AddForm/FormEntryNotes";
import "./modalComponents.scss";
import { milisecondsToDateString } from "utils/dateHelpers";
const EntryModal = ({ entry }) => {
  const {
    notes,
    submittedAt,
    approxCompletionHrs,
    approxCompletionMins,
    tag,
    solvedWithSolution,
    title,
  } = entry;

  console.log(entry);
  return (
    <ModalComponent
      height="85%"
      width="70%"
      paddingRight="2rem"
      header={`${title} Entry - ${milisecondsToDateString(submittedAt)}`}
      lg
    >
      <div className="NoteModal-editor">
        <FormEntryNotes
          //   type="NoteModal"
          readOnly={true}
          notesState={notes.content}
        />
      </div>
      <hr />
      <button className="NoteModal-save"> Save </button>
    </ModalComponent>
  );
};

export default EntryModal;
