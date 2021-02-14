import React, { useState } from "react";
import ApexCharts from "react-apexcharts";
import "./barGraph.scss";

const BarGraph = () => {
  const [barGraphView, setBarGraphView] = useState("week");

  // const _onClickHandler = () => {
  //    switch(barGraphView){
  //       case "week":
  //         setBarGraphView("month");
  //         break;
  //       case "month":
  //         setBarGraphView("3-months")
  //       case "3-month":
  //         setBarGraphView("half-year")
  //       case "year"

  //    }
  //   }

  const series = [
    {
      name: "Entry Count",
      data: [0, 0, 44, 47, 54, 58, 69, 110, 120, 130, 120, 153],
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
      categories: [
        "Array",
        "Backtracking",
        "Bit Manipulation",
        "Divide & Conquer",
        "Dynamic Programming",
        "Graph",
        "Greedy",
        "Linked Lists",
        "Queue",
        "Stack",
        "String",
        "Tree",
      ],
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
  };

  return (
    <div className="BarGraph">
      <div className="BarGraph-title">This Week's Entries by Question Type</div>
      <ApexCharts options={options} series={series} type="bar" height="550" />
    </div>
  );
};

export default BarGraph;
