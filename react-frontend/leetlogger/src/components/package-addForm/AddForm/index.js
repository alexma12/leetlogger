import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormEntryDetails from "./FormEntryDetails";
import FormEntryNotes from "./FormEntryNotes";
import { v4 as uuidv4 } from "uuid";
import { capitalizeFirstCharacters } from "utils/textHelpers";
import { saveEntry } from "store/actions/entriesActions/entriesActionCreators";
import {
  setValidation,
  removeValidation,
} from "store/actions/validationActions/validationActionCreators";
import { validateValues, formatEntryBody } from "utils/addFormHelpers";
import "./addForm.scss";

const AddForm = (props) => {
  const [url, setUrl] = useState("");
  const [solved, setSolved] = useState(false);
  const [completionHrs, setCompletionHrs] = useState(null);
  const [completionMins, setCompletionMins] = useState(null);
  const [reviewLater, setReviewLater] = useState(false);
  const [reviewDate, setReviewDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [tags, setTags] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [notesState, setNotesState] = useState("");

  const formDetailValues = {
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
  };

  const dispatch = useDispatch();

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
      case "tags":
        setTagInput(e.target.value);
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

  const handleAddTag = () => {
    if (tagInput === "") return;
    setTags((currTags) => {
      return [...currTags, { title: tagInput, id: uuidv4() }];
    });
    setTagInput("");
  };

  const handleRemoveTag = (e) => {
    setTags((currTags) => {
      return currTags.filter((tag) => tag.id !== e.target.id);
    });
  };

  const onNotesStateChange = (value) => {
    setNotesState(value);
  };

  const onHandleSubmitEntry = async (e) => {
    e.preventDefault();
    const validation = validateValues(formDetailValues);
    if (validation !== true) {
      dispatch(
        setValidation({
          message: validation,
        })
      );
      setTimeout(() => {
        dispatch(removeValidation());
      }, 15000);
      return;
    }

    const formattedEntry = formatEntryBody(formDetailValues, notesState);
    await dispatch(saveEntry(formattedEntry));
    props.history.replace("/");
  };
  return (
    <div className="AddForm-wrapper">
      <form className="AddForm" onSubmit={onHandleSubmitEntry}>
        <div className="AddForm-title">Log A New Entry</div>
        <FormEntryDetails
          formGetters={formDetailValues}
          onStringChange={handleStringInputChange}
          onDifficultyChange={handleDifficultyChange}
          onTypeChange={handleTypeChange}
          onTimeChange={handleTimeChange}
          onBoolChange={handleBooleanInputChange}
          onReviewDateChange={setReviewDate}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
        <FormEntryNotes
          notesState={notesState}
          onNotesStateChange={onNotesStateChange}
        />
        <button className="AddForm-submit" type="submit">
          {" "}
          Submit Entry
        </button>
        <div className="AddForm-empty"></div>
      </form>
    </div>
  );
};

export default AddForm;
