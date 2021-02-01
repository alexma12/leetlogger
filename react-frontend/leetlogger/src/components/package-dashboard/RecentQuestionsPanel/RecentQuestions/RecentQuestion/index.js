import React from "react";
import "./recentQuestion.scss";
const RecentQuestion = ({difficulty, title, date, overdue}) => {

    const classArr = ["RecentQuestion"]

    switch(difficulty) {
        case "easy":
            classArr.push("RecentQuestion-easy");
            break; 
        case "medium": 
            classArr.push("RecentQuestion-medium");
            break;
        case "hard": 
            classArr.push("RecentQuestion-hard");
            break;
        default: 
            break;
    }

    return (
        <div className = {classArr.join(" ")}>
            <div className = "RecentQuestion-title">
                {title}
            </div>

            <div className = "RecentQuestion-date">
                {date}
            </div>
        </div>
    )
}

export default RecentQuestion