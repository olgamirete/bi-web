import { useState, useEffect, useCallback } from 'react';

function useControls(keyboardInfo) {

  const [flagShowSidePanel, setFlagShowSidePanel] = useState(true);
  const [flagGrid, setFlagGrid] = useState(false);
  const [lockGridSetting, setLockGridSetting] = useState(false);

  const toggleSidePanel = () => {
    setFlagShowSidePanel(!flagShowSidePanel);
  }
  const toggleGrid = useCallback((e) => {
    setFlagGrid(!flagGrid);
  }, [flagGrid]);

  useEffect(() => {
    if (keyboardInfo.altPressed === true) {
      if (lockGridSetting === false) {
        setLockGridSetting(true);
        toggleGrid();
      }
    } else {
      if (lockGridSetting === true) {
        setLockGridSetting(false);
        toggleGrid();
      }
    }
  }, [keyboardInfo.altPressed, lockGridSetting, toggleGrid]);

  

const controls = {
  flags: {
    showSidePanel: flagShowSidePanel,
    snapToGrid: flagGrid
  },
  functions: {
    toggleSidePanel: toggleSidePanel,
    toggleGrid: toggleGrid
  }
}

return controls;
}

export default useControls;