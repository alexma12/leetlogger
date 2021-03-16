import { combineReducers } from "redux";
import entriesReducer from "./entriesReducer";
import questionsReducer from "./questionsReducer";
import validationReducer from "./validationReducer";
import modalReducer from "./modalReducer";
const rootReducer = combineReducers({
  entryData: entriesReducer,
  questionData: questionsReducer,
  validation: validationReducer,
  modal: modalReducer,
});

export default rootReducer;
