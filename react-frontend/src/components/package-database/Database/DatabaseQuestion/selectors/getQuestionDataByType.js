import { createSelector } from "reselect";

const getQuestionDataByType = (state, type) => {
  if (!state.questionData || !state.questionData.questionsByTypeMap) return [];
  return state.questionData.questionsByTypeMap[type];
};

export const getQuestionDataByTypeSelector = createSelector(
  getQuestionDataByType,
  (questionData) => {
    return questionData;
  }
);
