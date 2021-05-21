import { combineReducers } from "redux";
import entriesReducer from "./entriesReducer";
import questionsReducer from "./questionsReducer";
import validationReducer from "./validationReducer";
import modalReducer from "./modalReducer";
import spinnerReducer from "./spinnerReducer";

const rootReducer = combineReducers({
  entryData: entriesReducer,
  questionData: questionsReducer,
  validation: validationReducer,
  modal: modalReducer,
  spinner: spinnerReducer,
});

export default rootReducer;
