import React from 'react';
import './ControlButtons.css';
import { ReactComponent as IconDelete } from './icons/delete.svg';

function ButtonDelete(props) {
  return (
    <button
      className="button square"
      onPointerDown={props.deleteSelected}>
        <IconDelete className="icon" />
    </button>
  );
}

export default ButtonDelete;