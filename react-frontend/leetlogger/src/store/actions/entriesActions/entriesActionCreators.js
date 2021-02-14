import * as actionTypes from "./entriesActionTypes";
import { axiosAWSInstance } from "../../../axios";

export const setEntries = (data) => {
  return {
    type: actionTypes.SET_ALL_ENTRIES,
    data,
  };
};

const _checkIfEntryDateIsInTimeFrame = (entry, timeFrame) => {
  const timeFrameFilterDate = new Date();
  timeFrameFilterDate.setHours(0, 0, 0, 0);

  switch (timeFrame) {
    case "week":
      timeFrameFilterDate.setDate(
        timeFrameFilterDate.getDate() - timeFrameFilterDate.getDay()
      );
      break;
    case "month":
      timeFrameFilterDate.setDate(1);
      break;
    case "3-month":
      timeFrameFilterDate.setDate(1);
      timeFrameFilterDate.setMonth(timeFrameFilterDate.getMonth() - 2);
      break;
    case "6-month":
      timeFrameFilterDate.setDate(1);
      timeFrameFilterDate.setMonth(timeFrameFilterDate.getMonth() - 5);
      break;
    case "year":
      timeFrameFilterDate.setDate(1);
      timeFrameFilterDate.setMonth(0);
      break;
    default:
      timeFrameFilterDate.setFullYear(0);
      break;
  }
  return entry.entryDate >= timeFrameFilterDate.toISOString();
};
const entryBarGraphDataFunctionMap = {
  weekEntryBarGraphData: (data) => _checkIfEntryDateIsInTimeFrame(data, "week"),
  monthEntryBarGraphData: (data) =>
    _checkIfEntryDateIsInTimeFrame(data, "month"),
  threeMonthEntryBarGraphData: (data) =>
    _checkIfEntryDateIsInTimeFrame(data, "3-month"),
  sixMonthEntryBarGraphData: (data) =>
    _checkIfEntryDateIsInTimeFrame(data, "6-month"),
  yearEntryBarGraphData: (data) => _checkIfEntryDateIsInTimeFrame(data, "year"),
  allTimeBarGraphData: (data) =>
    _checkIfEntryDateIsInTimeFrame(data, "allTime"),
};

const _mapAllEntryData = (entries) => {
  const resData = {};
  for (const data in entryBarGraphDataFunctionMap) {
    resData[data] = {};
  }
  resData.calendarData = {};

  entries.forEach((entry) => {
    const { difficulty, questionType, entryDate } = entry;
    for (const barData in entryBarGraphDataFunctionMap) {
      if (entryBarGraphDataFunctionMap[barData](entryDate)) {
        resData[barData][questionType] =
          resData[barData][questionType] + 1 || 1;
      }
    }
    resData.calendarData[`${entryDate}-${difficulty}`] =
      resData.calendarData[`${entryDate}-${difficulty}`] + 1 || 0;
  });
};

export const loadEntries = () => async (dispatch, getState) => {
  axiosAWSInstance
    .get("/entries/list")
    .then((res) => {
      dispatch(setEntries(res.data));
      const allComponentEntryData = _mapAllEntryData(res.data);
    })
    .catch((err) => console.log(err.message));
};
