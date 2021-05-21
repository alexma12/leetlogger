import { createSelector } from "reselect";
const getBarGraphValues = (state) => {
  const {
    weekEntryBarGraphData,
    monthEntryBarGraphData,
    threeMonthEntryBarGraphData,
    sixMonthEntryBarGraphData,
    yearEntryBarGraphData,
    allTimeBarGraphData,
  } = state.entryData || {};

  return {
    weekEntryBarGraphData,
    monthEntryBarGraphData,
    threeMonthEntryBarGraphData,
    sixMonthEntryBarGraphData,
    yearEntryBarGraphData,
    allTimeBarGraphData,
  };
};
export const barGraphDataSelector = createSelector(
  getBarGraphValues,
  (entryData) => {
    return entryData;
  }
);
