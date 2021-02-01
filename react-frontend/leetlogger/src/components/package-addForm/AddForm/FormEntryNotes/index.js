import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "./formEntryNotes.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const FormEntryNotes = () => {
  return (
    <div className="FormEntryNotes">
      <div className="FormEntryNotes-title">Notes</div>

      <div className="FormEntryNotes-editor">
        <Editor
          placeholder="Type Your Notes Here"
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
        />
      </div>
    </div>
  );
};

export default FormEntryNotes;
