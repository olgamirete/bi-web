import { useState, useCallback } from 'react';

function useControls() {

  const [flagShowSidePanel, setFlagShowSidePanel] = useState(true);
  const [flagSnapToGrid, setFlagSnapToGrid] = useState(false);
  const [flagDisplayGrid, setFlagDisplayGrid] = useState(true);
  // const [lockGridSetting, setLockGridSetting] = useState(false);

  const toggleSidePanel = () => {
    setFlagShowSidePanel(!flagShowSidePanel);
  }

  const toggleSnapToGrid = useCallback((e) => {
    setFlagSnapToGrid(!flagSnapToGrid);
  }, [flagSnapToGrid]);

  const toggleDisplayGrid = useCallback((e) => {
    setFlagDisplayGrid(!flagDisplayGrid);
  }, [flagDisplayGrid]);


  // // Handle Alt key press and release.------------------------------------------
  // useEffect(() => {
  //   if (keyboardInfo.altPressed === true) {
  //     if (lockGridSetting === false) {
  //       setLockGridSetting(true);
  //       toggleSnapToGrid();
  //     }
  //   } else {
  //     if (lockGridSetting === true) {
  //       setLockGridSetting(false);
  //       toggleSnapToGrid();
  //     }
  //   }
  // }, [keyboardInfo.altPressed, lockGridSetting, toggleSnapToGrid]);
  // // ---------------------------------------------------------------------------



  const controlFlags = {
    showSidePanel: flagShowSidePanel,
    snapToGrid: flagSnapToGrid,
    displayGrid: flagDisplayGrid
  };
  const controlMethods = {
    setFlagShowSidePanel: setFlagShowSidePanel,
    toggleSidePanel: toggleSidePanel,
    toggleSnapToGrid: toggleSnapToGrid,
    toggleDisplayGrid: toggleDisplayGrid
  };

  return [controlFlags, controlMethods];
}

export default useControls;