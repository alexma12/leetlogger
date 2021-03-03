import React from "react";
import { useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import CalendarLegend from "./CalendarLegend";
import LogCalendarEvent from "./LogCalendarEvent";
import moment from "moment";
import { milisecondsToDateString } from "utils/dateHelpers";

import "./logCalendar.scss";
require("../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css");

const localizer = momentLocalizer(moment);

const LogCalendar = () => {
  const calendarEvents = useSelector(({ entryData }) => {
    const { calendarData } = entryData;
    const calendarEventsArr = [];
    for (let event in calendarData) {
      const eventObj = {};
      const [date, difficulty] = event.split("-");
      let timeString;
      if (difficulty === "easy") timeString = "20:00:00";
      if (difficulty === "medium") timeString = "10:00:00";
      if (difficulty === "hard") timeString = "00:00:00";
      eventObj.start = eventObj.end = `${milisecondsToDateString(
        Number(date)
      )} ${timeString}`;

      eventObj.title = `${calendarData[event]}-${difficulty}`;
      calendarEventsArr.push(eventObj);
    }
    return calendarEventsArr.sort(
      (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
    );
  });

  return (
    <div className="LogCalendar">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        popup={true}
        events={calendarEvents}
        views={["month"]}
        style={{
          height: "43rem",
          width: "90rem",
          fontSize: "1.5rem",
          borderBottom: "solid .15rem lightgrey",
        }}
        components={{
          event: LogCalendarEvent,
        }}
      />
      <CalendarLegend />
    </div>
  );
};

export default LogCalendar;
