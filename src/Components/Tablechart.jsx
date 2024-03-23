import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Department", "Revenues Change"],
  ["ZGrab.Scanner", 120],
  ["Nmap.Script.Scanner	", 60],
  ["ToCensys.io.Scanner", 140],
  ["ALFA.TEaM.Web.Shell	", 80],
  ["WordPress.HTTP.Path.Traversal", 25],
  ["Bladabindi.Botnet	", 14],
];

export const options = {
  allowHtml: true,
  showRowNumber: true,
};

export const formatters = [
  {    
    column: 1,
    options: {     
      negativeColor: "red",
      negativeParens: true,
    },
  },
];

export default function Tablechart() {
  return (
    <Chart
      chartType="Table"
      width="100%"
      height="400px"
      data={data}
      options={options}
      formatters={formatters}
    />
  );
}
