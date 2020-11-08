import React from 'react';
import './LineChart.css';

function LineChart(props) {
  return (
    <svg
      className="line-chart">
      <text x="0" y="20">Line chart</text>
      <rect cx="10" cy="10" width="10" height="10" />
    </svg>
  );
}

export default LineChart;