import React, { useCallback } from 'react';
import './CardFormat.css';
import chartIcons from './icons/chart_icons.svg';

const formatDefinitions = [
  { "code": "barchart", "name": "Bar chart", "icon": "./icons/bar_chart.svg" },
  { "code": "piechart", "name": "Pie chart", "icon": "./icons/pie_chart.svg" },
  { "code": "scatterplot", "name": "Scatter plot", "icon": "./icons/scatter_plot.svg" },
  { "code": "linechart", "name": "Line chart", "icon": "./icons/line_chart.svg" },
  { "code": "stackedlinechart", "name": "Stacked line chart", "icon": "./icons/stacked_line_chart.svg" }
]

function CardFormat(props) {

  const setContentType = useCallback((contentType) => {
    props.cardMethods.setContentTypeOfSelectedCards(contentType);
  }, [props.cardMethods]);

  const isActive = props.activeSection === "format";

  return (
    <section className={"section card-format-section" + (isActive ? " active" : "")}>
      <h3 className="title">Format</h3>
      <h4>Set chart type</h4>
      {
        formatDefinitions.map((formatDefinition) => {
          return (
            <button
              className="card-format-button"
              onPointerDown={() => setContentType(formatDefinition.code)} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="chart-icon"
                viewBox="0 0 24 24">
                <use xlinkHref={`${chartIcons}#${formatDefinition.code}`} />
              </svg>
            </button>
          )
        })
      }
      <h4>Set chart options</h4>
      <button
        onPointerDown={props.cardMethods.toggleSelectedCardsLegend} >
        Toggle legend
      </button>
    </section>
  );
}

export default CardFormat;