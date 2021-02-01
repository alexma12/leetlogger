import React from "react";
import FormEntryText from "./FormEntryText";
import FormEntryRadio from "./FormEntryRadio";
import FormEntrySelect from "./FormEntrySelect";
import FormEntryRadioDropdown from "./FormEntryRadioDropdown";
import FormEntryTime from "./FormEntryTime";
import FormEntryTags from "./FormEntryTags";
import "./formEntryDetails.scss";

const FormEntryDetails = () => {
  return (
    <div className="FormEntryDetails">
      <FormEntryText label="title" placeholder="Enter Question Title" />
      <FormEntrySelect label="type" />
      <FormEntryTags />
      <FormEntrySelect label="difficulty" />
      <FormEntryText label="Url" placeholder="Enter Leetcode Question Url" />
      <FormEntryRadio
        label="Solved"
        placeholder="Enter Leetcode Question Url"
      />
      <FormEntryTime label="Completion Time" />
      <FormEntryRadioDropdown label="Review Later" />
    </div>
  );
};

export default FormEntryDetails;
