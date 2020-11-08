import { useEffect, useState, useCallback, useLayoutEffect } from 'react';

// const SELECTION_RECT_BORDER_WIDTH = 2;

function useDashboardEventHandlers(dashboardId, selRectBorderWidth, cardMethods, controlMethods, controlFlags) {

  const [allowResize, setAllowResize] = useState({ width: false, height: false });
  const [allowMove, setAllowMove] = useState(false);

  const [lastClickedPos, setLastClickedPos] = useState({ x: 0, y: 0 });
  const [anchor, setAnchor] = useState({ right: false, bottom: false });
  const [lastContainerClicked, setLastContainerClicked] = useState(null);
  const [flagOverrideHoverPointers, setFlagOverrideHoverPointers] = useState(false);
  const [lockCtrlKey, setLockCtrlKey] = useState(false);
  const [selectionRectangleProps, setSelectionRectangleProps] = useState({
    flagDraw: false,
    pos: { left: 0, top: 0 },
    size: { width: 0, height: 0 },
    borderWidth: selRectBorderWidth
  });
  const [flagPointerDown, setFlagPointerDown] = useState(false);
  // const [flagAllowRectangleSelect, setFlagAllowRectangleSelect] = useState(false);
  // const setFlagAllowRectangleSelect = useCallback((newFlag) => {
  //   controlMethods.setFlagAllowSelection(newFlag);
  // }, []);
  // const flagAllowRectangleSelect = controlFlags.allowSelection;
  // const [flagIsLongPress, setFlagIsLongPress] = useState(false);
  // const [flagWaitingLongPress, setFlagWaitingLongPress] = useState(false);
  // const [timerLongPress, setTimerLongPress] = useState(null);
  // const [dashboardScrollSize, setDashboardScrollSize] = useState({
  //   width: "100%",
  //   height: "100%"
  // })

  // const dashboard = useMemo(() => {
  //   return document.getElementById(dashboardId);
  // }, [dashboardId]);

  // Cursor handlers
  const setBorderCursorGlobalClass = useCallback((isBorder, isCorner, isHorizontal, anchor) => {
    let cursorClass = ""
    if (isBorder) {
      if (isHorizontal) {
        cursorClass = "ns-resize";
      } else {
        cursorClass = "ew-resize";
      }
    } else {
      if (isCorner) {// It is a corner
        const anchorsEncoded = [+anchor.right, +anchor.bottom].join("");
        const cornerCursorClassByAnchors = {
          "00": "se-resize",
          "01": "ne-resize",
          "10": "sw-resize",
          "11": "nw-resize"
        }
        cursorClass = cornerCursorClassByAnchors[anchorsEncoded];
      } else {
        cursorClass = "normal";
      }
    }
    const dashboard = document.getElementById(dashboardId);
    dashboard.style.setProperty("cursor", cursorClass);
  }, [dashboardId]);

  const clearBorderCursorGlobalClass = useCallback(() => {
    const dashboard = document.getElementById(dashboardId);
    dashboard.style.removeProperty("cursor");
  }, [dashboardId]);

  const containedInCardContainer = useCallback((element) => {
    let a = element;
    while (a) {
      if (Array.from(a.classList).includes("resizeable-card-container")) {
        return a;
      } else {
        a = a.parentElement;
      }
    }
    return null;
  }, []);
  // ---------------------------------------------------------------------------

  // Pointer down
  useEffect(() => {
    const dashboard = document.getElementById(dashboardId);
    const handlePointerDown = (e) => {
      e.preventDefault();
      setFlagPointerDown(true);
      setLastClickedPos({ x: e.pageX, y: e.pageY });

      // Did the user click on a card? If so, the function returns the card
      // container element. If not, "false" is returned instead.
      const cardContainer = containedInCardContainer(e.target);

      if (cardContainer !== null) {

        cardMethods.__updatePropsBeforeChange();
        setLastContainerClicked(cardContainer);

        const cardId = cardContainer.id;

        if (e.shiftKey === true) {
          cardMethods.toggleSelect(cardId);
        } else {

          // If not currently selected, clear previous selection and select the
          // clicked card.
          if (cardMethods.isSelected(cardId) === false) {
            cardMethods.clearSelection();
            cardMethods.toggleSelect(cardId);
          }

          const classesTargetElement = Array.from(e.target.classList);
          const isBorder = classesTargetElement.includes("border");
          const isCorner = classesTargetElement.includes("corner");

          if (isBorder || isCorner) {

            const isHor = classesTargetElement.includes("horizontal");
            // const isVer = classesTargetElement.includes("vertical");

            const leftClasses = ["left", "nw", "sw"];
            const isLeft = classesTargetElement.some((el) => leftClasses.includes(el));

            const topClasses = ["top", "nw", "ne"];
            const isTop = classesTargetElement.some((el) => topClasses.includes(el));

            const newAnchor = {
              right: isLeft,
              bottom: isTop
            }
            setAnchor(newAnchor);

            setAllowResize({
              width: !isHor || isCorner,
              height: isHor || isCorner
            });

            setBorderCursorGlobalClass(isBorder, isCorner, isHor, newAnchor);
            setFlagOverrideHoverPointers(true);

          } else {
            setAllowMove(true);
          }
        }
      } else {
        if (e.ctrlKey === true) {
          const dashboardRect = dashboard.getBoundingClientRect();
          cardMethods.add({
            pos: {
              left: e.pageX - dashboardRect.left + dashboard.scrollLeft,
              top: e.pageY - dashboardRect.top + dashboard.scrollTop
            }
          });
        } else {
          // If no card was clicked, and if the ctrl and shift keys were not
          // pressed, we can clear the selection.
          if (!e.shiftKey) {
            cardMethods.clearSelection();
          }

          // if (e.pointerType === "touch") {
          //   // e.preventDefault();
          //   setFlagWaitingLongPress(true);
          //   const timer = window.setTimeout(() => {
          //     controlMethods.setFlagAllowSelection(true);
          //   }, 400);
          //   setTimerLongPress(timer);
          // } else {
          //   controlMethods.setFlagAllowSelection(true);
          // }
          if (e.pointerType !== "touch") {
            controlMethods.setFlagAllowSelection(true);
          }
        }
      }
    }
    dashboard.addEventListener("pointerdown", handlePointerDown, false);
    return () => dashboard.removeEventListener("pointerdown", handlePointerDown, false);
  }, [
    cardMethods, // Ok?
    dashboardId, // Ok
    setBorderCursorGlobalClass, // Ok?
    containedInCardContainer, // Ok
    controlMethods // Ok?
  ]);

  // Pointer move
  useLayoutEffect(() => {

    const dashboard = document.getElementById(dashboardId);

    const handlePointerMove = (e) => {
      e.preventDefault();
      const translation = {
        x: e.pageX - lastClickedPos.x,
        y: e.pageY - lastClickedPos.y
      }
      // const pointerTravelledDistance = Math.sqrt(translation.x * translation.x + translation.y * translation.y);

      if (allowMove) {

        if (e.shiftKey === false) {
          cardMethods.translateSelected(translation);
        } else {
          const priorizeX = Math.abs(translation.x) > Math.abs(translation.y);
          const priorizeY = !priorizeX;

          const restrictedTranslation = {
            x: priorizeX ? translation.x : 0,
            y: priorizeY ? translation.y : 0
          }
          cardMethods.translateSelected(restrictedTranslation);
        }
      } else {
        if (allowResize.width || allowResize.height) {

          const resizeTranslation = {
            x: allowResize.width ? translation.x : 0,
            y: allowResize.height ? translation.y : 0
          };
          cardMethods.resize(lastContainerClicked.id, resizeTranslation, allowResize, anchor);
        } else {
          if (flagPointerDown) {
            if (controlFlags.allowSelection) {
              const dashboardRect = dashboard.getBoundingClientRect();
              const newSelectionRectangleProps = {
                flagDraw: true,
                pos: {
                  left: Math.round(Math.min(lastClickedPos.x, e.pageX) - dashboardRect.left + dashboard.scrollLeft, 0),
                  top: Math.round(Math.min(lastClickedPos.y, e.pageY) - dashboardRect.top + dashboard.scrollTop, 0)
                },
                size: {
                  width: Math.round(Math.abs(e.pageX - lastClickedPos.x), 0),
                  height: Math.round(Math.abs(e.pageY - lastClickedPos.y), 0)
                },
                borderWidth: selRectBorderWidth
              };
              // console.log(JSON.stringify(e.offsetX + "-" + e.offsetY));
              setSelectionRectangleProps(newSelectionRectangleProps);
              const flagExpandCurrentSelection = e.shiftKey;
              cardMethods.selectWithRectangle(
                newSelectionRectangleProps,
                flagExpandCurrentSelection);
            } //else {
            //   if (e.pointerType === "touch" && flagWaitingLongPress && pointerTravelledDistance > 0) {
            //     window.clearTimeout(timerLongPress);
            //     setTimerLongPress(null);
            //     setFlagWaitingLongPress(false);
            //   }
            // }
          }
        }
      }
      // if (allowMove || allowResize.width || allowResize.height) {
      //   // console.log("ran");
      //   setDashboardScrollSize({
      //     width: dashboard.scrollWidth,
      //     height: dashboard.scrollHeight
      //   });
      // }
    }
    dashboard.addEventListener("pointermove", handlePointerMove, false);
    return () => dashboard.removeEventListener("pointermove", handlePointerMove, false);
  }, [
    cardMethods, // ok?
    dashboardId, // ok
    allowMove, // ok
    allowResize, // ok
    anchor, // ok
    lastClickedPos, // ok
    lastContainerClicked, // ok
    flagPointerDown, // ok
    controlFlags.allowSelection, // ok
    selRectBorderWidth // ok?
    //flagWaitingLongPress, // ok
    //timerLongPress
  ]);

  // Pointer up
  useEffect(() => {
    const dashboard = document.getElementById(dashboardId);
    const handlePointerUp = (e) => {
      // e.preventDefault();
      // Disallow both movement and resizing.
      setFlagPointerDown(false);
      setAllowResize({ width: false, height: false });
      setAllowMove(false);
      clearBorderCursorGlobalClass();
      setFlagOverrideHoverPointers(false);
      setSelectionRectangleProps({
        flagDraw: false,
        pos: { left: 0, top: 0 },
        size: { width: 0, height: 0 },
        borderWidth: selRectBorderWidth
      });
      // setFlagAllowRectangleSelect(false);
      controlMethods.setFlagAllowSelection(false);
      // if (e.pointerType === "touch" && timerLongPress !== null) {
      //   window.clearTimeout(timerLongPress);
      // }
    }
    dashboard.addEventListener("pointerup", handlePointerUp, false);
    return () => dashboard.removeEventListener("pointerup", handlePointerUp, false);
  }, [
    cardMethods, // Ok?
    dashboardId, // Ok
    clearBorderCursorGlobalClass, // Ok?
    controlMethods, // Ok?
    selRectBorderWidth // ok?
    //timerLongPress, // Ok?
  ]);

  // Key down
  useEffect(() => {

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          cardMethods.clearSelection();
          break;
        case "Delete":
          cardMethods.deleteSelected();
          break;
        case "Control":
          if (!lockCtrlKey) {
            controlMethods.toggleSnapToGrid();
            setLockCtrlKey(true);
          }
          break;
        case "Backspace":
          cardMethods.deleteSelected();
          break;
        default:
          // alert(keyboardInfo.lastKeyPressed);
          break;
      }
    }

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "Escape":
          break;
        case "Delete":
          break;
        case "Control":
          controlMethods.toggleSnapToGrid();
          setLockCtrlKey(false);
          break;
        case "Backspace":
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown, false);
    window.addEventListener("keyup", handleKeyUp, false);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, false);
      window.removeEventListener("keyup", handleKeyUp, false);
    }

  }, [cardMethods, controlMethods, lockCtrlKey]);

  // const handlers = {
  //   pointerDown: handlePointerDown,
  //   pointerMove: handlePointerMove,
  //   pointerUp: handlePointerUp
  // }

  // const scrollSize = useMemo(() => {
  //   // const dashboard = document.getElementById(dashboardId);
  //   const scrollWidth = dashboard === null ? 0 : dashboard.scrollWidth;
  //   const scrollHeight = dashboard === null ? 0 : dashboard.scrollHeight;
  //   return {
  //     width: scrollWidth,
  //     height: scrollHeight
  //   }
  // }, [dashboard, dashboard.scrollWidth, dashboard.scrollHeight]);

  const debugInfo = JSON.stringify({
    allowResize: allowResize,
    allowMove: allowMove,
    lastClickedPos: lastClickedPos,
    anchor: anchor
  });

  const dashboardFlags = {
    overrideHoverPointers: flagOverrideHoverPointers,
    allowRectangleSelect: controlFlags.allowSelection,
    pointerDown: flagPointerDown
  }
  const dashboardProps = {
    debugInfo: debugInfo,
    selectionRectangleProps: selectionRectangleProps
    // scrollSize: dashboardScrollSize
  }

  return [dashboardFlags, dashboardProps];
}

export default useDashboardEventHandlers;