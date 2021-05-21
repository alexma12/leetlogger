import React from "react";
import FormEntryText from "./FormEntryText";
import FormEntryRadio from "./FormEntryRadio";
import FormEntrySelect from "./FormEntrySelect";
import FormEntryRadioDropdown from "./FormEntryRadioDropdown";
import FormEntryTime from "./FormEntryTime";
import FormEntryTags from "./FormEntryTags";
import "./formEntryDetails.scss";

const FormEntryDetails = ({
  formGetters,
  onStringChange,
  onDifficultyChange,
  onTypeChange,
  onTimeChange,
  onBoolChange,
  onReviewDateChange,
  onAddTag,
  onRemoveTag,
}) => {
  const {
    url,
    solved,
    completionHrs,
    completionMins,
    reviewLater,
    reviewDate,
    title,
    questionType,
    tags,
    difficulty,
    tagInput,
  } = formGetters;

  return (
    <div className="FormEntryDetails">
      <FormEntryText
        label="Url"
        placeholder="leetcode.com/problems/two-sum"
        value={url}
        onChange={onStringChange}
      />
      <FormEntryText
        label="title"
        placeholder="Title Generated From Url"
        value={title}
      />
      <FormEntrySelect
        label="difficulty"
        value={difficulty}
        onChange={onDifficultyChange}
      />
      <FormEntrySelect
        label="type"
        value={questionType}
        onChange={onTypeChange}
      />
      <FormEntryTags
        tags={tags}
        inputValue={tagInput}
        onInputChange={onStringChange}
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
      />
      <FormEntryRadio
        label="Solved"
        placeholder="Enter Leetcode Question Url"
        value={solved}
        onBoolChange={onBoolChange}
      />
      <FormEntryTime
        label="Completion Time"
        hrs={completionHrs}
        mins={completionMins}
        onChange={onTimeChange}
        completionHrs={completionHrs}
        completionMins={completionMins}
      />
      <FormEntryRadioDropdown
        label="Review Later"
        reviewLater={reviewLater}
        reviewDate={reviewDate}
        onBoolChange={onBoolChange}
        onDateChange={onReviewDateChange}
      />
    </div>
  );
};

export default FormEntryDetails;
