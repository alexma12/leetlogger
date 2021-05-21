import React from "react";
import ModalComponent from "./ModalComponent";
import FormEntryNotes from "components/package-addForm/AddForm/FormEntryNotes";
import "./modalComponents.scss";
import { milisecondsToDateString } from "utils/dateHelpers";
const EntryModal = ({ entry }) => {
  const {
    notes,
    submittedAt,
    approxCompletionHrs,
    approxCompletionMins,
    tags,
    solvedWithSolution,
    title,
  } = entry;

  const tagComponents = tags.length > 0 ? tags.join(",") : "N/A";

  return (
    <ModalComponent
      height="80rem"
      width="75%"
      paddingTop="3rem"
      header={`${title} - Entry - ${milisecondsToDateString(submittedAt)}`}
      type="EntryModal"
    >
      <div className="NoteModal-box">
        <div className={"NoteModal-info"}>
          <div
            className={`EntryModal-solved ${
              solvedWithSolution
                ? "EntryModal-solvedWithSolution"
                : "EntryModal-solvedWithoutSolution"
            }`}
          >
            {`${
              solvedWithSolution
                ? "Solved With Solution"
                : "Solved Without Solution"
            }`}
          </div>
          <div className="EntryModal-completionTime">
            Completion Time:
            <span className="EntryModal-completionTime-time">
              {`${approxCompletionHrs} ${
                approxCompletionHrs === 1 ? " hr" : " hrs"
              } ${approxCompletionMins} ${
                approxCompletionMins === 1 ? " min" : " mins"
              }`}
            </span>
          </div>
          <div className="EntryModal-tags-box">
            Entry Tags: <div className="EntryModal-tags"> {tagComponents}</div>
          </div>
        </div>

        <div className="EntryModal-editor">
          <div className="EntryModal">
            <FormEntryNotes
              type="EntryModal"
              readOnly={true}
              notesState={notes.content || ""}
            />
          </div>
        </div>
      </div>
    </ModalComponent>
  );
};

export default EntryModal;
