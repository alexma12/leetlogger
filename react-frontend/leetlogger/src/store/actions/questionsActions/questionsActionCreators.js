import * as actionTypes from "./questionsActionsTypes";
import { axiosAWSInstance } from "../../../axios";
import { setValidation } from "../validationActions/validationActionCreators";
import { closeModal } from "store/actions/modalActions/modalActionCreators";

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
    .catch((err) => dispatch(setValidation(err)));
};

export const saveQuestionNote = (noteContent, updateData) => async (
  dispatch,
  getState
) => {
  await axiosAWSInstance
    .post("/questions/modifyQuestionNotes", {
      ...noteContent,
      noteID: "",
      action: "ADD",
    })
    .then(() => {
      updateData();
      dispatch(closeModal());
    })
    .catch((err) => {
      dispatch(setValidation(err));
      dispatch(closeModal());
    });
};

export const editQuestionNote = (noteContent, updateData) => async (
  dispatch,
  getState
) => {
  await axiosAWSInstance
    .post("/questions/modifyQuestionNotes", {
      ...noteContent,
      action: "UPDATE",
    })
    .then(() => {
      updateData();
      dispatch(closeModal());
    })

    .catch((err) => {
      dispatch(setValidation(err));
      dispatch(closeModal());
    });
};

export const deleteQuestionNote = (noteContent, updateData) => async (
  dispatch,
  getState
) => {
  await axiosAWSInstance
    .post("/questions/modifyQuestionNotes", {
      ...noteContent,
      content: "",
      title: "",
      action: "DELETE",
    })
    .then(() => {
      dispatch(closeModal());
      updateData();
    })

    .catch((err) => {
      dispatch(setValidation(err));
      dispatch(closeModal());
    });
};

export const editRevisionDate = (
  revisionDate,
  questionID,
  updateData
) => async (dispatch, getState) => {
  console.log(revisionDate);
  await axiosAWSInstance
    .put(`/questions/${questionID}/modifyQuestionRevisionDate`, {
      revisionDate: revisionDate,
    })
    .then(() => updateData())
    .catch((err) => {
      dispatch(setValidation(err));
    });
};

export const removeRevisionDate = (questionID, updateData) => async (
  dispatch,
  getState
) => {
  await axiosAWSInstance
    .put(`/questions/${questionID}/modifyQuestionRevisionDate`, {
      revisionDate: -1,
    })
    .then(() => {
      updateData();
    })
    .catch((err) => {
      dispatch(setValidation(err));
    });
};

export const getQuestionData = (questionID, onSuccess, onFail) => async (
  dispatch,
  getState
) => {
  await axiosAWSInstance
    .get(`/questions/${questionID}`)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      onFail(err);
    });
};
