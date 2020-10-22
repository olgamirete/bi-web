import React from 'react';
import './FieldItem.css';

function FieldItem(props) {
  // const handlerPointerDown = (e) => {
  //   e.preventDefault();
  // }
  return (
    <li
      key={props.key}
      id={"table-" + props.tableId + "-field-" + props.fieldName}
      className="field-item">
      {props.fieldName}
    </li>
  );
}

export default FieldItem;