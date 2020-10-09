import React from 'react';
import './SidePanel.css';

function SidePanel(props) {
  
  return (
    <div className={"side-panel" + (props.flagShow ? "" : " hide")}>
      {props.children}
    </div>
  );
}

export default SidePanel;