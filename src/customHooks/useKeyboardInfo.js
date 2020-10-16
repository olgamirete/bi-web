import { useEffect, useState } from 'react';

function useKeyboardInfo() {

  const [keryboardInfo, setKeyboardInfo] = useState({
    lastKeyPressed: "",
    lastKeyReleased: "",
    ctrlPressed: false,
    shiftPressed: false,
    altPressed: false,
    keyPressCounter: 0,
    keyReleaseCounter: 0
  });

  const handleKeyDown = (e) => {
    setKeyboardInfo((prevState) => ({
      lastKeyPressed: e.key,
      lastKeyReleased: prevState.lastKeyReleased,
      ctrlPressed: prevState.ctrlPressed || e.key === "Control",
      shiftPressed: prevState.shiftPressed || e.key === "Shift",
      altPressed: prevState.altPressed || e.key === "Alt",
      keyPressCounter: prevState.keyPressCounter+1,
      keyReleaseCounter: prevState.keyReleaseCounter
      
    }));
  }

  const handleKeyUp = (e) => {
    setKeyboardInfo((prevState) => ({
      lastKeyPressed: prevState.lastKeyPressed,
      lastKeyReleased: e.key,
      ctrlPressed: prevState.ctrlPressed  && e.key !== "Control",
      shiftPressed: prevState.shiftPressed  && e.key !== "Shift",
      altPressed: prevState.altPressed  && e.key !== "Alt",
      keyPressCounter: prevState.keyPressCounter,
      keyReleaseCounter: prevState.keyReleaseCounter+1
    }));
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    }
  }, []);

  return keryboardInfo;
}

export default useKeyboardInfo;