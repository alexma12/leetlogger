import React from "react";
import ModalComponent from "./modalComponent";
import FormEntryNotes from "components/package-addForm/AddForm/FormEntryNotes";
import "./modalComponents.scss";
const NoteModal = ({ header }) => {
  return (
    <ModalComponent height="85%" width="70%" header={header} lg>
      <div className="NoteModal-editor">
        <FormEntryNotes type="NoteModal" />
      </div>
      <hr />
      <button className="NoteModal-save"> Save </button>
    </ModalComponent>
  );
};

export default NoteModal;
