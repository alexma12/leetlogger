import { combineReducers } from "redux";
import entriesReducer from "./entriesReducer";
import questionsReducer from "./questionsReducer";

const rootReducer = combineReducers({
  entryData: entriesReducer,
  questionData: questionsReducer,
});

export default rootReducer;
