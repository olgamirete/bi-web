import React from 'react';
import './ScatterPlot.css';

function ScatterPlot(props) {

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

  const axisHorizontalUsableLength = axisHorizontalLength - axisMarginLeft;
  const axisVerticalUsableLength = axisVerticalLength - (chartHeight - axisMarginBottom);

  const pointRadius = Math.min(3, 0.01*Math.sqrt(Math.pow(axisHorizontalUsableLength, 2) + Math.pow(axisVerticalUsableLength, 2)));

  const tickMinorLength = 5;
  const tickMajorLength = 8;

  const xMin = 0;
  const xMax = 100;
  const yMin = 0;
  const yMax = 50;

  const xMinorStep = 5;
  const xMajorStep = 10;
  const yMinorStep = 5;
  const yMajorStep = 10;

  const xTickCount = Math.ceil((xMax - xMin) / xMinorStep);
  const yTickCount = Math.ceil((yMax - yMin) / yMinorStep);

  let xTicksAux = [];
  for (let i = 0; i < xTickCount; i++) {
    let tickLength = ((i + 1) * xMinorStep % xMajorStep === 0) ? tickMajorLength : tickMinorLength;
    xTicksAux.push(<path d={"M " + (originLeft + ((i + 1) / xTickCount) * axisHorizontalUsableLength) + "," + originTop + " v " + tickLength} />);
  }
  const xTicks = <g className="axis-ticks" >{xTicksAux}</g>;

  let yTicksAux = [];
  for (let i = 0; i < yTickCount; i++) {
    let tickLength = ((i + 1) * yMinorStep % yMajorStep === 0) ? tickMajorLength : tickMinorLength;
    yTicksAux.push(<path d={"M " + originLeft + ", " + (originTop - ((i + 1) / yTickCount) * axisVerticalUsableLength) + " h -" + tickLength} />);
  }
  const yTicks = <g className="axis-ticks">{yTicksAux}</g>;

  let pointsAux = [];
  props.data.forEach(d => {
    const xCoord = originLeft + d.x * (axisHorizontalUsableLength / (xMax - xMin));
    const yCoord = originTop - d.y * (axisVerticalUsableLength / (yMax - yMin));
    pointsAux.push(<circle className="point" cx={xCoord} cy={yCoord} r={pointRadius} />);
  });
  const points = <g>{pointsAux}</g>;

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
      <g className="axis" >
        <g>
          {/* <!-- Eje horizontal --> */}
          <path d={"M " + axisMarginLeft + "," + originTop + " h " + axisHorizontalLength} />
          {/* <!-- Axis ticks --> */}
          {xTicks}
        </g>
        <g>
          {/* <!-- Eje vertical --> */}
          <path d={"M " + originLeft + "," + axisMarginTop + " v " + axisVerticalLength} />
          {/* <!-- Axis ticks --> */}
          {yTicks}
        </g>
      </g>

      {/* <!-- Grilla --> */}

      {/* <!-- Puntos --> */}
      {points}

    </svg>
  );
}

export default ScatterPlot;