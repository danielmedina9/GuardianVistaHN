import React from "react";
import { Chart } from "react-google-charts";


export const dataBar = [
    ["Pais", "1 mes", "3 meses"],
    ["United States", 6, 50],
    ["Germany", 4, 45],
    ["Canada", 3, 30],
    ["United Kingdom", 2, 25],
    ["China ", 1, 15],
  ];
  
  export const optionsBar = {
    title: "Ataques por pais",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Paises",
      minValue: 0,
    },
    vAxis: {
      title: "Ataques",
    },
  };

export default function BarChart() {
  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={dataBar}
      options={optionsBar}
    />
  );
}