import { useEffect, useState, useLayoutEffect, useCallback } from 'react';

const GRID_UNIT_WIDTH = 20;
const GRID_UNIT_HEIGHT = 20;

const MIN_WIDHT = GRID_UNIT_WIDTH * 2;
const MIN_HEIGHT = GRID_UNIT_HEIGHT * 2;
const DEFAULT_WIDTH = GRID_UNIT_WIDTH * 3 * 8;
const DEFAULT_HEIGHT = GRID_UNIT_HEIGHT * 3 * 5;


// function useCardSizeAndPosition(cardContainerRef, pointerInfo, startingPos, startingSize) {
function useCardSizeAndPosition(cardContainerRef, startingPos, flagSnapToGrid) {

  const startingSize = {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  }

  const [size, setSize] = useState(startingSize);
  const [sizeBeforeResizing, setSizeBeforeResizing] = useState(startingSize);
  const [allowResize, setAllowResize] = useState({ width: false, height: false });

  const [pos, setPos] = useState(startingPos);
  const [posBeforeMoving, setPosBeforeMoving] = useState(startingPos);
  const [allowMove, setAllowMove] = useState(false);

  const [anchor, setAnchor] = useState({ right: false, bottom: false });

  // Pointer info.
  const [touchIndex, setTouchIndex] = useState(0);
  const [lastClickedPos, setLastClickedPos] = useState({ pageX: 0, pageY: 0 });

  // In charge of assigning the event handler for pointer down events in the cards
  useEffect(() => {
    const cardContainer = cardContainerRef.current;
    // alert("start");
    const handlePointerDownContainer = (e, eType) => {
      e.preventDefault();
      // alert("poindown!");
      switch (eType) {
        case "mouse":
          // setPointerIndex(e.pointerId);
          setLastClickedPos({ pageX: e.pageX, pageY: e.pageY });
          break;
        case "touch":
          const touch = e.changedTouches[0];
          setTouchIndex(touch.identifier);
          setLastClickedPos({ pageX: touch.pageX, pageY: touch.pageY });
          break;
        default:
          return Error;
      }
      setPosBeforeMoving(pos);

      // setGlobalCursorClass("crosshair");

      const classes = Array.from(e.target.classList);
      const isBorder = classes.includes("border");
      const isCorner = classes.includes("corner");

      if (isBorder || isCorner) {

        const isHor = classes.includes("horizontal");
        // const isVer = classes.includes("vertical");

        const leftClasses = ["left", "nw", "sw"];
        const isLeft = classes.some((el) => leftClasses.includes(el));

        const topClasses = ["top", "nw", "ne"];
        const isTop = classes.some((el) => topClasses.includes(el));
        setAnchor({
          right: isLeft,
          bottom: isTop
        });
        setSizeBeforeResizing(size);

        setAllowResize({
          width: !isHor || isCorner,
          height: isHor || isCorner
        });
      } else {
        if (cardContainer.contains(e.target)) {
          setAllowMove(true);
        }
      }
    }

    const handleMouseDownContainer = (e) => { handlePointerDownContainer(e, "mouse") };
    const handleTouchStartContainer = (e) => { handlePointerDownContainer(e, "touch") };


    cardContainer.addEventListener("mousedown", handleMouseDownContainer, false);
    cardContainer.addEventListener("touchstart", handleTouchStartContainer, false);
    return () => {
      cardContainer.removeEventListener("mousedown", handleMouseDownContainer, false);
      cardContainer.removeEventListener("touchstart", handleTouchStartContainer, false);
    }

  }, [pos, size, cardContainerRef]);


  const getPointerInfo = useCallback((e, eType) => {
    let pointerPos = null;
    switch (eType) {
      case "mouse":
        pointerPos = {
          pageX: e.pageX,
          pageY: e.pageY
        }
        break;
      case "touch":
        const touch = e.changedTouches[0];
        pointerPos = {
          pageX: touch.pageX,
          pageY: touch.pageY
        }
        break;
      default:
        return Error;
    }
    return pointerPos;
  }, []);


  useLayoutEffect(() => {
    // The following is in charge of moving and resizing the cards.
    // useLayoutEffect is used instead of useEffect because the former works
    // synchronically, avoiding glitches on the screen when moving stuff around.
    const cardContainer = cardContainerRef.current;
    const handlePointerMoveContainer = (e, eType) => {

      let newX = null;
      let newY = null;
      let newWidth = null;
      let newHeight = null;
      const pointerPos = getPointerInfo(e, eType);
      console.log(JSON.stringify(pointerPos) + " - " + e.target.innerHTML);
      const movementX = pointerPos.pageX - lastClickedPos.pageX;
      const movementY = pointerPos.pageY - lastClickedPos.pageY;

      if (allowMove) {
        newX = Math.max(posBeforeMoving.left + movementX, 0);
        newY = Math.max(posBeforeMoving.top + movementY, 0);

        const flagShiftPressed = false;
        if (flagShiftPressed === true) {
          const priorizeX = Math.abs(movementX) > Math.abs(movementY);
          const priorizeY = !priorizeX;
          newX = priorizeX ? newX : posBeforeMoving.left;
          newY = priorizeY ? newY : posBeforeMoving.top;
        }
      } else {
        if (allowResize.width || allowResize.height) {
          newWidth = Math.max(sizeBeforeResizing.width + movementX * (anchor.right ? -1 : 1), MIN_WIDHT);
          newHeight = Math.max(sizeBeforeResizing.height + movementY * (anchor.bottom ? -1 : 1), MIN_HEIGHT);
          if (anchor.right || anchor.bottom) {
            newX = (allowResize.width && anchor.right) ? Math.min(Math.max(posBeforeMoving.left + movementX, 0), posBeforeMoving.left + sizeBeforeResizing.width) : posBeforeMoving.left;
            newY = (allowResize.height && anchor.bottom) ? Math.min(Math.max(posBeforeMoving.top + movementY, 0), posBeforeMoving.top + sizeBeforeResizing.height) : posBeforeMoving.top;
          }
        }
      }
      if (newX !== null && newY !== null) {
        if (flagSnapToGrid) {
          newX = Math.round(newX / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH;
          newY = Math.round(newY / GRID_UNIT_HEIGHT, 0) * GRID_UNIT_HEIGHT;
        }
        setPos({
          left: newX,
          top: newY
        });
      }
      if (newWidth !== null && newHeight !== null) {
        if (flagSnapToGrid) {
          newWidth = Math.round(newWidth / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH;
          newHeight = Math.round(newHeight / GRID_UNIT_HEIGHT, 0) * GRID_UNIT_HEIGHT;
        }
        setSize({
          width: allowResize.width ? newWidth : sizeBeforeResizing.width,
          height: allowResize.height ? newHeight : sizeBeforeResizing.height
        });
      }
    }

    const handleMouseMoveContainer = (e) => { handlePointerMoveContainer(e, "mouse"); }
    const handleTouchMoveContainer = (e) => { handlePointerMoveContainer(e, "touch"); }

    cardContainer.addEventListener("pointermove", handleMouseMoveContainer, true);
    cardContainer.addEventListener("touchmove", handleTouchMoveContainer, false);
    return () => {
      cardContainer.removeEventListener("pointermove", handleMouseMoveContainer, true);
      cardContainer.removeEventListener("touchmove", handleTouchMoveContainer, false);
    }

  }, [
    cardContainerRef,
    posBeforeMoving,
    sizeBeforeResizing,
    allowMove,
    allowResize,
    anchor,
    flagSnapToGrid,
    lastClickedPos,
    getPointerInfo
  ]);

  // // To do on global pointer out event.
  // useEffect(() => {
  //   // This is done in a global way because we want to catch all pointerUp
  //   // events, regardless of which element was below the pointer when the event
  //   // was triggered.
  //   // alert("pointer down: " + isControllerDown);
  //   // alert(pointerInfo.pointerIndexReleased + "." + pointerIndex);
  //   if (pointerInfo.pointerIndexReleased === pointerIndex) {
  //     // Disallow all
  //     setAllowResize({ width: false, height: false });
  //     setAllowMove(false);
  //     // removeGlobalCursorClass();
  //   }
  // }, [
  //   pointerInfo.pointerUpCounter, // This is needed in order to detect all pointer up events.
  //   pointerInfo.pointerIndexReleased,
  //   pointerIndex]);

  // To do on global pointer out event.
  useLayoutEffect(() => {
    // This is done in a global way because we want to catch all pointerUp
    // events, regardless of which element was below the pointer when the event
    // was triggered.
    // alert("pointer down: " + isControllerDown);
    // alert(pointerInfo.pointerIndexReleased + "." + pointerIndex);
    // alert("reset pointer up handler");
    const handleMouseUpGlobal = (e) => {
      // alert("mouse up!");
      setAllowResize({ width: false, height: false });
      setAllowMove(false);
    }
    const handleTouchEndGlobal = (e) => {
      // alert("touch end!");
      const touch = e.changedTouches[0];
      if (touch.identifier === touchIndex) {
        // Disallow all
        setAllowResize({ width: false, height: false });
        setAllowMove(false);
        // removeGlobalCursorClass();
      }

    }

    window.addEventListener("mouseup", handleMouseUpGlobal, false);
    window.addEventListener("touchend", handleTouchEndGlobal, false);
    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal, false);
      window.removeEventListener("touchend", handleTouchEndGlobal, false);
    }

  }, [touchIndex]);

  let debugInfo = "";
  debugInfo += "allow move: " + allowMove;
  debugInfo += "allow res.: " + JSON.stringify(allowResize);
  debugInfo += "anchor: " + anchor;
  debugInfo += "pos. b. mov.: " + posBeforeMoving;
  debugInfo += "size b. res.: " + sizeBeforeResizing;

  return [size, pos, debugInfo];

}

export default useCardSizeAndPosition;