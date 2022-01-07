import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "./ModalComponent";
import FormEntryNotes from "components/package-addForm/AddForm/FormEntryNotes";
import { useLocation } from "react-router-dom";
import { saveQuestionNote } from "store/actions/questionsActions/questionsActionCreators";
import Spinner from "components/common/Spinner";
import "./modalComponents.scss";

const SPINNER_FOR_NOTE_MODAL = "SPINNER_FOR_NOTE_MODAL";

const NoteModal = ({ header, note, onSaveNote, retrieveData }) => {
  const [notesState, setNotesState] = useState((note && note.content) || "");
  const [title, setTitle] = useState((note && note.title) || "");
  const [titleInvalid, setTitleInvalid] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const modalType = useSelector((state) => state.modal.modalType);

  const isNoteModalLoading = useSelector((state) => {
    return state.spinner.spinnerType === SPINNER_FOR_NOTE_MODAL;
  });

  const questionID = location.pathname.split("/")[3];

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

  const disableSaveButton =
    notesState === note?.content && title === note?.title;

  return (
    <ModalComponent height="81rem" width="70%" header={header} type="NoteModal">
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
      {isNoteModalLoading ? (
        <div className="NoteModal-spinner">
          <Spinner color="#3f85e070" />
        </div>
      ) : (
        <button
          className={`NoteModal-button ${
            disableSaveButton ? "NoteModal-save-disabled" : "NoteModal-save"
          }`}
          onClick={
            modalType === "add note"
              ? onAddQuestionNote
              : disableSaveButton
              ? null
              : onSaveQuestionNote
          }
        >
          Save
        </button>
      )}
    </ModalComponent>
  );
};

export default NoteModal;
