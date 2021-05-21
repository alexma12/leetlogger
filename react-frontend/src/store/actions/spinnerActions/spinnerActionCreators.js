import * as actionTypes from "./spinnerActionTypes";

export const showSpinner = (spinnerType) => {
  return {
    type: actionTypes.SHOW_SPINNER,
    spinnerType,
  };
};

export const hideSpinner = () => {
  return {
    type: actionTypes.HIDE_SPINNER,
  };
};
