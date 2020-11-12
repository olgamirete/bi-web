import React from 'react';
import './Controls.css';

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
      <button
        alt="Toggle display grid"
        className={"button" + (props.controlFlags.displayGrid ? " active" : "")}
        onPointerDown={props.controlMethods.toggleDisplayGrid}>
        Display grid
      </button>
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