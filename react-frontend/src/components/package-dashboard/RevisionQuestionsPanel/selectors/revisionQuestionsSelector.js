import { createSelector } from "reselect";

const getRevisionQuestionsFromRedux = (state) => {
  if (!state || !state.questionData) return [];
  return state.questionData.questionsToReview;
};

export const revisionQuestionsSelector = createSelector(
  getRevisionQuestionsFromRedux,
  (revisionQuestions) => {
    return revisionQuestions;
  }
);
