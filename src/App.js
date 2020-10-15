import React, { useRef } from 'react';
import './App.css';

// Custom hooks-----------------------------------------------------------------
// import usePointerInfo from './customHooks/usePointerInfo.js';
import useKeyboardInfo from './customHooks/useKeyboardInfo.js';
import useControls from './customHooks/useControls.js';
import useCards from './customHooks/useCards.js';
//------------------------------------------------------------------------------

// Basic components-------------------------------------------------------------
import Controls from './components/controls/Controls.js';
import SidePanel from './components/side-panel/SidePanel.js';
import DashboardContent from './components/dashboard-content/DashboardContent.js';
//------------------------------------------------------------------------------

// Debug------------------------------------------------------------------------
// import PointerData from './components/debug/PointerData.js';
// import KeyboardData from './components/debug/KeyboardData.js';
// -----------------------------------------------------------------------------

function App() {

  const dashboardContentRef = useRef(null);

  // const pointerInfo = usePointerInfo(dashboardContentRef);
  const keyboardInfo = useKeyboardInfo();
  const controls = useControls(keyboardInfo);
  // const [pointerClass, setPointerClass] = useState("normal")
  
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
        
        <SidePanel flagShow={controls.flags.showSidePanel}>
          {/* <PointerData pointerInfo={pointerInfo} /> */}
        </SidePanel>
        
        <DashboardContent
          dashboardContentRef={dashboardContentRef}
          // pointerInfo={pointerInfo}
          keyboardInfo={keyboardInfo}
          cards={cards}
          cardMethods={cardMethods}
          controlFlags={controls.flags} />

      </div>

    </div>
  );
}

export default App;