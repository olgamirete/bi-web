import React, { useState } from 'react';
import './SidePanel.css';
// import FieldsList from './components/fields-list/FieldsList.js';
import TableFields from './sections/table-fields/TableFields.js';
import CardFormat from './sections/card-format/CardFormat.js';
import Other from './sections/other/Other.js';

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
          data-section="other"
          className={activeSection === "other" ? "active" : ""}
          onPointerDown={handlePointerDown}>
          <span className="text">Other</span>
        </button>
      </div>

      <div className="sections-container">
        <TableFields activeSection={activeSection} dataStructure={props.dataStructure} />
        <CardFormat activeSection={activeSection} />
        <Other activeSection={activeSection} />
      </div>
    </div>
  );
}

export default SidePanel;