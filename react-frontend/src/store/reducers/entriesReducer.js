import * as actionTypes from "../actions/entriesActions/entriesActionTypes";

const initialState = {};

const entriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALL_ENTRIES:
      return {
        ...state,
        allEntries: action.data,
      };

    case actionTypes.SET_MAPPED_ENTRY_DATA:
      const {
        calendarData,
        weekEntryBarGraphData,
        monthEntryBarGraphData,
        threeMonthEntryBarGraphData,
        sixMonthEntryBarGraphData,
        yearEntryBarGraphData,
        allTimeBarGraphData,
        statistics,
        history,
        recentEntries,
        entriesByTitleMap,
      } = action.data;

      return {
        ...state,
        calendarData,
        weekEntryBarGraphData,
        monthEntryBarGraphData,
        threeMonthEntryBarGraphData,
        sixMonthEntryBarGraphData,
        yearEntryBarGraphData,
        allTimeBarGraphData,
        statistics,
        history,
        recentEntries,
        entriesByTitleMap,
      };

    default:
      return state;
  }
};

export default entriesReducer;
