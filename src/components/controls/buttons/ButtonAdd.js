import React from 'react';
import './ControlButtons.css';
import { ReactComponent as IconPlus } from './icons/plus.svg';

function ButtonAdd(props) {
  return (
    <button
      className="button square"
      onPointerDown={() => props.addCard({ pos: { left: 20, top: 20 } })}>
        <IconPlus className="icon" />
    </button>
  );
}

export default ButtonAdd;