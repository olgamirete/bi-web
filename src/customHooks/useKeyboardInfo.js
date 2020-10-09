import { useEffect, useState } from 'react';

function useKeyboardInfo() {

  const [keryboardInfo, setKeyboardInfo] = useState({
    lastKeyPressed: "",
    lastKeyReleased: "",
    ctrlPressed: false,
    shiftPressed: false,
    altPressed: false
  });

  const handleKeyDown = (e) => {
    setKeyboardInfo((prevState) => ({
      lastKeyPressed: e.key,
      lastKeyReleased: prevState.lastKeyReleased,
      ctrlPressed: prevState.ctrlPressed  || e.key === "Control",
      shiftPressed: prevState.shiftPressed  || e.key === "Shift",
      altPressed: prevState.altPressed  || e.key === "Alt"
    }));
  }

  const handleKeyUp = (e) => {
    setKeyboardInfo((prevState) => ({
      lastKeyPressed: prevState.lastKeyPressed,
      lastKeyReleased: e.key,
      ctrlPressed: prevState.ctrlPressed  && e.key !== "Control",
      shiftPressed: prevState.shiftPressed  && e.key !== "Shift",
      altPressed: prevState.altPressed  && e.key !== "Alt"
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