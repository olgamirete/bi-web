import React from 'react';
import './BarChart.css';

// const data = [
//   {x: 0, y: 0},
//   {x: 10, y: 10},
//   {x: 20, y: 15},
//   {x: 30, y: 20},
//   {x: 40, y: 25},
//   {x: 50, y: 30},
//   {x: 60, y: 40},
//   {x: 70, y: 5},
//   {x: 80, y: 20},
//   {x: 90, y: 10},
//   {x: 100, y: 0},
//   {x: 110, y: 0}
// ];

function BarChart(props) {

  const chartWidth = props.cardInfo.size.width - 2 * props.borderWidth;
  const chartHeight = props.cardInfo.size.height - 2 * props.borderWidth;

  const originLeft = 20;
  const originTop = chartHeight - 20;

  const axisMarginLeft = originLeft * 0.5;
  const axisMarginRight = chartWidth - originLeft;
  const axisMarginTop = chartHeight - originTop;
  const axisMarginBottom = chartHeight - (chartHeight - originTop) * 0.5;

  const axisHorizontalLength = axisMarginRight - axisMarginLeft;
  const axisVerticalLength = axisMarginBottom - axisMarginTop;

  const tickMinorLength = 5;
  const tickMajorLength = 8;

  // const xMin = 10;
  // const xMax = 10;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox={"0 0 " + chartWidth + " " + chartHeight}
      className="bar-chart"
      width={chartWidth}
      height={chartHeight} >

      {/* <!-- Fondo --> */}
      <g>
        <rect className="background" x="0" y="0"
          width={chartWidth}
          height={chartHeight} ry="0" />
        <text x="30" y="30">{chartWidth}</text>
        <text x="30" y="50">{"Show legend: " + props.cardInfo.contentOptions.showLegend}</text>
      </g>

      {/* <!-- Ejes --> */}
      <g>
        <g>
          {/* <!-- Eje horizontal --> */}
          <g>
            <path d={"M " + axisMarginLeft + "," + originTop + " h " + axisHorizontalLength} />
            <g>
              {/* <!-- Axis ticks --> */}
              <path d={"M 30," + originTop + " v " + tickMinorLength} />
              <path d={"M 40," + originTop + " v " + tickMinorLength} />
              <path d={"M 50," + originTop + " v " + tickMinorLength} />
              <path d={"M 60," + originTop + " v " + tickMinorLength} />
              <path d={"M 70," + originTop + " v " + tickMajorLength} />
              <path d={"M 80," + originTop + " v " + tickMinorLength} />
              <path d={"M 90," + originTop + " v " + tickMinorLength} />
              <path d={"M 100," + originTop + " v " + tickMinorLength} />
              <path d={"M 110," + originTop + " v " + tickMinorLength} />
              <path d={"M 120," + originTop + " v " + tickMajorLength} />
            </g>
          </g>

          {/* <!-- Eje vertical --> */}
          <g>
            <path d={"M " + originLeft + "," + axisMarginTop + " v " + axisVerticalLength} />
            <g>
              {/* <!-- Axis ticks --> */}
              <path d={"M " + originLeft + ", 110 h -" + tickMinorLength} />
              <path d={"M " + originLeft + ", 100 h -" + tickMinorLength} />
              <path d={"M " + originLeft + ", 90 h -" + tickMinorLength} />
              <path d={"M " + originLeft + ", 80 h -" + tickMinorLength} />
              <path d={"M " + originLeft + ", 70 h -" + tickMajorLength} />
              <path d={"M " + originLeft + ", 60 h -" + tickMinorLength} />
              <path d={"M " + originLeft + ", 60 h -" + tickMinorLength} />
              <path d={"M " + originLeft + ", 50 h -" + tickMinorLength} />
              <path d={"M " + originLeft + ", 40 h -" + tickMinorLength} />
              <path d={"M " + originLeft + ", 30 h -" + tickMajorLength} />
            </g>
          </g>
        </g>
      </g>

      {/* <!-- Grilla --> */}
      <g>
        <g>
          <g>
            {/* <!-- <path d="m 63.210516,71.81547 v 80.88692" /> --> */}
            {/* <!-- <path d="M 80.726683,71.815471 V 152.70239" /> --> */}
            {/* <!-- <path d="M 99.765995,71.815464 V 152.70239" /> --> */}
          </g>
          <g>
            {/* <!-- <path d="m 183.69642,90.246341 -137.583327,10e-7" /> --> */}
            {/* <!-- <path d="M 183.69642,115.13125 H 46.113087" /> --> */}
          </g>
        </g>
      </g>

      {/* <!-- Barras --> */}
      <g>
        <rect x="20" y="60" width="20" height="20" className="bar" />
        <rect x="60" y="40" width="20" height="50" className="bar" />
      </g>

    </svg>
  );
}

export default BarChart;