import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "./formEntryNotes.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const FormEntryNotes = ({ editorState, onEditorStateChange }) => {
  return (
    <div className="FormEntryNotes">
      <div className="FormEntryNotes-title">Notes</div>

      <div className="FormEntryNotes-editor">
        <Editor
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "colorPicker",
              "list",
              "textAlign",
              "history",
            ],
            inline: {
              options: ["bold", "underline"],
            },
            fontSize: {
              icon: undefined,
            },
          }}
          placeholder="Type Your Notes Here"
          onEditorStateChange={onEditorStateChange}
          editorState={editorState}
        />
      </div>
    </div>
  );
};

export default FormEntryNotes;
