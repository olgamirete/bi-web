import { useEffect, useLayoutEffect, useState } from 'react';

const GRID_UNIT_WIDTH = 20;
const GRID_UNIT_HEIGHT = 20;

const MIN_WIDHT = GRID_UNIT_WIDTH * 2;
const MIN_HEIGHT = GRID_UNIT_HEIGHT * 2;
const DEFAULT_WIDTH = GRID_UNIT_WIDTH * 3 * 8;
const DEFAULT_HEIGHT = GRID_UNIT_HEIGHT * 3 * 5;


// function useCardSizeAndPosition(cardContainerRef, pointerInfo, startingPos, startingSize) {
function useCardSizeAndPosition(cardContainerRef, pointerInfo, startingPos, flagSnapToGrid) {

  const startingSize = {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  }

  const [size, setSize] = useState(startingSize);
  const [pos, setPos] = useState(startingPos);

  const [allowResize, setAllowResize] = useState({ width: false, height: false });
  const [allowMove, setAllowMove] = useState(false);
  const [posBeforeMoving, setPosBeforeMoving] = useState(startingPos);
  const [sizeBeforeResizing, setSizeBeforeResizing] = useState(startingSize);
  const [anchor, setAnchor] = useState({ right: false, bottom: false });
  const [controllerIndex, setControllerIndex] = useState(0);

  // const setGlobalCursorClass = (cursorClass) => {
  //   document.documentElement.style.cursor = cursorClass;
  // }
  // const removeGlobalCursorClass = () => {
  //   document.body.style.removeProperty("cursor");
  // }

  // The following is in charge of moving and resizing the cards.
  // useLayoutEffect is used instead of useEffect because the former works
  // synchronically, avoiding glitches on the screen when moving stuff around.
  useLayoutEffect(() => {

    if (pointerInfo.pointerIndexMoved === controllerIndex) {
      const pointerInfoMoved = pointerInfo.pointers[controllerIndex];
      console.log(pointerInfoMoved.currentPos.dashX + "." + pointerInfoMoved.currentPos.dashY);
      const movementX = pointerInfoMoved.currentPos.dashX - pointerInfoMoved.lastClickedPos.dashX;
      const movementY = pointerInfoMoved.currentPos.dashY - pointerInfoMoved.lastClickedPos.dashY;
      let newX = Math.max(posBeforeMoving.left + movementX, 0);
      let newY = Math.max(posBeforeMoving.top + movementY, 0);

      if (flagSnapToGrid) {
        newX = Math.round(newX / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH;
        newY = Math.round(newY / GRID_UNIT_HEIGHT, 0) * GRID_UNIT_HEIGHT;
      }

      if (allowMove) {
        // OR IF CARD IS SELECTED AND ANY OF THE GROUP IS ALLOWED TO MOVE
        if (pointerInfo.shiftPressed === false) {
          setPos({
            left: newX,
            top: newY
          });
        } else {
          const priorizeX = Math.abs(movementX) > Math.abs(movementY);
          const priorizeY = !priorizeX;
          setPos({
            left: priorizeX ? newX : posBeforeMoving.left,
            top: priorizeY ? newY : posBeforeMoving.top
          });
        }
      } else {
        if (allowResize.width || allowResize.height) {
          let newWidth = Math.max(sizeBeforeResizing.width + movementX * (anchor.right ? -1 : 1), MIN_WIDHT);
          let newHeight = Math.max(sizeBeforeResizing.height + movementY * (anchor.bottom ? -1 : 1), MIN_HEIGHT);

          if (flagSnapToGrid) {
            newWidth = Math.round(newWidth / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH;
            newHeight = Math.round(newHeight / GRID_UNIT_HEIGHT, 0) * GRID_UNIT_HEIGHT;
          }

          setSize({
            width: allowResize.width ? newWidth : sizeBeforeResizing.width,
            height: allowResize.height ? newHeight : sizeBeforeResizing.height
          });
          if (anchor.right || anchor.bottom) {
            // const newXforResize = ;
            // const newYforResize = ;
            setPos({
              left: (allowResize.width && anchor.right) ? Math.min(newX, posBeforeMoving.left + sizeBeforeResizing.width) : posBeforeMoving.left,
              top: (allowResize.height && anchor.bottom) ? Math.min(newY, posBeforeMoving.top + sizeBeforeResizing.height) : posBeforeMoving.top
            });
          }
        }
      }
    }
  }, [
    pointerInfo,
    controllerIndex,
    posBeforeMoving,
    sizeBeforeResizing,
    anchor,
    allowMove,
    allowResize
  ]);

  // In charge of assigning the event handler for pointer down events in the cards
  useEffect(() => {

    const cardContainer = cardContainerRef.current;

    const handlePointerDownContainer = (e) => {

      setControllerIndex(e.pointerId);

      setPosBeforeMoving({
        left: pos.left,
        top: pos.top
      });

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
        setSizeBeforeResizing({
          width: size.width,
          height: size.height
        });
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

    // To do on global pointer out event.
    const handlePointerUpGlobal = (e) => {
      // This is done in a global way because we want to catch all pointerUp
      // events, regardless of which element was below the pointer when the event
      // was triggered.
      // alert("Hola");
      if (e.pointerId === controllerIndex) {
        // disallowAll();
        setAllowResize({ width: false, height: false });
        setAllowMove(false);
        // removeGlobalCursorClass();
      }
    }

    cardContainer.addEventListener("pointerdown", handlePointerDownContainer);
    cardContainer.addEventListener("pointerup", handlePointerUpGlobal);
    window.addEventListener("pointerup", handlePointerUpGlobal);
    return () => {
      cardContainer.removeEventListener("pointerdown", handlePointerDownContainer);
      cardContainer.removeEventListener("pointerup", handlePointerUpGlobal);
      window.removeEventListener("pointerup", handlePointerUpGlobal);
    }

  }, [cardContainerRef, pos, size, controllerIndex]);

  // useEffect(() => {
  //   if (isPointerDown === false) {
  //     disallowAll();
  //     // setGlobalCursorClass("cursor-normal");
  //     // } else {

  //     // if (allowResize.width !== allowResize.height) {
  //     //   if (allowResize.width === true) {
  //     //     // setGlobalCursorClass("cursor-ew-resize");
  //     //   } else {
  //     //     // setGlobalCursorClass("cursor-ns-resize");
  //     //   }
  //     // } else {
  //     //   if (allowResize.width === true) {
  //     //     const anchorsEncoded = [+anchor.right, +anchor.bottom].join("");
  //     //     const cornerCursorClassByAnchors = {
  //     //       "00": "cursor-se-resize",
  //     //       "01": "cursor-ne-resize",
  //     //       "10": "cursor-sw-resize",
  //     //       "11": "cursor-nw-resize"
  //     //     }
  //     //     // setGlobalCursorClass(cornerCursorClassByAnchors[anchorsEncoded]);
  //     //   } else {
  //     //     // Do nothing.
  //     //   }
  //     // }

  //   }

  // }, [isPointerDown]);

  let debugInfo = "";
  debugInfo += "allow move: " + allowMove;
  debugInfo += "allow res.: " + JSON.stringify(allowResize);
  debugInfo += "anchor: " + anchor;
  debugInfo += "pos. b. mov.: " + posBeforeMoving;
  debugInfo += "size b. res.: " + sizeBeforeResizing;

  return [size, pos, debugInfo];

}

export default useCardSizeAndPosition;