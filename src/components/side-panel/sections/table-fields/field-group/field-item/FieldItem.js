import React from 'react';
import './FieldItem.css';

function FieldItem(props) {
  function handlerDragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
  }
  return (
    <li
      // key={props.key}
      className="field-item"
      draggable="true" >
      <span
        id={"table-" + props.tableId + "-field-" + props.fieldName}
        draggable="true"
        onDragStart={handlerDragStart} >
          {props.fieldName}
      </span>
    </li>
  );
}

export default FieldItem;