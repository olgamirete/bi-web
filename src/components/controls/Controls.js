import React from 'react';
import './Controls.css';
import ButtonToggleGrid from './buttons/ButtonToggleGrid.js';
import ButtonSelect from './buttons/ButtonSelect.js';
import ButtonDelete from './buttons/ButtonDelete.js';
import ButtonAdd from './buttons/ButtonAdd.js';
import ButtonToggleMenu from './buttons/ButtonToggleMenu.js';
import ButtonUndo from './buttons/ButtonUndo.js';
import ButtonRedo from './buttons/ButtonRedo.js';
import ButtonToggleSnapToGrid from './buttons/ButtonToggleSnapToGrid';

function Controls(props) {
  return (
    <div className={"controls " + props.config.theme}>
      <ButtonToggleMenu
        toggleSidePanel={props.controlMethods.toggleSidePanel} />
      <ButtonUndo
        flagCanUndo={props.cardFlags.canUndo}
        methodUndo={props.cardMethods.undo} />
      <ButtonRedo
        flagCanRedo={props.cardFlags.canRedo}
        methodRedo={props.cardMethods.redo} />
      <ButtonToggleGrid
        flagDisplayGrid={props.controlFlags.displayGrid}
        toggleDisplayGrid={props.controlMethods.toggleDisplayGrid} />
      <ButtonToggleSnapToGrid
        flagSnapToGrid={props.controlFlags.snapToGrid}
        methodToggleSnapToGrid={props.controlMethods.toggleSnapToGrid} />
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