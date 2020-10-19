import { useState, useCallback } from 'react';

function useControls() {

  const [flagShowSidePanel, setFlagShowSidePanel] = useState(true);
  const [flagSnapToGrid, setFlagSnapToGrid] = useState(false);
  const [flagDisplayGrid, setFlagDisplayGrid] = useState(true);
  const [flagAllowSelection, setFlagAllowSelection] = useState(false);
  // const [gridSize, setGridSize] = useState({
  //   width: "100%",
  //   height: "100%"
  // })
  // const [lockGridSetting, setLockGridSetting] = useState(false);

  const toggleSidePanel = useCallback(() => {
    setFlagShowSidePanel(prevFlag => !prevFlag);
  }, []);

  const toggleSnapToGrid = useCallback(() => {
    setFlagSnapToGrid(prevFlag => !prevFlag);
  }, []);

  const toggleDisplayGrid = useCallback(() => {
    setFlagDisplayGrid(prevFlag => !prevFlag);
  }, []);

  const toggleFlagAllowSelection = useCallback(() => {
    setFlagAllowSelection(prevFlag => !prevFlag);
  }, []);

  // const setGridWidth = useCallback((newWidth) => {
  //   setGridSize(prevSize => ({
  //     width: newWidth,
  //     height: prevSize.height
  //   }));
  // }, []);

  // const setGridHeight = useCallback((newHeight) => {
  //   setGridSize(prevSize => ({
  //     width: prevSize.width,
  //     height: newHeight
  //   }));
  // }, []);


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
    displayGrid: flagDisplayGrid,
    allowSelection: flagAllowSelection
  };
  // const controlProps = {
  //   gridSize: gridSize
  // }
  const controlMethods = {
    setFlagShowSidePanel: setFlagShowSidePanel,
    toggleSidePanel: toggleSidePanel,
    toggleSnapToGrid: toggleSnapToGrid,
    toggleDisplayGrid: toggleDisplayGrid,
    toggleFlagAllowSelection: toggleFlagAllowSelection,
    setFlagAllowSelection: setFlagAllowSelection,
    // setGridSize: setGridSize,
    // setGridWidth: setGridWidth,
    // setGridHeight: setGridHeight
  };

  return [controlFlags, controlMethods];
}

export default useControls;