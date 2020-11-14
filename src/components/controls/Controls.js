import React from 'react';
import './Controls.css';
import ButtonToggleGrid from './buttons/ButtonToggleGrid.js';

function Controls(props) {
  // const [test, setTest] = useState(false);
  // const toggleTest = () => setTest(prevTest => !prevTest);
  return (
    <div className="controls theme-1">
      <button
        className="button"
        onPointerDown={props.controlMethods.toggleSidePanel}>Toggle menu</button>
      <button
        className={"button" + (props.cardFlags.canUndo ? "" : " disabled")}
        onPointerDown={props.cardMethods.undo}>Undo</button>
      <button
        className={"button" + (props.cardFlags.canRedo ? "" : " disabled")}
        onPointerDown={props.cardMethods.redo}>Redo</button>
      <button
        alt="Toggle snap to grid"
        className={"button" + (props.controlFlags.snapToGrid ? " active" : "")}
        onPointerDown={props.controlMethods.toggleSnapToGrid}>
        Snap to grid
      </button>
      <ButtonToggleGrid
        controlFlags={props.controlFlags}
        controlMethods={props.controlMethods} />
      <button
        className="button"
        onPointerDown={() => props.cardMethods.add({ pos: { left: 20, top: 20 } })}>+</button>
      <button
        className={"button" + (props.controlFlags.allowSelection ? " active" : "")}
        onPointerDown={props.controlMethods.toggleFlagAllowSelection}>Select</button>
      <button
        className="button"
        onPointerDown={props.cardMethods.deleteSelected}>Delete</button>
    </div>
  );
}

export default Controls;