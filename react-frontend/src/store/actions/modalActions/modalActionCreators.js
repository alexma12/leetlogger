import * as actionTypes from "./modalActionTypes";

export const openModal = (modalType) => {
  return {
    type: actionTypes.OPEN_MODAL,
    modalType,
  };
};

export const closeModal = () => {
  return {
    type: actionTypes.CLOSE_MODAL,
  };
};
