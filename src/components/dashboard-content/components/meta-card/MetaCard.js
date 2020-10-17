import React from 'react';
import './MetaCard.css';

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

        {/* {props.children} */}
        <div
          className="content"
          style={{
            width: props.cardInfo.size.width + "px",
            height: props.cardInfo.size.height + "px"
          }}>
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