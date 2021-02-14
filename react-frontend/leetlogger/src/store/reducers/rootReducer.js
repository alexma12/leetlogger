import { combineReducers } from "redux";
import entriesReducer from "./entriesReducer";

const rootReducer = combineReducers({
  entries: entriesReducer,
});

export default rootReducer;
