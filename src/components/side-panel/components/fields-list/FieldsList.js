import React, { useState } from 'react';
import './FieldsList.css';
import FieldItem from './field-item/FieldItem.js';

function FieldsList(props) {

  const [flagExpanded, setFlagExpanded] = useState(false);

  const toggleExpand = (e) => {
    e.target.innerHTML = flagExpanded ? "+" : "-";
    setFlagExpanded(!flagExpanded);
  }

  return (
    <section className="table-fields-section">
      <div className="container-button-and-title">
        <button
          className="button-expand-collapse"
          onPointerUp={toggleExpand}>+</button>
        <h4
          id={props.tableStructure.id}
          className="fields-table-name">
          {props.tableStructure.id}
        </h4>
      </div>
      <ul className={"fields-list" + (flagExpanded ? "" : " hidden")}>
        {
          props.tableStructure.fields.map((field, i, arr) => {
            return <FieldItem
              key={i}
              tableId={props.tableStructure.id}
              fieldName={field} />
          })
        }
      </ul>
    </section>
  )
}

export default FieldsList;