import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import QuestionTypeTitle from "components/common/QuestionTypeTitle";
import EntryModal from "./ModalComponents/EntryModal";
import NoteModal from "./ModalComponents/NoteModal";
import ReviewDateEditModal from "./ModalComponents/ReviewDateEditModal";
import DeleteEntryModal from "./ModalComponents/DeleteEntryModal";
import DeleteNoteModal from "./ModalComponents/DeleteNoteModal";
import { axiosAWSInstance } from "../../../axios";
import EntrySummary from "./QuestionPanelEntry/EntrySummary";
import { ReactComponent as RightArrow } from "svg/right-arrow.svg";
import { ReactComponent as FloppyDiskIcon } from "svg/floppy-disk.svg";
import { ReactComponent as GarbageIcon } from "svg/delete.svg";
import Datepicker from "react-datepicker";
import NoteSummary from "./QuestionPanelEntry/EntrySummary/NoteSummary";
import {
  openModal,
  closeModal,
} from "store/actions/modalActions/modalActionCreators";
import { setValidation } from "store/actions/validationActions/validationActionCreators";
import {
  editQuestionNote,
  deleteQuestionNote,
} from "store/actions/questionsActions/questionsActionCreators";
import { deleteEntry } from "store/actions/entriesActions/entriesActionCreators";
import "react-datepicker/dist/react-datepicker.css";
import "./questionPanel.scss";

const QuestionPanel = (props) => {
  const [reviewDate, setReviewDate] = useState(null);
  const [questionData, setQuestionData] = useState({});
  const [entrySelected, setEntrySelected] = useState({});
  const [entryToDelete, setEntryToDelete] = useState("");
  const [noteSelected, setNoteSelected] = useState({});
  const [noteToDelete, setNoteToDelete] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const questionID = props.match.params.questionId;
  const questionType = props.match.params.questionType;

  const retrieveData = async () => {
    await axiosAWSInstance
      .get(`/questions/${questionID}`)
      .then((res) => {
        setQuestionData(res.data);
        if (res.data.revisionDate !== -1) {
          setReviewDate(new Date(res.data.revisionDate));
        }
      })
      .catch((err) => {
        history.replace("/");
        dispatch(setValidation(err));
      });
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const entries = useSelector((state) => {
    if (
      !questionData.title ||
      !state.entryData ||
      !state.entryData.entriesByTitleMap
    )
      return [];
    return state.entryData.entriesByTitleMap[questionData.title];
  });

  const onEntryClick = (e) => {
    const selectedEntryId = e.target.id;
    if (!selectedEntryId) return;
    let selectedEntry = {};
    for (let entry of entries) {
      if (entry.entryID === selectedEntryId) {
        selectedEntry = entry;
        break;
      }
    }
    let selectedNotes = {};
    for (let note of questionData.notes) {
      if (note.entryID === selectedEntryId) {
        selectedNotes = note;
        break;
      }
    }
    setEntrySelected({ ...selectedEntry, notes: selectedNotes });

    setTimeout(() => dispatch(openModal("entry")), 400);
  };

  const entryData = useMemo(() => {
    if (!entries || Object.keys(entries) === 0) history.replace("/");

    return (entries || []).map((entry) => {
      const {
        approxCompletionHrs,
        approxCompletionMins,
        solvedWithSolution,
        tags,
        entryID,
        submittedAt,
        title,
      } = entry;
      return (
        <EntrySummary
          id={entryID}
          approxCompletionMins={approxCompletionMins}
          approxCompletionHrs={approxCompletionHrs}
          title={title}
          tags={tags}
          difficulty={questionData.difficulty}
          submittedAt={submittedAt}
          questionType={questionType}
          solvedWithSolution={solvedWithSolution}
          onEntryClick={onEntryClick}
          setEntryToDelete={setEntryToDelete}
        />
      );
    });
  }, [entries]);

  const onNoteClick = (e) => {
    const selectedNoteId = e.target.id;
    if (!selectedNoteId) return;
    for (let note of questionData.notes) {
      if (note.noteID === selectedNoteId) {
        setNoteSelected(note);
        break;
      }
    }
    dispatch(openModal("open note"));
  };

  const questionNotesData = useMemo(() => {
    return (questionData.notes || [])
      .filter((note) => {
        return note.isQuestionNote === true;
      })
      .sort((a, b) => {
        if (a.lastUpdated > b.lastUpdated) {
          return -1;
        } else {
          return 1;
        }
      })
      .map((questionNote) => {
        return (
          <NoteSummary
            title={questionNote.title}
            questionType={questionType}
            noteID={questionNote.noteID}
            lastUpdated={questionNote.lastUpdated}
            onClick={onNoteClick}
            setNoteToDelete={setNoteToDelete}
          />
        );
      });
  }, [questionData]);

  const onReviewDateChange = (date) => {
    setReviewDate(date);
  };

  const onSaveReviewDate = () => {
    dispatch(openModal("save review date"));
  };

  const onRemoveReviewDate = () => {
    dispatch(openModal("remove review date"));
  };

  const onAddNote = () => {
    dispatch(openModal("add note"));
  };

  const deleteEntryCallback = () => {
    dispatch(closeModal());
  };

  const onDeleteEntry = () => {
    dispatch(deleteEntry(entryToDelete, deleteEntryCallback));
  };

  const onDeleteNote = () => {
    const noteData = {
      noteID: noteToDelete.noteID,
      questionID,
    };
    dispatch(deleteQuestionNote(noteData, retrieveData));
  };

  const isSameReviewDate = () => {
    if (questionData.revisionDate === -1) {
      return reviewDate === null;
    }
    let originReviewDateStartOfDay = null;
    if (questionData.revisionDate) {
      originReviewDateStartOfDay = new Date(questionData.revisionDate).setHours(
        0,
        0,
        0,
        0
      );
    }

    let newReviewDateStartOfDate = null;
    if (reviewDate) {
      newReviewDateStartOfDate = reviewDate.setHours(0, 0, 0, 0);
    }
    return newReviewDateStartOfDate === originReviewDateStartOfDay;
  };

  const onSaveNote = (content, title, noteID, retrieveData) => {
    const noteObject = {
      content,
      title,
      noteID,
      questionID,
    };
    dispatch(editQuestionNote(noteObject, retrieveData));
  };
  const modalType = useSelector((state) => state.modal.modalType);

  return (
    <div
      className={`QuestionPanel ${
        modalType !== "" && "QuestionPanel-scrollOff"
      }`}
    >
      {modalType === "save review date" && (
        <ReviewDateEditModal
          originalDate={questionData.revisionDate}
          date={reviewDate}
          height="26.5%"
        />
      )}
      {modalType === "remove review date" && (
        <ReviewDateEditModal date={reviewDate} isRemove={true} height="23%" />
      )}

      {modalType === "add note" && (
        <NoteModal
          header={`${questionData.title}: New Note`}
          retrieveData={retrieveData}
        />
      )}

      {modalType === "open note" && (
        <NoteModal
          header={`${questionData.title} Note`}
          note={noteSelected}
          onSaveNote={onSaveNote}
          retrieveData={retrieveData}
        />
      )}

      {modalType === "entry" && <EntryModal entry={entrySelected} />}

      {modalType === "delete entry" && (
        <DeleteEntryModal entry={entryToDelete} onDeleteEntry={onDeleteEntry} />
      )}

      {modalType === "delete note" && (
        <DeleteNoteModal note={noteToDelete} onDeleteNote={onDeleteNote} />
      )}

      <QuestionTypeTitle
        title={questionData && questionData.title}
        onBack={() => props.history.push(`/database/${questionType}`)}
        type={questionType}
        onAdd={onAddNote}
      />
      <div className="QuestionPanel-info-bar">
        <span
          className={`QuestionPanel-info QuestionPanel-${questionData.difficulty}`}
        >{`Difficulty: ${questionData ? questionData.difficulty : ""}`}</span>
        <span className="QuestionPanel-revision">
          <span className="QuestionPanel-revision-label"> Revision Date: </span>
          <Datepicker
            selected={reviewDate}
            local="moment"
            onChange={onReviewDateChange}
            dateFormat="MMMM d, yyyy"
          />
          {!isSameReviewDate() && (
            <FloppyDiskIcon
              className="QuestionPanel-revision-save"
              onClick={onSaveReviewDate}
            />
          )}
          {questionData.revisionDate !== -1 && (
            <GarbageIcon
              className={`QuestionPanel-revision-remove ${
                !isSameReviewDate() && "QuestionPanel-revision-remove-withSave"
              }`}
              onClick={onRemoveReviewDate}
            />
          )}
        </span>
        <a
          href={questionData?.url}
          target="_blank"
          rel="noreferrer"
          className={`QuestionPanel-info QuestionPanel-url QuestionPanel-${questionType}`}
        >
          Go To Leetcode Question
          <RightArrow className="QuestionPanel-url-icon" />
        </a>
      </div>
      <div className="QuestionPanel-box">
        {questionNotesData.length > 0 && (
          <div className="QuestionPanel-box-header">Notes</div>
        )}
        <div className="QuestionPanel-entries">{questionNotesData}</div>
        <div className="QuestionPanel-box-header">Entries</div>
        <div className="QuestionPanel-entries">{entryData}</div>
      </div>
    </div>
  );
};

export default QuestionPanel;
