import * as actionTypes from "../actions/questionsActions/questionsActionsTypes";

const initialState = {};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MAPPED_QUESTION_DATA:
      const { questionsToReview, questionsByTypeMap } = action.data;
      return {
        ...state,
        questionsToReview,
        questionsByTypeMap,
      };

    default:
      return state;
  }
};

export default questionsReducer;
