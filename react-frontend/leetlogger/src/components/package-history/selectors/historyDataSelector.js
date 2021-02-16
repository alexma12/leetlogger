import { createSelector } from "reselect";

const getHistoryData = (state) => {
  return state.entryData.history;
};

const historyDataSelector = createSelector(getHistoryData, (historyData) => {
  return historyData;
});

export default historyDataSelector;
