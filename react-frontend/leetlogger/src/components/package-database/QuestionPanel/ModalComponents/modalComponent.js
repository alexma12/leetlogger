import React from "react";
import { useDispatch } from "react-redux";
import "./modalComponents.scss";
import { closeModal } from "store/actions/modalActions/modalActionCreators";
const ModalComponent = (props) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`ModalComponent ${props.lg && "ModalComponent-withScroll"}`}
      style={{
        width: `${props.width}`,
        height: `${props.height}`,
      }}
    >
      <div
        className="ModalComponent-close"
        onClick={() => dispatch(closeModal())}
      >
        x
      </div>
      <div className="ModalComponent-header"> {props.header}</div>
      <hr />
      {props.children}
    </div>
  );
};

export default ModalComponent;
