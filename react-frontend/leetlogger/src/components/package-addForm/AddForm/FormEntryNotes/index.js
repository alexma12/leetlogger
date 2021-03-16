import React, { createRef } from "react";
import "./formEntryNotes.scss";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const FormEntryNotes = ({
  notesState,
  onNotesStateChange,
  type,
  readOnly = false,
}) => {
  const Size = Quill.import("formats/size");
  Size.whitelist = ["small", "medium", "large"];

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  return (
    <div
      className={`FormEntryNotes ${
        type === "NoteModal" && "FormEntryNotes-lg"
      }`}
    >
      {!type && <div className="FormEntryNotes-title">Notes</div>}
      <div className="FormEntryNotes-editor">
        <div id="toolbar" className={readOnly && "hide-toolbar"}>
          <span className="ql-formats">
            <button id="bold" className="ql-bold" />
            <button id="italic" className="ql-italic" />
            <button id="underline" className="ql-underline" />
          </span>
          <span className="ql-formats">
            <select id="size" className="ql-size" defaultValue="medium">
              <option value="small">Size 1</option>
              <option value="medium">Size 2</option>
              <option value="large">Size 3</option>
            </select>
          </span>
          <span className="ql-formats">
            <button id="list-1" className="ql-list" value="ordered" />
            <button id="list-2" className="ql-list" value="bullet" />
            <button id="indent-1" className="ql-indent" value="-1" />
            <button id="indent-2" className="ql-indent" value="+1" />
          </span>
          <span className="ql-formats">
            <select id="align" className="ql-align" />
            <select id="color" className="ql-color" />
            <select id="background" className="ql-background" />
          </span>
          <span className="ql-formats">
            <button id="image" className="ql-image" />
          </span>
          <span className="ql-formats">
            <button id="code-block" className="ql-code-block" />
          </span>
        </div>

        <ReactQuill
          onChange={onNotesStateChange}
          placeholder={!readOnly && "Type Notes Here"}
          value={notesState}
          modules={modules}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default FormEntryNotes;
