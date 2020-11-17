import React, { useState } from 'react';
import './SidePanel.css';
import TableFields from './sections/table-fields/TableFields.js';
import CardFormat from './sections/card-format/CardFormat.js';
import Config from './sections/config/Config.js';

function SidePanel(props) {

  const [activeSection, setActiveSection] = useState("fields");
  
  const handlePointerDown = (e) => {
    let selectedSection = e.target.dataset.section;
    if (selectedSection === undefined) {
      selectedSection = e.target.parentNode.dataset.section;
    }
    if(activeSection !== selectedSection) {
      setActiveSection(selectedSection);
      props.controlMethods.setFlagShowSidePanel(true);
    } else {
      props.controlMethods.toggleSidePanel();
    }
  }

  return (
    <div className={"side-panel" + (props.controlFlags.showSidePanel ? "" : " hide")}>

      <div className="buttons-container">
        <button
          data-section="fields"
          className={activeSection === "fields" ? "active" : ""}
          onPointerDown={handlePointerDown}>
          <span className="text">Fields</span>
        </button>
        <button
          data-section="format"
          className={activeSection === "format" ? "active" : ""}
          onPointerDown={handlePointerDown}>
          <span className="text">Format</span>
        </button>
        <button
          data-section="config"
          className={activeSection === "config" ? "active" : ""}
          onPointerDown={handlePointerDown}>
          <span className="text">Config</span>
        </button>
      </div>

      <div className="sections-container">
        <TableFields activeSection={activeSection} dataStructure={props.dataStructure} config={props.config} />
        <CardFormat activeSection={activeSection} cardMethods={props.cardMethods} />
        <Config activeSection={activeSection} config={props.config} />
      </div>
    </div>
  );
}

export default SidePanel;