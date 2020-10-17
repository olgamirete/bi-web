import React from 'react';
import './Controls.css';

function Controls(props) {
  const testFunc = (e) => {
    const dashboard = document.getElementById("dashboard-content");
    // const dashboardRect = dashboard.getBoundingClientRect();
    // alert(JSON.stringify(dashboardRect));
    alert(dashboard.scrollWidth + " - " + dashboard.scrollHeight);
  }
  return (
    <div className="controls">
      <button
        onClick={props.controlMethods.toggleSidePanel}>Toggle menu</button>
      <button
        alt="Toggle snap to grid"
        className={props.controlFlags.snapToGrid ? "active" : ""}
        onPointerDown={props.controlMethods.toggleSnapToGrid}>
        Snap to grid
      </button>
      <button
        alt="Toggle display grid"
        className={props.controlFlags.displayGrid ? "active" : ""}
        onPointerDown={props.controlMethods.toggleDisplayGrid}>
        Display grid
      </button>
      <button
        onClick={() => props.cardMethods.add({ left: 100, top: 300 })}>+</button>
      <button
        onClick={testFunc}>Test</button>
    </div>
  );
}

export default Controls;