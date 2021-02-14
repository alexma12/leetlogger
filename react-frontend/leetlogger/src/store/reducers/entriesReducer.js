import * as actionTypes from "../actions/entriesActions/entriesActionTypes";

const initialState = { allEntries: [] };

const allEntriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALL_ENTRIES:
      return {
        ...state,
        allEntries: action.data,
      };

    default:
      return state;
  }
};

export default allEntriesReducer;
