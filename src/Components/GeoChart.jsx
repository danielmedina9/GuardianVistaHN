import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Country", "Vulnerability"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700],
  ["Honduras",50]
];

export const options = {
  colorAxis: { colors: ["#151B54", "black", "#4169E1"] },
  backgroundColor: "#81d4fa",
  datalessRegionColor: "8c8c8c  ",
  defaultColor: "#f5f5f5",
};

export default function GeoChart() {
  return (
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = data[selection[0].row + 1];
            console.log("Selected : " + region);
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="650px"
      data={data}
      options={options}
    />
  );
}
