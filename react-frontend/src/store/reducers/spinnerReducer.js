import * as actionTypes from "../actions/spinnerActions/spinnerActionTypes";

const initialState = {
  spinnerType: null,
};

const SpinnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_SPINNER:
      return {
        spinnerType: action.spinnerType,
      };

    case actionTypes.HIDE_SPINNER:
      return {
        spinnerType: null,
      };
    default:
      return state;
  }
};

export default SpinnerReducer;
