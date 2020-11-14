import React from 'react';
import './ControlButtons.css';
import { ReactComponent as IconSelect } from './icons/select.svg';

function ButtonSelect(props) {


  return (
    <button
      className={"button square" + (props.flagAllowSelection ? " active" : "")}
      onPointerDown={props.toggleFlagAllowSelection}>
      <IconSelect className="icon" />
    </button>
  );
}

export default ButtonSelect;