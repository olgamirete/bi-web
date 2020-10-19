import React, { useState } from 'react';
import './Controls.css';

function Controls(props) {
  const [test, setTest] = useState(false);
  const toggleTest = () => setTest(prevTest => !prevTest);
  return (
    <div className="controls">
      <button
        className="button"
        onClick={props.controlMethods.undo}>Undo</button>
      <button
        className="button"
        onClick={props.controlMethods.redo}>Redo</button>
      <button
        className="button"
        onClick={props.controlMethods.toggleSidePanel}>Toggle menu</button>
      <button
        alt="Toggle snap to grid"
        className={"button" + (props.controlFlags.snapToGrid ? " active" : "")}
        onPointerDown={props.controlMethods.toggleSnapToGrid}>
        Snap to grid
      </button>
      <button
        alt="Toggle display grid"
        className={"button" + (props.controlFlags.displayGrid ? " active" : "")}
        onPointerDown={props.controlMethods.toggleDisplayGrid}>
        Display grid
      </button>
      <button
        className="button"
        onPointerDown={() => props.cardMethods.add({ left: 100, top: 300 })}>+</button>
      <button
        className={"button" + (props.controlFlags.allowSelection ? " active" : "")}
        onPointerDown={props.controlMethods.toggleFlagAllowSelection}>Select</button>
      <button
        className={"button" + (test ? " active" : "")}
        onPointerDown={toggleTest}>Test</button>
    </div>
  );
}

export default Controls;