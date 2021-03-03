import * as actionTypes from "./questionsActionsTypes";
import { axiosAWSInstance } from "../../../axios";

export const setMappedQuestionsData = (data) => {
  return {
    type: actionTypes.SET_MAPPED_QUESTION_DATA,
    data,
  };
};

export const loadQuestions = () => async (dispatch, getState) => {
  await axiosAWSInstance
    .get("/questions/list")
    .then((res) => {
      const questions = res.data;
      const resData = {};

      resData.questionsByTypeMap = {};
      resData.questionsToReview = [];

      (questions || []).forEach((question) => {
        const { questionType, revisionDate } = question;

        if (resData.questionsByTypeMap[questionType]) {
          resData.questionsByTypeMap[questionType].push(question);
        } else {
          resData.questionsByTypeMap[questionType] = [question];
        }

        if (revisionDate > 0) {
          resData.questionsToReview.push(question);
        }
      });
      resData.questionsToReview.sort((a, b) => {
        return a.revisionDate - b.revisionDate;
      });
      dispatch(setMappedQuestionsData(resData));
    })
    .catch((err) => console.log(err.message));
};
