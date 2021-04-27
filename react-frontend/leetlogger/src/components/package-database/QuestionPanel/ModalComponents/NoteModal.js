import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "./ModalComponent";
import FormEntryNotes from "components/package-addForm/AddForm/FormEntryNotes";
import { useHistory } from "react-router-dom";
import { saveQuestionNote } from "store/actions/questionsActions/questionsActionCreators";
import "./modalComponents.scss";
const NoteModal = ({ header, note, onSaveNote, retrieveData }) => {
  const [notesState, setNotesState] = useState((note && note.content) || "");
  const [title, setTitle] = useState((note && note.title) || "");
  const [titleInvalid, setTitleInvalid] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const modalType = useSelector((state) => state.modal.modalType);

  const questionID = history.location.pathname.split("/")[3];

  const onNotesStateChange = (value) => {
    setNotesState(value);
  };

  const onAddQuestionNote = () => {
    if (title.trim() === "") {
      inputRef.current.focus();
      return setTitleInvalid(true);
    }
    const noteObject = {
      title,
      content: notesState,
      questionID,
    };
    dispatch(saveQuestionNote(noteObject, retrieveData));
  };

  const onSaveQuestionNote = () => {
    if (title.trim() === "") {
      inputRef.current.focus();
      return setTitleInvalid(true);
    }
    onSaveNote(notesState, title, note.noteID, retrieveData);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <ModalComponent height="85%" width="70%" header={header} lg>
      <div className="NoteModal-title">
        Title:
        <input
          className={`NoteModal-title-input ${
            titleInvalid && "NoteModal-title-input-invalid"
          }`}
          ref={inputRef}
          value={title}
          onChange={onTitleChange}
          placeholder="Enter Note Title Here"
        />
      </div>
      <div className="NoteModal-editor">
        <FormEntryNotes
          type="NoteModal"
          notesState={notesState}
          onNotesStateChange={onNotesStateChange}
        />
      </div>

      <button
        className="NoteModal-button NoteModal-save"
        onClick={
          modalType === "add note" ? onAddQuestionNote : onSaveQuestionNote
        }
      >
        Save
      </button>
    </ModalComponent>
  );
};

export default NoteModal;
