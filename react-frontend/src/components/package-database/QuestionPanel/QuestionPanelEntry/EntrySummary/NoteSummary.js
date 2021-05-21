import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { openModal } from "store/actions/modalActions/modalActionCreators";

import "./entrySummary.scss";
const NoteSummary = ({
  title,
  onClick,
  lastUpdated,
  questionType,
  noteID,
  setNoteToDelete,
}) => {
  const dispatch = useDispatch();

  const openDeleteNoteModal = () => {
    dispatch(openModal("delete note"));
    setNoteToDelete({ title, noteID });
  };
  return (
    <div
      id={noteID}
      className={`EntrySummary NoteEntry NoteEntry-${questionType}-note`}
      onClick={onClick}
    >
      <div id={noteID} className="EntrySummary-title">
        {title}
      </div>

      <div id={noteID} className="NoteEntry-lastUpdated">
        {moment(new Date(lastUpdated)).fromNow()}
      </div>

      <div className="NoteEntry-delete" onClick={openDeleteNoteModal}>
        x
      </div>
    </div>
  );
};

export default NoteSummary;
