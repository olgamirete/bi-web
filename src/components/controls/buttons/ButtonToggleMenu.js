import React from 'react';
import './ControlButtons.css';
import { ReactComponent as IconHamburger } from './icons/hamburger.svg';

function ButtonToggleMenu(props) {
  return (
    <button
      className="button square"
      onPointerDown={props.toggleSidePanel}>
        <IconHamburger className="icon" />
    </button>
  );
}

export default ButtonToggleMenu;