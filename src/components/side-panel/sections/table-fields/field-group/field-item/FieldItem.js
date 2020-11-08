import React from 'react';
import './FieldItem.css';

function FieldItem(props) {
  return (
    <li
      // key={props.key}
      className="field-item"
      draggable="true" >
      <span
        id={"table-" + props.tableId + "-field-" + props.fieldName}
        draggable="true">
          {props.fieldName}
      </span>
    </li>
  );
}

export default FieldItem;