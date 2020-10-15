import React from 'react';
import './Controls.css';

function Controls(props) {
  return (
    <div className="controls">
      <button
        style={{ width: "auto", height: 30 }}
        onClick={props.controls.methods.toggleSidePanel}>Menu</button>
      <button
        style={{ width: 30, height: 30 }}
        onClick={() => props.cardMethods.add({ left: 100, top: 300 })}>+</button>
      <input
        type="checkbox"
        alt="toggle snap to grid"
        readOnly
        checked={props.controls.flags.snapToGrid}
        onPointerDown={props.controls.methods.toggleSnapToGrid} />Snap to grid
      <input
        type="checkbox"
        alt="toggle display grid"
        readOnly
        checked={props.controls.flags.displayGrid}
        onPointerDown={props.controls.methods.toggleDisplayGrid} />Display grid
    </div>
  );
}

export default Controls;