import React from "react";
import "./validation.scss";
const Validation = ({ message, isError }) => {
  return (
    <div className={`Validation ${true && "Validation-error"}`}>
      {message} <span className="Validation-exit"> x </span>
    </div>
  );
};

export default Validation;
