import React from 'react';
import './ControlButtons.css';
import { ReactComponent as IconGridOn } from './icons/grid_on.svg';
import { ReactComponent as IconGridOff } from './icons/grid_off.svg';

function ButtonToggleGrid(props) {
  
    const buttonIcon =  props.controlFlags.displayGrid ? <IconGridOn className="icon" /> : <IconGridOff className="icon" />

    return (
    <button
        alt="Toggle display grid"
        className={"button square" + (props.controlFlags.displayGrid ? " active" : "")}
        onPointerDown={props.controlMethods.toggleDisplayGrid} >
        {buttonIcon}
      </button>
  );
}

export default ButtonToggleGrid;