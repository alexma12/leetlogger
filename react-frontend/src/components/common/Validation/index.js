import React from "react";
import { useDispatch } from "react-redux";
import { removeValidation } from "store/actions/validationActions/validationActionCreators";
import "./validation.scss";
const Validation = ({ message, isSuccess }) => {
  const dispatch = useDispatch();
  return (
    <div className={`Validation ${!isSuccess && "Validation-error"}`}>
      {message}{" "}
      <span
        className="Validation-exit"
        onClick={() => dispatch(removeValidation())}
      >
        {" "}
        x{" "}
      </span>
    </div>
  );
};

export default Validation;
