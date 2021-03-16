import * as actionTypes from "./validationActionTypes";

export const setValidation = (data) => {
  return {
    type: actionTypes.SET_VALIDATION,
    data,
  };
};

export const removeValidation = () => (dispatch, getState) => {
  if (!getState().validation?.show) return;
  dispatch(deleteValidation());
};

const deleteValidation = () => {
  return {
    type: actionTypes.REMOVE_VALIDATION,
  };
};
