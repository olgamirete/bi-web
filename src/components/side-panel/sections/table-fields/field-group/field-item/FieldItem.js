import React, { useState } from 'react';
import './FieldItem.css';

function FieldItem(props) {
  const [dragging, setDragging] = useState(false);

  function handlerPointerDown(e) {
    setDragging(true);
  }
  function handlerDragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
  }

  function handlerPointerUp(e) {
    setDragging(false);
  }
  function handlerDragEnd(e) {
    setDragging(false);
  }

  return (
    <li
      // key={props.key}
      className={"field-item" + (dragging ? " dragging" : "")}
      draggable="true"
      id={"table-" + props.tableId + "-field-" + props.fieldName}
      onPointerDown={handlerPointerDown}
      onPointerUp={handlerPointerUp}
      onDragStart={handlerDragStart}
      onDragEnd={handlerDragEnd} >
      {props.fieldName}
    </li>
  );
}

export default FieldItem;