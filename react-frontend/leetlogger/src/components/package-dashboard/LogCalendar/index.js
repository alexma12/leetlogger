import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import CalendarLegend from "./CalendarLegend";
import LogCalendarEvent from "./LogCalendarEvent";
import moment from "moment";

import "./logCalendar.scss";
require("../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css");

const localizer = momentLocalizer(moment);

const eventArray = [
  {
    allDay: true,
    start: new Date("January 24, 2021 03:24:00"),
    end: new Date("January 24, 2021 03:24:00"),
    title: "5-easy",
  },
  {
    allDay: true,
    start: new Date("January 24, 2021 03:24:00"),
    end: new Date("January 24, 2021 03:24:00"),
    title: "4-medium",
  },
  {
    allDay: true,
    start: new Date("January 24, 2021 03:24:00"),
    end: new Date("January 24, 2021 03:24:00"),
    title: "4-hard",
  },
  {
    allDay: true,
    start: new Date("January 23, 2021 03:24:00"),
    end: new Date("January 23, 2021 03:24:00"),
    title: "2-easy",
  },
  {
    allDay: true,
    start: new Date("January 23, 2021 03:24:00"),
    end: new Date("January 23, 2021 03:24:00"),
    title: "1-medium",
  },
  {
    allDay: true,
    start: new Date("January 23, 2021 03:24:00"),
    end: new Date("January 23, 2021 03:24:00"),
    title: "4-hard",
  },
  {
    allDay: true,
    start: new Date("January 22, 2021 03:24:00"),
    end: new Date("January 22, 2021 03:24:00"),
    title: "4-easy",
  },
  {
    allDay: true,
    start: new Date("January 22, 2021 03:24:00"),
    end: new Date("January 22, 2021 03:24:00"),
    title: "1-hard",
  },
];

const LogCalendar = () => {
  return (
    <div className="LogCalendar">
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        popup={true}
        events={eventArray}
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
