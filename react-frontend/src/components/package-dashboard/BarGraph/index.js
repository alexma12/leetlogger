import React, { useState } from "react";
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

  const getScreenWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1000) {
      return "550px";
    }
    if (screenWidth <= 1300) {
      return "400px";
    }
  };
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
        "#cde3f8",
        "#f7d5d5",
        "#ddf5ca",
        "#f5def8",
        "#ebd5f8",
        "#ffd6e5",
        "#c4f3eb",
        "#f4f5ba",
        "#c8f1da",
        "#c3f0fc",
        "#ffe6c8",
        "#e2def8",
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
      title = "Entries In The Past Week";
      break;
    case "monthEntryBarGraphData":
      title = "Entries In The Past Month";
      break;
    case "threeMonthEntryBarGraphData":
      title = "Entries In The Past Three Months";
      break;
    case "sixMonthEntryBarGraphData":
      title = "Entries In The Past Six Months";
      break;
    case "yearEntryBarGraphData":
      title = "Entries In The Past Twelve Months";
      break;
    case "allTimeBarGraphData":
      title = "All Entries";
      break;
    default:
      break;
  }

  const barGraphHeight = getScreenWidth();

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
          3-months
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
          6-months
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
          12-months
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
      <div className="BarGraph-wrapper">
        <ApexCharts
          options={options}
          series={series}
          type="bar"
          height="100%"
        />
      </div>
    </div>
  );
};

export default BarGraph;
