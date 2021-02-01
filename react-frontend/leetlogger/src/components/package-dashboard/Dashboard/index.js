import React from "react";
import "./dashboard.scss";
import LogCalendar from "../LogCalendar";
import RecentQuestionsPanel from "../RecentQuestionsPanel";
import StatisticsPanel from "../StatisticsPanel";
import RevisionQuestionsPanel from "../RevisionQuestionsPanel";
import BarGraph from "../BarGraph";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <LogCalendar />
      <RecentQuestionsPanel />
      <StatisticsPanel />
      <RevisionQuestionsPanel />
      <BarGraph />
      <div className="Dashboard-empty"></div>
    </div>
  );
};

export default Dashboard;
