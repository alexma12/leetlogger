import React, { useState } from "react";
import { CSSTranstion } from "react-transition-group";
import { useSelector } from "react-redux";
import ApexCharts from "react-apexcharts";
import { barGraphDataSelector } from "./selectors/getBarGraphData";
import { titleToTypeMap } from "utils/titleAndTypeMaps";
import "./barGraph.scss";

const BarGraph = () => {
  const [barGraphView, setBarGraphView] = useState("weekEntryBarGraphData");
  const barGraphData = useSelector((state) => {
    return barGraphDataSelector(state);
  });

  const onClickHandler = (event) => {
    setBarGraphView(event.target.name);
  };
  const categories = [
    "Array",
    "Backtracking",
    "Bit Manipulation",
    "Divide & Conquer",
    "Dynamic Programming",
    "Graph",
    "Greedy",
    "Linked List",
    "Queue",
    "Stack",
    "String",
    "Tree",
  ];

  const getMappedDataForApexBarGraph = (barGraphData = {}, categories) => {
    const dataArray = [];
    categories.forEach((category) => {
      const questionType = titleToTypeMap[category];
      dataArray.push(barGraphData[questionType] || 0);
    });
    return dataArray;
  };
  const barGraphViewData = getMappedDataForApexBarGraph(
    barGraphData[barGraphView],
    categories
  );

  const series = [
    {
      name: "Entry Count",
      data: barGraphViewData,
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "bar",
      events: {
        clicked: null,
        dataPointMouseEnter: null,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,

      style: {
        colors: ["#989898"],
        fontWeight: 600,
        fontFamily: "QuickSand",
        padding: "2px",
      },
    },
    fill: {
      colors: [
        "#C8CFEA",
        "#b5ead7",
        "#e2f0cb",
        "#ffdac1",
        "#ffb7b2",
        "#f4acca",
      ],
    },
    xaxis: {
      labels: {
        show: false,
      },
      categories,
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: "1.35rem",
          fontFamily: "QuickSand",
          fontWeight: "600",
        },
      },
    },
    grid: {
      show: true,
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      row: {
        colors: undefined,
        opacity: 0.5,
      },
      column: {
        colors: undefined,
        opacity: 0.5,
      },
      padding: {
        right: 25,
      },
    },
  };

  let title;
  switch (barGraphView) {
    case "weekEntryBarGraphData":
      title = "Entries This Past Week";
      break;
    case "monthEntryBarGraphData":
      title = "Entries This Past Month";
      break;
    case "threeMonthEntryBarGraphData":
      title = "Entries These Past Three Months";
      break;
    case "sixMonthEntryBarGraphData":
      title = "Entries These Past Six Months";
      break;
    case "yearEntryBarGraphData":
      title = "Entries This Past Year";
      break;
    case "allTimeBarGraphData":
      title = "All Entries";
      break;
    default:
      break;
  }

  return (
    <div className="BarGraph">
      <div className="BarGraph-title">{title}</div>
      <div className="BarGraph-button-box">
        <button
          onClick={onClickHandler}
          className={`BarGraph-button ${
            barGraphView === "weekEntryBarGraphData"
              ? "BarGraph-button-active"
              : ""
          }`}
          name="weekEntryBarGraphData"
        >
          week
        </button>
        <button
          onClick={onClickHandler}
          className={`BarGraph-button ${
            barGraphView === "monthEntryBarGraphData"
              ? "BarGraph-button-active"
              : ""
          }`}
          name="monthEntryBarGraphData"
        >
          month
        </button>
        <button
          onClick={onClickHandler}
          className={`BarGraph-button ${
            barGraphView === "threeMonthEntryBarGraphData"
              ? "BarGraph-button-active"
              : ""
          }`}
          name="threeMonthEntryBarGraphData"
        >
          3-month
        </button>
        <button
          onClick={onClickHandler}
          className={`BarGraph-button ${
            barGraphView === "sixMonthEntryBarGraphData"
              ? "BarGraph-button-active"
              : ""
          }`}
          name="sixMonthEntryBarGraphData"
        >
          6-month
        </button>
        <button
          onClick={onClickHandler}
          className={`BarGraph-button ${
            barGraphView === "yearEntryBarGraphData"
              ? "BarGraph-button-active"
              : ""
          }`}
          name="yearEntryBarGraphData"
        >
          year
        </button>
        <button
          onClick={onClickHandler}
          className={`BarGraph-button ${
            barGraphView === "allTimeBarGraphData"
              ? "BarGraph-button-active"
              : ""
          }`}
          name="allTimeBarGraphData"
        >
          all time
        </button>
      </div>
      <ApexCharts options={options} series={series} type="bar" height="550" />
    </div>
  );
};

export default BarGraph;
