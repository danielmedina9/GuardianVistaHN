import React from "react";
import { Chart } from "react-google-charts";

export const dataArea = [
  ["Años", "Ataques", "Empresa"],
  ["2024", 1000, 400],
  ["2025", 0, 0],
  ["2026", 0, 0],
  ["2027", 0, 0],
];

export const optionsArea = {
  isStacked: "relative",
  height: 300,
  legend: { position: "top", maxLines: 3 },
  vAxis: {
    minValue: 0,
    ticks: [0, 0.3, 0.6, 0.9, 1],
  },
};

export default function AreaBar() {
    return (
      <Chart
        chartType="AreaChart"
        width="100%"
        height="400px"
        data={dataArea}
        options={optionsArea}
      />  
    );
  }
