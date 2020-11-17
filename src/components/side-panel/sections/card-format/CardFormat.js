import React from 'react';


function CardFormat(props) {
  return (
    <section className={"section" + (props.activeSection === "format" ? " active" : "")}>
      <h3 className="title">Format</h3>
          <h4>Set chart type</h4>
          <button
            onPointerDown={() => props.cardMethods.setContentTypeOfSelectedCards("scatterplot")} >
            Scatter plot
          </button>
          <button
            onPointerDown={() => props.cardMethods.setContentTypeOfSelectedCards("piechart")} >
            Pie chart
          </button>
          <button
            onPointerDown={() => props.cardMethods.setContentTypeOfSelectedCards("linechart")} >
            Line chart
          </button>
          <button
            onPointerDown={() => props.cardMethods.setContentTypeOfSelectedCards("barchart2")} >
            Bar chart 2
          </button>
          <h4>Set chart options</h4>
          <button
            onPointerDown={props.cardMethods.toggleSelectedCardsLegend} >
            Toggle legend
          </button>
    </section>
  );
}

export default CardFormat;