import React from 'react';
import './FieldItem.css';

function FieldItem(props) {
  return (
    <li
      // key={props.key}
      id={"table-" + props.tableId + "-field-" + props.fieldName}
      className="field-item">
      {props.fieldName}
    </li>
  );
}

export default FieldItem;