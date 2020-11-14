import React from 'react';
import './Controls.css';
import ButtonToggleGrid from './buttons/ButtonToggleGrid.js';
import ButtonSelect from './buttons/ButtonSelect.js';
import ButtonDelete from './buttons/ButtonDelete.js';
import ButtonAdd from './buttons/ButtonAdd.js';
import ButtonToggleMenu from './buttons/ButtonToggleMenu.js';
import ButtonUndo from './buttons/ButtonUndo.js';
import ButtonRedo from './buttons/ButtonRedo.js';

function Controls(props) {
  return (
    <div className={"controls " + (props.config.theme === null ? "theme-1" : props.config.theme)}>
      <ButtonToggleMenu
        toggleSidePanel={props.controlMethods.toggleSidePanel} />
      <ButtonUndo
        flagCanUndo={props.cardFlags.canUndo}
        methodUndo={props.cardMethods.undo} />
      <ButtonRedo
        flagCanRedo={props.cardFlags.canRedo}
        methodRedo={props.cardMethods.redo} />
      <button
        alt="Toggle snap to grid"
        className={"button" + (props.controlFlags.snapToGrid ? " active" : "")}
        onPointerDown={props.controlMethods.toggleSnapToGrid}>
        Snap to grid
      </button>
      <ButtonToggleGrid
        flagDisplayGrid={props.controlFlags.displayGrid}
        toggleDisplayGrid={props.controlMethods.toggleDisplayGrid} />
      <ButtonAdd
        addCard={props.cardMethods.add} />
      <ButtonSelect
        flagAllowSelection={props.controlFlags.allowSelection}
        toggleFlagAllowSelection={props.controlMethods.toggleFlagAllowSelection} />
      <ButtonDelete
        deleteSelected={props.cardMethods.deleteSelected} />
    </div>
  );
}

export default Controls;