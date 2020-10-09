import React, { useRef } from 'react';
import './MetaCard.css';
// import Border from './components/Border.js';
// import Corner from './components/Corner.js';
import useCardSizeAndPos from './customHooks/useCardSizeAndPos.js';

function MetaCard(props) {

  // const cardContainerRef = props.cardInfo.ref;
  const cardContainerRef = useRef(null);
  const cardContentRef = useRef(null);
  const [size, pos, debugInfo] = useCardSizeAndPos(
    cardContainerRef,
    props.pointerInfo,
    props.cardInfo.startingPos,
    props.controlFlags.snapToGrid);
    
  const selected = false;

  // useEffect(() => {

  //   const hexColor = "#" + Math.round(parseInt("ffffff", 16) * Math.random()).toString(16);
  //   cardContentRef.current.style.backgroundColor = hexColor.padEnd(7, "0");
  // }, [cardContentRef]);

  return (
    <div
      ref={cardContainerRef}
      className={"resizeable-card-container" + (selected ? " selected" : "")}
      style={{ left: pos.left + "px", top: pos.top + "px", backgroundColor: props.color }}>
      <div className="col-container">
        <div className="corner nw"></div>
        <div className="border vertical left"></div>
        <div className="corner sw"></div>
      </div>

      <div className="col-container">
        <div className="border horizontal top"></div>

        {/* {props.children} */}
        <div
          ref={cardContentRef}
          className="content"
          style={{ width: size.width + "px", height: size.height + "px" }}>
          {"Debug info: " + debugInfo}
        </div>
        <div className="border horizontal bottom"></div>
      </div>

      <div className="col-container">
        <div className="corner ne"></div>
        <div className="border vertical right"></div>
        <div className="corner se"></div>
      </div>

    </div>
  );
}

export default MetaCard;