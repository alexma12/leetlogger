import React from "react";
import FormEntryDetails from "./FormEntryDetails";
import FormEntryNotes from "./FormEntryNotes";
import "./addForm.scss";

const AddForm = () => {
  return (
    <div className="AddForm-wrapper">
      <div className="AddForm">
        <div className="AddForm-title">Log A New Entry</div>
        <FormEntryDetails />
        <FormEntryNotes />
        <button className="AddForm-submit"> Submit Entry</button>
        <div className="AddForm-empty"></div>
      </div>
    </div>
  );
};

export default AddForm;
