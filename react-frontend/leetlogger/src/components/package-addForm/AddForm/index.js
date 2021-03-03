import React, { useState } from "react";
import FormEntryDetails from "./FormEntryDetails";
import FormEntryNotes from "./FormEntryNotes";
import { v4 as uuidv4 } from "uuid";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { capitalizeFirstCharacters } from "lib/text-helpers";
import { stateToHTML } from "draft-js-export-html";
import draftToHtml from "draftjs-to-html";
import "./addForm.scss";

const AddForm = () => {
  const [url, setUrl] = useState("");
  const [solved, setSolved] = useState(false);
  const [completionHrs, setCompletionHrs] = useState(null);
  const [completionMins, setCompletionMins] = useState(null);
  const [reviewLater, setReviewLater] = useState(false);
  const [reviewDate, setReviewDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [subTypes, setSubTypes] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [subTypeInput, setSubTypeInput] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const formDetailValues = {
    url,
    solved,
    completionHrs,
    completionMins,
    reviewLater,
    reviewDate,
    title,
    questionType,
    subTypes,
    difficulty,
    subTypeInput,
  };

  const handleStringInputChange = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "url":
        setUrl(value);
        if (
          value.startsWith("https://leetcode.com/problems/") ||
          value.startsWith("leetcode.com/problems/")
        ) {
          let titleString = "";
          if (value.startsWith("https://leetcode.com/problems/")) {
            titleString = value.replace("https://leetcode.com/problems/", "");
          } else {
            titleString = value.replace("leetcode.com/problems/", "");
          }
          const urlStringArr = titleString.split("/");
          const titleStringArr = urlStringArr[0].split("-");
          const title = titleStringArr.reduce((acc, curr) => {
            return acc + " " + capitalizeFirstCharacters(curr);
          }, "");

          setTitle(title);
        }
        break;
      case "subTypes":
        setSubTypeInput(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleBooleanInputChange = (e) => {
    switch (e.target.id) {
      case "willReview":
        setReviewLater(true);
        break;
      case "wontReview":
        setReviewLater(false);
        break;
      case "withSolution":
        setSolved(true);
        break;
      case "withoutSolution":
        setSolved(false);
        break;
      default:
        break;
    }
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "hrs":
        if (value < 0 || value > 100) return;
        setCompletionHrs(value);
        break;
      case "mins":
        if (value < 0 || value > 60) return;
        setCompletionMins(value);
        break;
      default:
        break;
    }
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.value);
  };

  const handleTypeChange = (e) => {
    setQuestionType(e.value);
  };

  const handleAddSubType = () => {
    if (subTypeInput === "") return;
    setSubTypes((currSubTypes) => {
      return [...currSubTypes, { title: subTypeInput, id: uuidv4() }];
    });
    setSubTypeInput("");
  };

  const handleRemoveSubType = (e) => {
    setSubTypes((currSubTypes) => {
      return currSubTypes.filter((subType) => subType.id !== e.target.id);
    });
  };

  const onEditorStateChange = (edtiorState) => {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(edtiorState);
  };
  return (
    <div className="AddForm-wrapper">
      <div className="AddForm">
        <div className="AddForm-title">Log A New Entry</div>
        <FormEntryDetails
          formGetters={formDetailValues}
          onStringChange={handleStringInputChange}
          onDifficultyChange={handleDifficultyChange}
          onTypeChange={handleTypeChange}
          onTimeChange={handleTimeChange}
          onBoolChange={handleBooleanInputChange}
          onReviewDateChange={setReviewDate}
          onAddSubType={handleAddSubType}
          onRemoveSubType={handleRemoveSubType}
        />
        <FormEntryNotes
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
        <button className="AddForm-submit"> Submit Entry</button>
        <div className="AddForm-empty"></div>
      </div>
    </div>
  );
};

export default AddForm;
