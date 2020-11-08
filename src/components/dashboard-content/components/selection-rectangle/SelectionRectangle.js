import React from 'react';
import './SelectionRectangle.css';

function SelectionRectangle(props) {
  return (
    <div
      id={props.selRectId}
      className={"selection-rectangle" + (props.selRectInfo.flagDraw ? "" : " hide")}
      style={{
        left: props.selRectInfo.pos.left,
        top: props.selRectInfo.pos.top,
        width: props.selRectInfo.size.width,
        height: props.selRectInfo.size.height,
        borderWidth: props.selRectInfo.borderWidth
      }}>
    </div>
  );
}

export default SelectionRectangle;