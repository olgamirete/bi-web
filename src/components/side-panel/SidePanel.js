import React, { useState } from 'react';
import './SidePanel.css';
import FieldsList from './components/fields-list/FieldsList.js';

function SidePanel(props) {

  const [activeSection, setActiveSection] = useState("fields");
  const activateSection = (e) => {
    let section = e.target.dataset.section;
    if (section === undefined) {
      section = e.target.parentNode.dataset.section;
    }
    setActiveSection(section);
  }

  return (
    <div className={"side-panel" + (props.flagShow ? "" : " hide")}>

      <div className="buttons-container">
        <button
          data-section="fields"
          className={activeSection === "fields" ? "active" : ""}
          onPointerDown={activateSection}>
          <span className="text">Fields</span>
        </button>
        <button
          data-section="format"
          className={activeSection === "format" ? "active" : ""}
          onPointerDown={activateSection}>
          <span className="text">Format</span>
        </button>
      </div>

      <div className="sections-container">
        <section className={"section" + (activeSection === "fields" ? " active" : "")}>
          <h3 className="title">Fields</h3>
          {
            Array.from(props.dataStructure.values()).map((tableStructure, i, arr) => {
              return <FieldsList key={i} tableStructure={tableStructure} />
            })
          }
        </section>
        <section className={"section" + (activeSection === "format" ? " active" : "")}>
          <h3 className="title">Format</h3>
          Format options
        </section>
      </div>
    </div>
  );
}

export default SidePanel;