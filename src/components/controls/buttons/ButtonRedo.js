import React from 'react';
import './ControlButtons.css';
import { ReactComponent as IconRedo } from './icons/redo.svg';

function ButtonRedo(props) {
  return (
    <button
    className={"button square" + (props.flagCanRedo ? "" : " disabled")}
    onPointerDown={props.methodRedo}>
      <IconRedo className="icon" />
    </button>
  );
}

export default ButtonRedo;