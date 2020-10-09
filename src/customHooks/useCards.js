import { useState, useEffect, useRef } from 'react';

function useCards(pointerInfo, dashboardContentRef) {

  const [blockCreationOfNewEl, setBlockCreationOfNewEl] = useState(false);
  const [cards, setCards] = useState([]);

  const cardRef = useRef(null);

  const addNewCard = (startingPos) => {
    setCards(cards => cards.concat({
      startingPos: startingPos,
      selected: false,
      ref: cardRef
    }));
  }


  useEffect(() => {
    const dashboardContent = dashboardContentRef.current;
    const singlePointerInfo = pointerInfo.pointers[pointerInfo.pointerIndexPressed];
      if (dashboardContent.contains(singlePointerInfo.targetElementOnStart) === true) {
        if (singlePointerInfo.ctrlPressedOnStart === true) {
          let allowNewCard = true;
          allowNewCard = allowNewCard && singlePointerInfo.pointerDown === true;
          allowNewCard = allowNewCard && blockCreationOfNewEl === false;
          if (allowNewCard) {
            // Add card at pointer position
            addNewCard({
              left: singlePointerInfo.lastClickedPos.dashX,
              top: singlePointerInfo.lastClickedPos.dashY
            });
            setBlockCreationOfNewEl(true);
          } else {
            if (singlePointerInfo.pointerDown === false) {
              setBlockCreationOfNewEl(false);
            }
          }
        } else {
          if (singlePointerInfo.shiftPressedOnStart === true) {

          } else {
            // if (pointerInfo.targetElementOnStart === appRef.current) {
            //   // clearSelection();
            //   console.log("app background clicked");
            // }
          }
        }
      }
    // }

  }, [pointerInfo, blockCreationOfNewEl, cards, dashboardContentRef]);

  return [cards, addNewCard];
}
export default useCards;