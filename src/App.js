import React, { useRef } from 'react';
import './App.css';

// Custom hooks-----------------------------------------------------------------
// import usePointerInfo from './customHooks/usePointerInfo.js';
import useKeyboardInfo from './customHooks/useKeyboardInfo.js';
import useControls from './customHooks/useControls.js';
import useCards from './customHooks/useCards.js';
import useData from './customHooks/useData.js';
// -----------------------------------------------------------------------------

// Basic components-------------------------------------------------------------
import Controls from './components/controls/Controls.js';
import SidePanel from './components/side-panel/SidePanel.js';
import DashboardContent from './components/dashboard-content/DashboardContent.js';
// -----------------------------------------------------------------------------

function App() {

  const dashboardContentRef = useRef(null);

  const keyboardInfo = useKeyboardInfo();
  const controls = useControls(keyboardInfo);
  
  const [cards, cardMethods] = useCards(controls.flags);
  // const selection = useSelection(cards, pointerInfo);

  return (
    <div
      className="App">
      
      <Controls
        cardMethods={cardMethods}
        controls={controls} />
      {/* <KeyboardData keyboardInfo={keyboardInfo} /> */}

      <div className="container-for-side-panel-and-content">
        
        <SidePanel
          flagShow={controls.flags.showSidePanel}
          dataStructure={dataStructure} />
        
        <DashboardContent
          dashboardContentRef={dashboardContentRef}
          keyboardInfo={keyboardInfo}
          cards={cards}
          cardMethods={cardMethods}
          controlFlags={controls.flags}
          data={data} />

      </div>

    </div>
  );
}

export default App;