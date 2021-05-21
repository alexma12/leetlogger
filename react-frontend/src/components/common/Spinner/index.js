import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import PuffLoader from "react-spinners/PuffLoader";
const Spinner = (props) => {
  return (
    <div>
      <SyncLoader
        loading={true}
        margin={7}
        color={props.color || "#31c29277"}
      />
    </div>
  );
};

export default Spinner;
