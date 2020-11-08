import React from 'react';
import './MetaCard.css';
import BarChart from '../card-content/charts/BarChart.js';
import PieChart from '../card-content/charts/PieChart.js';
import LineChart from '../card-content/charts/LineChart.js';

const METACARD_BORDER_WIDTH = 1;

function Contents(props) {
  switch (props.cardInfo.type) {
    case "barchart":
      return <BarChart {...props}/>
    case "piechart":
      return <PieChart {...props}/>
    case "linechart":
      return <LineChart {...props}/>  
    default:
      // return <div>empty</div>
      return <BarChart {...props}/>
      // break;
  }
}

function MetaCard(props) {

  const selected = props.cardInfo.selected;

  return (
    <div
      id={props.cardInfo.id}
      className={"resizeable-card-container" + (selected ? " selected" : "") + (props.controlFlags.snapToGrid ? " animate-all" : "" ) + (props.dashboardFlags.overrideHoverPointers ? " unset-cursors" : "")}
      style={{
        left: props.cardInfo.pos.left + "px",
        top: props.cardInfo.pos.top + "px",
        backgroundColor: props.color
      }}>
      <div className="col-container">
        <div className="corner nw" data-anchor={{ right: true, bottom: true }}></div>
        <div className="border vertical left" data-anchor={{ right: true, bottom: false }}></div>
        <div className="corner sw" data-anchor={{ right: true, bottom: false }}></div>
      </div>

      <div className="col-container">
        <div className="border horizontal top" data-anchor={{ right: false, bottom: true }}></div>

        <div
          className="content"
          style={{
            width: props.cardInfo.size.width + "px",
            height: props.cardInfo.size.height + "px",
            borderWidth: METACARD_BORDER_WIDTH
          }}>
            <Contents {...props} borderWidth={METACARD_BORDER_WIDTH} />
          {/* {props.children} */}
          {/* {"Debug info: " + debugInfo} */}
          {/* {"controller index: " + controllerPointerIndex} */}
        </div>
        <div className="border horizontal bottom" data-anchor={{ right: false, bottom: false }}></div>
      </div>

      <div className="col-container">
        <div className="corner ne" data-anchor={{ right: false, bottom: true }}></div>
        <div className="border vertical right" data-anchor={{ right: false, bottom: false }}></div>
        <div className="corner se" data-anchor={{ right: false, bottom: false }}></div>
      </div>

    </div>
  );
}

export default MetaCard;