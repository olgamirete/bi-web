import React from 'react';
import './TableFields.css';
import FieldGroup from './field-group/FieldGroup.js';

function TableFields(props) {
  return (
    <section className={"table-fields section" + (props.activeSection === "fields" ? " active" : "") + (props.config.theme === null ? " theme-1" : (" " + props.config.theme))}>
      <h3 className="title">Fields</h3>
      {
        Array.from(props.dataStructure.values()).map((tableStructure, i, arr) => {
          return <FieldGroup key={i} tableStructure={tableStructure} />
        })
      }
    </section>
  )
}

export default TableFields;