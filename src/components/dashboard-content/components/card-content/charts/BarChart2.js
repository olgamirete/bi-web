import React from 'react';
import './BarChart2.css';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { BarChart as BarChartRecharts } from 'recharts';

const data = [
  {x: 0, y: 0},
  {x: 10, y: 10},
  {x: 20, y: 15},
  {x: 30, y: 20},
  {x: 40, y: 25},
  {x: 50, y: 30},
  {x: 60, y: 40},
  {x: 70, y: 5},
  {x: 80, y: 20},
  {x: 90, y: 10},
  {x: 100, y: 0},
  {x: 110, y: 0}
];

function BarChart2(props) {

  const chartWidth = props.cardInfo.size.width - 2 * props.borderWidth;
  const chartHeight = props.cardInfo.size.height - 2 * props.borderWidth;

//   const originLeft = 20;
//   const originTop = chartHeight - 20;

//   const axisMarginLeft = originLeft * 0.5;
//   const axisMarginRight = chartWidth - originLeft;
//   const axisMarginTop = chartHeight - originTop;
//   const axisMarginBottom = chartHeight - (chartHeight - originTop) * 0.5;

//   const axisHorizontalLength = axisMarginRight - axisMarginLeft;
//   const axisVerticalLength = axisMarginBottom - axisMarginTop;

//   const tickMinorLength = 5;
//   const tickMajorLength = 8;

  // const xMin = 10;
  // const xMax = 10;
  
  return (
    <BarChartRecharts
      width={chartWidth}
      height={chartHeight}
      data={data} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="bottom" iconType="square" iconSize={3} />
        <Bar dataKey="x" fill="#8884d8" />
        <Bar dataKey="y" fill="#82ca9d" />
    </BarChartRecharts>
  );
}

export default BarChart2;