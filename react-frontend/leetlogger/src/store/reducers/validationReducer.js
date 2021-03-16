import * as actionTypes from "../actions/validationActions/validationActionTypes";

const initialState = {
  show: false,
  isError: false,
  message: "",
};

const validationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VALIDATION:
      const { isError, message } = action.data;
      return {
        show: true,
        isError,
        message,
      };

    case actionTypes.REMOVE_VALIDATION:
      return {
        ...state,
        show: false,
      };

    default:
      return state;
  }
};

export default validationReducer;
