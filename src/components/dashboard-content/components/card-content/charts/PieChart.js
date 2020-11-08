import React from 'react';
import './PieChart.css';

function PieChart(props) {
  return (
    <svg
      className="pie-chart">
      <text x="0" y="20">Pie chart</text>
      <rect cx="0" cy="0" width="10" height="10" />
    </svg>
  );
}

export default PieChart;