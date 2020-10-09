import React from 'react';
import './Controls.css';

function Controls(props) {
  return (
    <div className="controls">
      <button
        style={{ width: "auto", height: 30 }}
        onClick={props.controls.functions.toggleSidePanel}>Menu</button>
      <button
        style={{ width: 30, height: 30 }}
        onClick={() => props.addNewCard({ left: 100, top: 300 })}>+</button>
      <input
        type="checkbox"
        alt="toggle grid"
        readOnly
        checked={props.controls.flags.snapToGrid}
        onPointerDown={props.controls.functions.toggleGrid} />Grid
    </div>
  );
}

export default Controls;