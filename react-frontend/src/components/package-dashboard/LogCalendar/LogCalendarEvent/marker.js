import React from "react";
import "./marker.scss";

const Marker = ({ difficulty }) => {
  let style = "Marker Marker-easy";
  if (difficulty === "medium") {
    style = "Marker Marker-medium";
  } else if (difficulty === "hard") {
    style = "Marker Marker-hard";
  }

  return <div className={style}></div>;
};

export default Marker;
