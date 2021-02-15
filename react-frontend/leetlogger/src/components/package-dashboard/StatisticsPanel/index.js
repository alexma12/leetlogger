import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as FireIcon } from "svg/fire.svg";
import { ReactComponent as FirstIcon } from "svg/first.svg";
import { ReactComponent as ReportIcon } from "svg/report.svg";
import { ReactComponent as ClipboardIcon } from "svg/sum.svg";
import { ReactComponent as MonthIcon } from "svg/month.svg";
import { ReactComponent as WeekIcon } from "svg/week.svg";
import "./statisticsPanel.scss";

const StatisticsPanel = () => {
  const statistics = useSelector(({ entryData }) => {
    const { statistics } = entryData;
    return statistics;
  });

  const {
    currentStreak = 0,
    longestStreak = 0,
    entryCount = 0,
    easy = 0,
    medium = 0,
    hard = 0,
    weekCount = 0,
    monthCount = 0,
  } = statistics || {};
  return (
    <div className="StatisticsPanel">
      <div className="StatisticsPanel-streak">
        <div className="StatisticsPanel-item StatisticsPanel-streak-front">
          <FireIcon className="StatisticsPanel-fireicon" />
          {`Leetcode Streak: ${currentStreak} ${
            currentStreak === 1 ? "day" : "days"
          }`}
        </div>
        <div className="StatisticsPanel-item StatisticsPanel-streak-back">
          {" "}
          <FirstIcon className="StatisticsPanel-firsticon" />{" "}
          {`Highest Streak: ${longestStreak} ${
            longestStreak === 1 ? "day" : "days"
          }`}
        </div>
      </div>
      <div className="StatisticsPanel-total">
        <div className="StatisticsPanel-item StatisticsPanel-total-front">
          <ClipboardIcon className="StatisticsPanel-clipboardicon" />
          {`Total Entries: ${entryCount}`}
        </div>
        <div className="StatisticsPanel-item StatisticsPanel-total-back">
          <ReportIcon className="StatisticsPanel-reporticon" />
          {`Easy: ${easy},   Med: ${medium},   Hard: ${hard}`}
        </div>
      </div>
      <div className="StatisticsPanel-month">
        <div className="StatisticsPanel-item StatisticsPanel-month-front">
          <WeekIcon className="StatisticsPanel-weekicon" />
          {`Entries This Week: ${weekCount}`}
        </div>
        <div className="StatisticsPanel-item StatisticsPanel-month-back">
          <MonthIcon className="StatisticsPanel-monthicon" />
          {`Entries This Month: ${monthCount}`}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
