import { useState, useEffect, useCallback } from 'react';

function useControls(keyboardInfo) {

  const [flagShowSidePanel, setFlagShowSidePanel] = useState(true);
  const [flagSnapToGrid, setFlagSnapToGrid] = useState(false);
  const [flagDisplayGrid, setFlagDisplayGrid] = useState(true);
  const [lockGridSetting, setLockGridSetting] = useState(false);

  const toggleSidePanel = () => {
    setFlagShowSidePanel(!flagShowSidePanel);
  }
  
  const toggleSnapToGrid = useCallback((e) => {
    setFlagSnapToGrid(!flagSnapToGrid);
  }, [flagSnapToGrid]);
  
  const toggleDisplayGrid = useCallback((e) => {
    setFlagDisplayGrid(!flagDisplayGrid);
  }, [flagDisplayGrid]);


  // Handle Alt key press and release.------------------------------------------
  useEffect(() => {
    if (keyboardInfo.altPressed === true) {
      if (lockGridSetting === false) {
        setLockGridSetting(true);
        toggleSnapToGrid();
      }
    } else {
      if (lockGridSetting === true) {
        setLockGridSetting(false);
        toggleSnapToGrid();
      }
    }
  }, [keyboardInfo.altPressed, lockGridSetting, toggleSnapToGrid]);
  // ---------------------------------------------------------------------------

  

const controls = {
  flags: {
    showSidePanel: flagShowSidePanel,
    snapToGrid: flagSnapToGrid,
    displayGrid: flagDisplayGrid
  },
  methods: {
    toggleSidePanel: toggleSidePanel,
    toggleSnapToGrid: toggleSnapToGrid,
    toggleDisplayGrid: toggleDisplayGrid
  }
}

return controls;
}

export default useControls;