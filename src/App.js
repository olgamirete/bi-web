import React from 'react';
import './App.css';
import './ColorPalette.css';

// Custom hooks-----------------------------------------------------------------
import useControls from './customHooks/useControls.js';
import useCards from './customHooks/useCards.js';
import useData from './customHooks/useData.js';
import useConfig from './customHooks/useConfig.js';
// -----------------------------------------------------------------------------

// Basic components-------------------------------------------------------------
import Controls from './components/controls/Controls.js';
import SidePanel from './components/side-panel/SidePanel.js';
import DashboardContent from './components/dashboard-content/DashboardContent.js';
// -----------------------------------------------------------------------------

function App() {

  const [controlFlags, controlMethods] = useControls();
  
  const [cards, cardFlags, cardMethods] = useCards(controlFlags);
  const [dataStructure, data] = useData();
  
  const config = useConfig();

  return (
    <div
      className="App">
      
      <Controls
        cardFlags={cardFlags}
        cardMethods={cardMethods}
        controlFlags={controlFlags}
        controlMethods={controlMethods}
        config={config} />

      <div className="container-for-side-panel-and-content">
        
        <SidePanel
          controlFlags={controlFlags}
          controlMethods={controlMethods}
          dataStructure={dataStructure}
          cardMethods={cardMethods}
          config={config} />
        
        <DashboardContent
          cards={cards}
          cardMethods={cardMethods}
          controlFlags={controlFlags}
          controlMethods={controlMethods}
          data={data} />

      </div>

    </div>
  );
}

export default App;