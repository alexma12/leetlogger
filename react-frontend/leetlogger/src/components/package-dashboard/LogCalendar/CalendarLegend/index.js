import React from "react";
import "./calendarLegend.scss"

const CalendarLegend = () => {
    return (
        <div className = "CalendarLegend"> 
            <span className = "CalendarLegend-easy">
                Easy
            </span>
            <span className = "CalendarLegend-medium">
                Medium
            </span>
            <span className = "CalendarLegend-hard">
                Hard
            </span>
        </div>
    )
}

export default CalendarLegend;