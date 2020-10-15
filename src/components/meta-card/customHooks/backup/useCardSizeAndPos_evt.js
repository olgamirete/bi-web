import { useEffect, useState, useLayoutEffect, useCallback } from 'react';

const GRID_UNIT_WIDTH = 20;
const GRID_UNIT_HEIGHT = 20;

const MIN_WIDHT = GRID_UNIT_WIDTH * 2;
const MIN_HEIGHT = GRID_UNIT_HEIGHT * 2;
// const DEFAULT_WIDTH = GRID_UNIT_WIDTH * 3 * 8;
// const DEFAULT_HEIGHT = GRID_UNIT_HEIGHT * 3 * 5;
const DEFAULT_WIDTH = GRID_UNIT_WIDTH * 3 * 2;
const DEFAULT_HEIGHT = GRID_UNIT_HEIGHT * 3 * 3;


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
  const [pointerIndex, setPointerIndex] = useState(0);
  const [lastClickedPos, setLastClickedPos] = useState({ pageX: 0, pageY: 0 });

  const getCurrentPointerIndex = useCallback((e) => {
    return e.changedTouches[e.changedTouches.length - 1].identifier;
    // return e.changedTouches[0].identifier;
  }, []);

  // In charge of assigning the event handler for pointer down events in the cards
  useEffect(() => {
    const cardContainer = cardContainerRef.current;
    // alert("start");
    const handlePointerDownContainer = (e) => {
      e.preventDefault();
      const currentPointerIndex = getCurrentPointerIndex(e);
      if (currentPointerIndex === pointerIndex) {
        const pointer = e.touches[currentPointerIndex];
        setPointerIndex(currentPointerIndex);
        setLastClickedPos({ pageX: pointer.pageX, pageY: pointer.pageY });
        setPosBeforeMoving(pos);

        // setGlobalCursorClass("crosshair");

        const classes = Array.from(pointer.target.classList);
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
          if (cardContainer.contains(pointer.target)) {
            setAllowMove(true);
          }
        }
      }
    }

    cardContainer.addEventListener("touchstart", handlePointerDownContainer, false);
    return () => {
      cardContainer.removeEventListener("touchstart", handlePointerDownContainer, false);
    }

  }, [pos, size, cardContainerRef, getCurrentPointerIndex, pointerIndex]);

  useLayoutEffect(() => {
    // The following is in charge of moving and resizing the cards.
    // useLayoutEffect is used instead of useEffect because the former works
    // synchronically, avoiding glitches on the screen when moving stuff around.
    const cardContainer = cardContainerRef.current;
    const handlePointerMoveContainer = (e) => {
      // alert(e.changedTouches[0].pageX);
      let newX = null;
      let newY = null;
      let newWidth = null;
      let newHeight = null;
      const currentPointerIndex = getCurrentPointerIndex(e);
      const pointer = e.touches[currentPointerIndex];
      const pointerPos = { pageX: pointer.pageX, pageY: pointer.pageY };
      // console.log(JSON.stringify(pointerPos) + " - " + e.target.innerHTML);
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

    cardContainer.addEventListener("touchmove", handlePointerMoveContainer, true);
    return () => {
      cardContainer.removeEventListener("touchmove", handlePointerMoveContainer, true);
    }

  }, [
    cardContainerRef, // ok
    posBeforeMoving, // ok
    sizeBeforeResizing, // ok
    allowMove, // ok
    allowResize, // ok
    anchor, // ok
    flagSnapToGrid, // ok
    lastClickedPos, // ok
    getCurrentPointerIndex // ok
  ]);

  // To do on global pointer out event.
  useLayoutEffect(() => {
    // This is done in a global way because we want to catch all pointerUp
    // events, regardless of which element was below the pointer when the event
    // was triggered.
    const handlePointerUpGlobal = (e) => {
      // alert("touch end!");
      const currentPointerIndex = getCurrentPointerIndex(e);
      // const pointer = e.touches[currentPointerIndex];
      if (currentPointerIndex === pointerIndex) {
        // Disallow all
        setAllowResize({ width: false, height: false });
        setAllowMove(false);
        // removeGlobalCursorClass();
      }

    }

    window.addEventListener("touchend", handlePointerUpGlobal, false);
    return () => {
      window.removeEventListener("touchend", handlePointerUpGlobal, false);
    }

  }, [pointerIndex, getCurrentPointerIndex]);

  let debugInfo = "";
  debugInfo += "allow move: " + allowMove;
  debugInfo += "allow res.: " + JSON.stringify(allowResize);
  debugInfo += "anchor: " + anchor;
  debugInfo += "pos. b. mov.: " + posBeforeMoving;
  debugInfo += "size b. res.: " + sizeBeforeResizing;

  return [size, pos, debugInfo];

}

export default useCardSizeAndPosition;