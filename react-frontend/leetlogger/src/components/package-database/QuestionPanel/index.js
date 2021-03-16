import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionTypeTitle from "components/common/QuestionTypeTitle";
import EntryModal from "./ModalComponents/EntryModal";
import NoteModal from "./ModalComponents/NoteModal";
import ReviewDateEditModal from "./ModalComponents/ReviewDateEditModal";
import { axiosAWSInstance } from "../../../axios";
import EntrySummary from "./QuestionPanelEntry/EntrySummary";
import { ReactComponent as RightArrow } from "svg/right-arrow.svg";
import { ReactComponent as CheckmarkIcon } from "svg/checkmark.svg";
import Datepicker from "react-datepicker";
import {
  openModal,
  closeModal,
} from "store/actions/modalActions/modalActionCreators";
import "./questionPanel.scss";

const QuestionPanel = (props) => {
  const [reviewDate, setReviewDate] = useState(null);
  const [questionData, setQuestionData] = useState({});
  const [entrySelected, setEntrySelected] = useState({});

  const dispatch = useDispatch();

  const questionID = props.match.params.questionId;

  const questionType = props.match.params.questionType;
  useEffect(() => {
    axiosAWSInstance
      .get(`/questions/${questionID}`)
      .then((res) => {
        setQuestionData(res.data);
        if (res.data.revisionDate !== -1) {
          setReviewDate(new Date(res.data.revisionDate));
        }
      })
      .catch((err) => console.log(err));
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
    if (Object.keys(entries) === 0) return [];

    return entries.map((entry) => {
      const {
        approxCompletionHrs,
        approxCompletionMins,
        solvedWithSolution,
        tags,
        entryID,
        submittedAt,
      } = entry;

      return (
        <EntrySummary
          id={entryID}
          approxCompletionMins={approxCompletionMins}
          approxCompletionHrs={approxCompletionHrs}
          tags={tags}
          difficulty={questionData.difficulty}
          submittedAt={submittedAt}
          questionType={questionType}
          solvedWithSolution={solvedWithSolution}
          onEntryClick={onEntryClick}
        />
      );
    });
  }, [entries]);

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

  const modalType = useSelector((state) => state.modal.modalType);

  return (
    <div
      className={`QuestionPanel ${
        modalType !== "" && "QuestionPanel-scrollOff"
      }`}
    >
      {modalType === "save review date" && (
        <ReviewDateEditModal date={reviewDate} height="26.5%" />
      )}
      {modalType === "remove review date" && (
        <ReviewDateEditModal isRemove={true} height="23%" />
      )}

      {modalType === "add note" && (
        <NoteModal header={`${questionData.title}: New Note`} />
      )}

      {modalType === "entry" && <EntryModal entry={entrySelected} />}

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
            onChange={onReviewDateChange}
            dateFormat="MMMM d, yyyy"
          />
          {!isSameReviewDate() && (
            <CheckmarkIcon
              className="QuestionPanel-revision-save"
              onClick={onSaveReviewDate}
            />
          )}
          {reviewDate && (
            <span
              className={`QuestionPanel-revision-remove ${
                !isSameReviewDate() && "QuestionPanel-revision-remove-withSave"
              }`}
              onClick={onRemoveReviewDate}
            >
              x
            </span>
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
        <div className="QuestionPanel-box-header">Notes</div>
        <div className="QuestionPanel-entries"></div>
        <div className="QuestionPanel-box-header">Entries</div>
        <div className="QuestionPanel-entries">{entryData}</div>
      </div>
    </div>
  );
};

export default QuestionPanel;
