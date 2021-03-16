import * as actionTypes from "./entriesActionTypes";
import { loadQuestions } from "../questionsActions/questionsActionCreators";
import {
  getStartOfDayInMiliseconds,
  milisecondsToDateString,
  getTodaysDateInFormattedString,
  getYesterdaysDateInFormattedString,
} from "utils/dateHelpers";
import { axiosAWSInstance } from "../../../axios";

export const setEntries = (data) => {
  return {
    type: actionTypes.SET_ALL_ENTRIES,
    data,
  };
};

export const setMappedEntryData = (data) => {
  return {
    type: actionTypes.SET_MAPPED_ENTRY_DATA,
    data,
  };
};

const _checkIfEntryDateIsInTimeFrame = (date, timeFrame) => {
  const timeFrameFilterDate = new Date();
  timeFrameFilterDate.setHours(0, 0, 0, 0);

  switch (timeFrame) {
    case "week":
      timeFrameFilterDate.setDate(timeFrameFilterDate.getDate() - 7);
      break;
    case "month":
      timeFrameFilterDate.setMonth(timeFrameFilterDate.getMonth() - 1);
      break;
    case "3-month":
      timeFrameFilterDate.setMonth(timeFrameFilterDate.getMonth() - 3);
      break;
    case "6-month":
      timeFrameFilterDate.setMonth(timeFrameFilterDate.getMonth() - 6);
      break;
    case "year":
      timeFrameFilterDate.setMonth(timeFrameFilterDate.getMonth() - 12);
      break;
    default:
      timeFrameFilterDate.setFullYear(0);
      break;
  }
  const dateOfEntryInMiliseconds = getStartOfDayInMiliseconds(date);
  return dateOfEntryInMiliseconds >= timeFrameFilterDate.getTime();
};
const entryBarGraphDataFunctionMap = {
  weekEntryBarGraphData: (date) => _checkIfEntryDateIsInTimeFrame(date, "week"),
  monthEntryBarGraphData: (date) =>
    _checkIfEntryDateIsInTimeFrame(date, "month"),
  threeMonthEntryBarGraphData: (date) =>
    _checkIfEntryDateIsInTimeFrame(date, "3-month"),
  sixMonthEntryBarGraphData: (date) =>
    _checkIfEntryDateIsInTimeFrame(date, "6-month"),
  yearEntryBarGraphData: (date) => _checkIfEntryDateIsInTimeFrame(date, "year"),
  allTimeBarGraphData: (date) =>
    _checkIfEntryDateIsInTimeFrame(date, "allTime"),
};

const _generateAllEntryData = (entries) => {
  const resData = {};
  for (const data in entryBarGraphDataFunctionMap) {
    resData[data] = {};
  }
  resData.calendarData = {};
  resData.statistics = {};
  resData.history = {};
  resData.entriesByTitleMap = {};
  entries.forEach((entry) => {
    const { difficulty, questionType, submittedAt, title } = entry;
    const dateSubmittedInMiliseconds = getStartOfDayInMiliseconds(submittedAt);
    // * generate bar graph data data

    for (const barData in entryBarGraphDataFunctionMap) {
      if (entryBarGraphDataFunctionMap[barData](submittedAt)) {
        resData[barData][questionType] =
          resData[barData][questionType] + 1 || 1;
        resData[barData]["count"] = resData[barData]["count"] + 1 || 1;
      }
    }

    // * generate entries by question title map

    if (resData.entriesByTitleMap[title]) {
      resData.entriesByTitleMap[title].push(entry);
    } else {
      resData.entriesByTitleMap[title] = [entry];
    }

    // * generate calendar data

    resData.calendarData[`${dateSubmittedInMiliseconds}-${difficulty}`] =
      resData.calendarData[`${dateSubmittedInMiliseconds}-${difficulty}`] + 1 ||
      1;

    // * generate statistics data

    const formattedDateString = milisecondsToDateString(
      dateSubmittedInMiliseconds
    );
    if (resData.history[formattedDateString]) {
      resData.history[formattedDateString].push(entry);
    } else {
      resData.history[formattedDateString] = [entry];
    }
    // * generate history data
    resData.statistics[difficulty] = resData.statistics[difficulty] + 1 || 1;
  });
  return resData;
};

const _checkIfFormattedStringDatesAreOneDayApart = (
  dateString1,
  date2String
) => {
  const date2 = new Date(date2String);
  date2.setDate(date2.getDate() + 1);
  return dateString1 === milisecondsToDateString(date2.getTime());
};

const _calculateStreaks = (history) => {
  let currStreakOver = false;
  let currStreakCount = 0;
  let longestStreakCount = 1;
  let currLongestStreak = 1;
  let today = getTodaysDateInFormattedString();
  let yesterday = getYesterdaysDateInFormattedString();
  let counter = 1;

  if (history[0] === today || history[0] === yesterday) {
    currStreakCount++;
  } else {
    currStreakOver = true;
  }
  if (history.length === 0) {
    return [0, 0];
  }

  if (history.length === 1) {
    if (currStreakOver) {
      return [0, 1];
    } else {
      return [1, 1];
    }
  }

  while (counter < history.length) {
    const date1 = history[counter - 1];
    const date2 = history[counter];
    if (_checkIfFormattedStringDatesAreOneDayApart(date1, date2)) {
      if (!currStreakOver) {
        currStreakCount++;
      }
      currLongestStreak++;
    } else {
      currStreakOver = true;
      currLongestStreak = 1;
    }
    longestStreakCount = Math.max(longestStreakCount, currLongestStreak);
    counter++;
  }
  return [currStreakCount, longestStreakCount];
};

const _applyStatisticsData = (
  stats,
  history,
  weekCount,
  monthCount,
  entryCount
) => {
  const [currentStreak, longestStreak] = _calculateStreaks(history);
  return {
    ...stats,
    currentStreak,
    longestStreak,
    weekCount,
    monthCount,
    entryCount,
  };
};

const _applyRecentData = (allEntries) => {
  let recentData = [];
  if (allEntries.length <= 5) {
    recentData = (allEntries || []).map(
      ({ title, submittedAt, difficulty }) => {
        return {
          title,
          submittedAt,
          difficulty,
        };
      }
    );
  } else {
    for (let i = 0; i < 5; i++) {
      const { title, submittedAt, difficulty } = allEntries[i];
      recentData.push({ title, submittedAt, difficulty });
    }
  }
  return recentData;
};

export const loadEntries = () => async (dispatch, getState) => {
  await axiosAWSInstance
    .get("/entries/list")
    .then((res) => {
      dispatch(setEntries(res.data));
      const entryMapData = _generateAllEntryData(res.data);
      entryMapData.statistics = _applyStatisticsData(
        entryMapData.statistics,
        Object.keys(entryMapData.history),
        entryMapData.weekEntryBarGraphData.count,
        entryMapData.monthEntryBarGraphData.count,
        entryMapData.allTimeBarGraphData.count
      );
      entryMapData.recentEntries = _applyRecentData(res.data);
      dispatch(setMappedEntryData(entryMapData));
    })
    .catch((err) => console.log(err.message));
};

export const saveEntry = (entry) => {
  return async (dispatch, getState) => {
    await axiosAWSInstance
      .post("/entries", entry)
      .then((res) => {
        console.log(res);
        dispatch(loadEntries());

        setTimeout(() => {
          dispatch(loadQuestions());
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
