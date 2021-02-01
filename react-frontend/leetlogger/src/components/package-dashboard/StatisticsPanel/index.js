import React from "react";
import { ReactComponent as FireIcon } from "svg/fire.svg";
import { ReactComponent as FirstIcon } from "svg/first.svg";
import { ReactComponent as ReportIcon } from "svg/report.svg";
import { ReactComponent as ClipboardIcon } from "svg/sum.svg";
import { ReactComponent as MonthIcon } from "svg/month.svg";
import { ReactComponent as WeekIcon } from "svg/week.svg";
import "./statisticsPanel.scss";

const StatisticsPanel = () => {
  return (
    <div className="StatisticsPanel">
      <div className="StatisticsPanel-streak">
        <div className="StatisticsPanel-item StatisticsPanel-streak-front">
          <FireIcon className="StatisticsPanel-fireicon" />
          Leetcode Streak: 7 days
        </div>
        <div className="StatisticsPanel-item StatisticsPanel-streak-back">
          {" "}
          <FirstIcon className="StatisticsPanel-firsticon" /> Highest Streak:
          999 days
        </div>
      </div>
      <div className="StatisticsPanel-total">
        <div className="StatisticsPanel-item StatisticsPanel-total-front">
          <ClipboardIcon className="StatisticsPanel-clipboardicon" />
          Total Entries: 105
        </div>
        <div className="StatisticsPanel-item StatisticsPanel-total-back">
          <ReportIcon className="StatisticsPanel-reporticon" />
          {"Easy: 1,   Med: 4,   Hard: 10"}
        </div>
      </div>
      <div className="StatisticsPanel-month">
        <div className="StatisticsPanel-item StatisticsPanel-month-front">
          <WeekIcon className="StatisticsPanel-weekicon" />
          Entries This Week: 20
        </div>
        <div className="StatisticsPanel-item StatisticsPanel-month-back">
          <MonthIcon className="StatisticsPanel-monthicon" />
          Entries This Month: 100
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
