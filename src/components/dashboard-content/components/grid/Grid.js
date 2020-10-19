import React from 'react';
import './Grid.css';

function Grid(props) {
  return (
    <div
      className="grid" >
      {
        props.controlFlags.displayGrid === true &&
        <span>
          <div
            className="small-grid"></div>
          <div
            className="big-grid"></div>
        </span>
      }
    </div>
  )
}

export default Grid;