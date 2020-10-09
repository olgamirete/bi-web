import { useState, useLayoutEffect } from 'react';

function usePointerInfo(dashboardContentRef) {

  
  const [pointerInfo, setPointerInfo] = useState({
    pointers: [{
      id: null,
      lastClickedPos: null,
      currentPos: null,
      pointerDown: false,
      isTouch: false,
      targetElementOnStart: null,
      ctrlPressedOnStart: false,
      shiftPressedOnStart: false,
      altPressedOnStart: false,
    }],
    ctrlPressed: false,
    shiftPressed: false,
    altPressed: false,
    pointerIndexPressed: 0,
    pointerIndexMoved: 0,
    pointerIndexReleased: 0
  });
  
  const newPointersArray = (prevState, singlePointerInfo) => {
    let oldPointers = prevState.pointers;
    oldPointers[singlePointerInfo.id] = singlePointerInfo;
    return oldPointers;
  }

  useLayoutEffect(() => {
    
    const dashboardContent = dashboardContentRef.current;
    const rect = dashboardContent.getBoundingClientRect();
    const dashboardPos = {
      x: rect.left,
      y: rect.top
    }

    const handlePointerDown = (e) => {
      e.preventDefault();
      setPointerInfo((prevState) => ({
        pointers: newPointersArray(prevState, {
          id: e.pointerId,
          lastClickedPos: {
            pageX: e.pageX,
            pageY: e.pageY,
            clientX: e.clientX,
            clientY: e.clientY,
            dashX: e.pageX-dashboardPos.x,
            dashY: e.pageY-dashboardPos.y
          },
          currentPos: {
            x: e.pageX,
            y: e.pageY,
            clientX: e.clientX,
            clientY: e.clientY,
            dashX: e.pageX-dashboardPos.x,
            dashY: e.pageY-dashboardPos.y
          },
          pointerDown: true,
          isTouch: e.pointerType === "touch",
          targetElementOnStart: e.target,
          ctrlPressedOnStart: e.ctrlKey,
          shiftPressedOnStart: e.shiftKey,
          altPressedOnStart: e.altKey,
        }),
        ctrlPressed: e.ctrlKey,
        shiftPressed: e.shiftKey,
        altPressed: e.altKey,
        pointerIndexPressed: e.pointerId,
        pointerIndexMoved: prevState.pointerIndexMoved,
        pointerIndexReleased: prevState.pointerIndexReleased
      }));
    }

    const handlePointerMove = (e) => {
      e.preventDefault();
      setPointerInfo((prevState) => ({
        pointers: newPointersArray(prevState, {
          id: e.pointerId,
          lastClickedPos: prevState.pointers[e.pointerId].lastClickedPos,
          currentPos: {
            pageX: e.pageX,
            pageY: e.pageY,
            clientX: e.clientX,
            clientY: e.clientY,
            dashX: e.pageX-dashboardPos.x,
            dashY: e.pageY-dashboardPos.y
          },
          pointerDown: prevState.pointers[e.pointerId].pointerDown,
          isTouch: e.pointerType === "touch",
          targetElementOnStart: prevState.pointers[e.pointerId].targetElementOnStart,
          ctrlPressedOnStart: prevState.pointers[e.pointerId].ctrlPressedOnStart,
          shiftPressedOnStart: prevState.pointers[e.pointerId].shiftPressedOnStart,
          altPressedOnStart: prevState.pointers[e.pointerId].altPressedOnStart
        }),
        ctrlPressed: e.ctrlKey,
        shiftPressed: e.shiftKey,
        altPressed: e.altKey,
        pointerIndexPressed: prevState.pointerIndexPressed,
        pointerIndexMoved: e.pointerId,
        pointerIndexReleased: prevState.pointerIndexReleased
      }));
    }

    const handlePointerUp = (e) => {
      e.preventDefault();
      setPointerInfo((prevState) => ({
        pointers: newPointersArray(prevState, {
          id: e.pointerId,
          lastClickedPos: prevState.pointers[e.pointerId].lastClickedPos,
          currentPos: {
            pageX: e.pageX,
            pageY: e.pageY,
            clientX: e.clientX,
            clientY: e.clientY,
            dashX: e.pageX-dashboardPos.x,
            dashY: e.pageY-dashboardPos.y
          },
          pointerDown: false,
          isTouch: prevState.pointers[e.pointerId].isTouch,
          targetElementOnStart: prevState.pointers[e.pointerId].targetElementOnStart,
          ctrlPressedOnStart: prevState.pointers[e.pointerId].ctrlPressedOnStart,
          shiftPressedOnStart: prevState.pointers[e.pointerId].shiftPressedOnStart,
          altPressedOnStart: prevState.pointers[e.pointerId].altPressedOnStart
        }),
        ctrlPressed: e.ctrlKey,
        shiftPressed: e.shiftKey,
        altPressed: e.altKey,
        pointerIndexPressed: prevState.pointerIndexPressed,
        pointerIndexMoved: prevState.pointerIndexMoved,
        pointerIndexReleased: e.pointerId
      }));
    }
    
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    }
  }, [dashboardContentRef]);

  return pointerInfo;

}

export default usePointerInfo;