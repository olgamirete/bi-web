import React from 'react';
import './ControlButtons.css';
import { ReactComponent as IconSnapToGridOn } from './icons/magnet_on.svg';
import { ReactComponent as IconSnapToGridOff } from './icons/magnet_off.svg';

function ButtonToggleSnapToGrid(props) {

  const buttonIcon =  props.flagSnapToGrid ? <IconSnapToGridOn className="icon" /> : <IconSnapToGridOff className="icon" />

  return (
    <button
      alt="Toggle snap to grid"
      className={"button square" + (props.flagSnapToGrid ? " active" : "")}
      onPointerDown={props.methodToggleSnapToGrid}>
        {buttonIcon}
    </button>
  );
}

export default ButtonToggleSnapToGrid;