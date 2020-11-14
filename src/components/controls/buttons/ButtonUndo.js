import React from 'react';
import './ControlButtons.css';
import { ReactComponent as IconUndo } from './icons/undo.svg';

function ButtonUndo(props) {
  return (
    <button
      className={"button square" + (props.flagCanUndo ? "" : " disabled")}
      onPointerDown={props.methodUndo}>
        <IconUndo className="icon" />
    </button>
  );
}

export default ButtonUndo;