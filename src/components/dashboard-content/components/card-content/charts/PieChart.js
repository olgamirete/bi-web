import React from 'react';
import './PieChart.css';
import { VictoryPie } from "victory";

function PieChart(props) {
  return (
    // <svg
    //   className="pie-chart">
    //   <text x="0" y="20">Pie chart</text>
    //   <rect cx="0" cy="0" width="10" height="10" />
    // </svg>
    <VictoryPie
      colorScale={["black", "var(--cg-blue)", "green"]}
      data={props.data} />
  );
}

export default PieChart;