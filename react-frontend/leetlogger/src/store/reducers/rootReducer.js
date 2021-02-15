import { combineReducers } from "redux";
import entriesReducer from "./entriesReducer";

const rootReducer = combineReducers({
  entryData: entriesReducer,
});

export default rootReducer;
