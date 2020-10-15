import { useState, useLayoutEffect } from 'react';

const ID_FOR_MOUSE_POINTER = 0;

function usePointerInfo(dashboardContentRef) {

  const [pointerInfo, setPointerInfo] = useState({
    pointers: [{
      id: 0,
      lastClickedPos: {
        pageX: 0,
        pageY: 0,
        clientX: 0,
        clientY: 0,
        dashX: 0,
        dashY: 0
      },
      currentPos: {
        pageX: 0,
        pageY: 0,
        clientX: 0,
        clientY: 0,
        dashX: 0,
        dashY: 0
      },
      pointerDown: false,
      isTouch: false,
      targetElementOnStart: null
    }],
    pointerIndexPressed: 0,
    pointerIndexMoved: 0,
    pointerIndexReleased: 0,
    pointerDownCounter: 0,
    pointerUpCounter: 0
  });

  const newPointersArray = (prevState, singlePointerInfo) => {
    let oldPointers = prevState.pointers;
    oldPointers[singlePointerInfo.id] = singlePointerInfo;
    return oldPointers;
  }

  useLayoutEffect(() => {

    const dashboardContent = dashboardContentRef.current;
    const rect = dashboardContent.getBoundingClientRect();
    // Add handler for when the dashboard moves.
    const dashboardPos = {
      x: rect.left,
      y: rect.top
    }

    const handlePointerDown = (e, eType) => {
      // e.preventDefault();
      // console.log("dash pos: " + JSON.stringify(dashboardPos));
      const isTouch = (eType === "touch");
      let pointer = null;
      switch (eType) {
        case "touch":
          console.log("changed touches: " + e.changedTouches.length);
          pointer = e.changedTouches[e.changedTouches.length-1];
          break;
        case "mouse":
          pointer = e;
          break;
        default:
          return Error;
      }
      const pointerId = isTouch === true ? pointer.identifier : ID_FOR_MOUSE_POINTER;
      setPointerInfo((prevState) => ({
        pointers: newPointersArray(prevState, {
          id: pointerId,
          lastClickedPos: {
            pageX: pointer.pageX,
            pageY: pointer.pageY,
            clientX: pointer.clientX,
            clientY: pointer.clientY,
            dashX: pointer.pageX - dashboardPos.x,
            dashY: pointer.pageY - dashboardPos.y
          },
          currentPos: {
            x: pointer.pageX,
            y: pointer.pageY,
            clientX: pointer.clientX,
            clientY: pointer.clientY,
            dashX: pointer.pageX - dashboardPos.x,
            dashY: pointer.pageY - dashboardPos.y
          },
          pointerDown: true,
          isTouch: isTouch,
          targetElementOnStart: pointer.target
        }),
        pointerIndexPressed: pointerId,
        pointerIndexMoved: prevState.pointerIndexMoved,
        pointerIndexReleased: prevState.pointerIndexReleased,
        pointerDownCounter: prevState.pointerDownCounter + 1,
        pointerUpCounter: prevState.pointerUpCounter
      }));
    }

    const handlePointerMove = (e, eType) => {
      // e.preventDefault();
      const isTouch = (eType === "touch");
      let pointer = null;
      switch (eType) {
        case "touch":
          console.log("changed touches: " + e.changedTouches.length);
          pointer = e.changedTouches[e.changedTouches.length-1];
          break;
        case "mouse":
          pointer = e;
          break;
        default:
          return Error;
      }
      const pointerId = isTouch === true ? pointer.identifier : ID_FOR_MOUSE_POINTER;
      setPointerInfo((prevState) => ({
        pointers: newPointersArray(prevState, {
          id: pointerId,
          lastClickedPos: prevState.pointers[pointerId].lastClickedPos,
          currentPos: {
            pageX: pointer.pageX,
            pageY: pointer.pageY,
            clientX: pointer.clientX,
            clientY: pointer.clientY,
            dashX: pointer.pageX - dashboardPos.x,
            dashY: pointer.pageY - dashboardPos.y
          },
          pointerDown: true,
          isTouch: prevState.pointers[pointerId].isTouch,
          targetElementOnStart: 0 //prevState.pointers[pointerId].targetElementOnStart
        }),
        pointerIndexPressed: prevState.pointerIndexPressed,
        pointerIndexMoved: pointerId,
        pointerIndexReleased: prevState.pointerIndexReleased,
        pointerDownCounter: prevState.pointerDownCounter,
        pointerUpCounter: prevState.pointerUpCounter
      }));
    }

    const handlePointerUp = (e, eType) => {
      // e.preventDefault();
      const isTouch = (eType === "touch");
      let pointer = null;
      switch (eType) {
        case "touch":
          console.log("changed touches: " + e.changedTouches.length);
          pointer = e.changedTouches[e.changedTouches.length-1];
          break;
        case "mouse":
          pointer = e;
          break;
        default:
          return Error;
      }
      const pointerId = isTouch === true ? pointer.identifier : ID_FOR_MOUSE_POINTER;
      setPointerInfo((prevState) => ({
        pointers: newPointersArray(prevState, {
          id: pointerId,
          lastClickedPos: prevState.pointers[pointerId].lastClickedPos,
          currentPos: {
            pageX: pointer.pageX,
            pageY: pointer.pageY,
            clientX: pointer.clientX,
            clientY: pointer.clientY,
            dashX: pointer.pageX - dashboardPos.x,
            dashY: pointer.pageY - dashboardPos.y
          },
          pointerDown: false,
          isTouch: prevState.pointers[pointerId].isTouch,
          targetElementOnStart: prevState.pointers[pointerId].targetElementOnStart
        }),
        pointerIndexPressed: prevState.pointerIndexPressed,
        pointerIndexMoved: prevState.pointerIndexMoved,
        pointerIndexReleased: pointerId,
        pointerDownCounter: prevState.pointerDownCounter,
        pointerUpCounter: prevState.pointerUpCounter + 1
      }));
    }

    const handleMouseDown = (e) => { handlePointerDown(e, "mouse"); }
    const handleMouseMove = (e) => { handlePointerMove(e, "mouse"); }
    const handleMouseUp = (e) => { handlePointerUp(e, "mouse"); }
    const handleTouchStart = (e) => { handlePointerDown(e, "touch"); }
    const handleTouchMove = (e) => { handlePointerMove(e, "touch"); }
    const handleTouchEnd = (e) => { handlePointerUp(e, "touch"); }

    window.addEventListener("mousedown", handleMouseDown, false);
    window.addEventListener("mousemove", handleMouseMove, false);
    window.addEventListener("mouseup", handleMouseUp, false);

    window.addEventListener("touchstart", handleTouchStart, false);
    window.addEventListener("touchmove", handleTouchMove, false);
    window.addEventListener("touchend", handleTouchEnd, false);

    // window.addEventListener("pointerdown", handlePointerDown);
    // window.addEventListener("pointermove", handlePointerMove);
    // window.addEventListener("pointerup", handlePointerUp);
    return () => {
      // window.removeEventListener("pointerdown", handlePointerDown);
      // window.removeEventListener("pointermove", handlePointerMove);
      // window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("mousedown", handleMouseDown, false);
      window.removeEventListener("mousemove", handleMouseMove, false);
      window.removeEventListener("mouseup", handleMouseUp, false);

      window.removeEventListener("touchstart", handleTouchStart, false);
      window.removeEventListener("touchmove", handleTouchMove, false);
      window.removeEventListener("touchend", handleTouchEnd, false);
    }
  }, [dashboardContentRef]);

  return pointerInfo;

}

export default usePointerInfo;