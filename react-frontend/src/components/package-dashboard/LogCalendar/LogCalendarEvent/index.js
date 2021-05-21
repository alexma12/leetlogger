import React from "react";
import Marker from "./marker";
import "./logCalendarEvent.scss";

const LogCalendarEvent = ({ title }) => {
  const strArr = title.split("-");
  const difficulty = strArr[1];
  const count = strArr[0];
  let markers = [];
  for (let i = 0; i < count; i++) {
    markers.push("");
  }
  markers = markers.map((marker) => {
    return <Marker difficulty={difficulty} />;
  });

  return <div className="LogCalendarEvent">{markers}</div>;
};

export default LogCalendarEvent;
