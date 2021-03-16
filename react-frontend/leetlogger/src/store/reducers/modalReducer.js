import * as actionTypes from "../actions/modalActions/modalActionTypes";

const initialState = {
  show: false,
  modalType: "",
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return {
        show: true,
        modalType: action.modalType,
      };

    case actionTypes.CLOSE_MODAL:
      return {
        show: false,
        modalType: "",
      };

    default:
      return state;
  }
};

export default modalReducer;
