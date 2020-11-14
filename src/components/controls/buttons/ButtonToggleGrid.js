import React from 'react';
import './ControlButtons.css';
import { ReactComponent as IconGridOn } from './icons/grid_on.svg';
import { ReactComponent as IconGridOff } from './icons/grid_off.svg';

function ButtonToggleGrid(props) {
  
    const buttonIcon =  props.flagDisplayGrid ? <IconGridOn className="icon" /> : <IconGridOff className="icon" />

    return (
    <button
        alt="Toggle display grid"
        // className={"button square" + (props.flagDisplayGrid ? " active" : "")}
        className={"button square"}
        onPointerDown={props.toggleDisplayGrid} >
        {buttonIcon}
      </button>
  );
}

export default ButtonToggleGrid;