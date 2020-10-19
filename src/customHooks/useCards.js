import { useState, useCallback } from 'react';

const GRID_UNIT_WIDTH = 20;
const GRID_UNIT_HEIGHT = 20;

const MIN_WIDHT = GRID_UNIT_WIDTH * 2;
const MIN_HEIGHT = GRID_UNIT_HEIGHT * 2;
const DEFAULT_WIDTH = GRID_UNIT_WIDTH * 3 * 2;
const DEFAULT_HEIGHT = GRID_UNIT_HEIGHT * 3 * 3;
const DEFAULT_SIZE = { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };

function useCards(controlFlags) {

  const [cards, setCards] = useState(new Map());
  // const [cardsPast, setCardsPast] = useState([]);
  // const [cardsFuture, setCardsFuture] = useState([]);

  const [nextCardIndex, setNextCardIndex] = useState(0);

  const moveCard = useCallback((cardId, newPos) => {
    const newPosControlled = {
      left: controlFlags.snapToGrid ? Math.round(newPos.left / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH : newPos.left,
      top: controlFlags.snapToGrid ? Math.round(newPos.top / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH : newPos.top
    }
    setCards(cards => {
      const prevCard = cards.get(cardId);
      let newCards = new Map(cards);
      newCards.set(cardId, {
        id: prevCard.id,
        pos: newPosControlled,
        size: prevCard.size,
        propsBeforeChange: prevCard.propsBeforeChange,
        selected: prevCard.selected,
        flags: prevCard.flags
      });
      return newCards;
    });
  }, [controlFlags.snapToGrid]);

  const translateSelectedCards = useCallback((translation) => {
    setCards(cards => {
      let newCards = new Map(cards);
      newCards.forEach(card => {
        if (card.selected === true) {
          const posBeforeMove = card.propsBeforeChange.pos;
          const newPos = {
            left: posBeforeMove.left + translation.x,
            top: posBeforeMove.top + translation.y
          };
          const newPosControlled = {
            left: controlFlags.snapToGrid ? Math.round(newPos.left / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH : newPos.left,
            top: controlFlags.snapToGrid ? Math.round(newPos.top / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH : newPos.top
          }
          newCards.set(card.id, {
            id: card.id,
            pos: newPosControlled,
            size: card.size,
            propsBeforeChange: card.propsBeforeChange,
            selected: card.selected,
            flags: card.flags
          });
        }
      });
      return newCards;
    });
  }, [controlFlags.snapToGrid]);

  const resizeCard = useCallback((cardId, mouseTranslation, allowResize, anchor) => {
    setCards(cards => {
      const prevCard = cards.get(cardId);
      const prevSize = prevCard.propsBeforeChange.size;
      const prevPos = prevCard.propsBeforeChange.pos;

      const nextPos = {
        left: anchor.right ? Math.min(prevPos.left + mouseTranslation.x, prevPos.left + prevSize.width - MIN_WIDHT) : prevPos.left,
        top: anchor.bottom ? Math.min(prevPos.top + mouseTranslation.y, prevPos.top + prevSize.height - MIN_HEIGHT) : prevPos.top
      }
      const nextPosControlled = {
        left: controlFlags.snapToGrid && anchor.right && allowResize.width ? Math.round(nextPos.left / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH : nextPos.left,
        top: controlFlags.snapToGrid && anchor.bottom && allowResize.height ? Math.round(nextPos.top / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH : nextPos.top
      }

      const nextSize = {
        width: Math.max(prevSize.width + mouseTranslation.x * (anchor.right ? -1 : 1), MIN_WIDHT),
        height: Math.max(prevSize.height + mouseTranslation.y * (anchor.bottom ? -1 : 1), MIN_HEIGHT)
      }
      let nextWidthControlled = nextSize.width;
      let nextHeightControlled = nextSize.height;
      if (controlFlags.snapToGrid) {
        if (allowResize.width) {
          nextWidthControlled = anchor.right ? prevSize.width - (nextPosControlled.left - prevPos.left) : Math.round((prevPos.left + nextSize.width) / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH - prevPos.left;
        }
        if (allowResize.height) {
          nextHeightControlled = anchor.bottom ? prevSize.height - (nextPosControlled.top - prevPos.top) : Math.round((prevPos.top + nextSize.height) / GRID_UNIT_HEIGHT, 0) * GRID_UNIT_HEIGHT - prevPos.top;
        }
      }
      // const nextSizeControlled = {
      //   width: controlFlags.snapToGrid && (anchor.right === false) && allowResize.width ? Math.round(nextSize.width / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH : nextSize.width,
      //   height: controlFlags.snapToGrid && (anchor.bottom === false) && allowResize.height ? Math.round(nextSize.height / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH : nextSize.height
      // }
      const nextSizeControlled = {
        width: nextWidthControlled,
        height: nextHeightControlled
      }


      let newCards = new Map(cards);
      newCards.set(cardId, {
        id: prevCard.id,
        pos: nextPosControlled,
        size: nextSizeControlled,
        propsBeforeChange: prevCard.propsBeforeChange,
        selected: prevCard.selected,
        flags: prevCard.flags
      });
      return newCards;
    });
  }, [controlFlags.snapToGrid]);

  const toggleCardSelection = useCallback((cardId) => {
    setCards(cards => {
      const prevCard = cards.get(cardId);
      let newCards = new Map(cards);
      newCards.set(cardId, {
        id: prevCard.id,
        pos: prevCard.pos,
        size: prevCard.size,
        propsBeforeChange: prevCard.propsBeforeChange,
        selected: !prevCard.selected,
        flags: prevCard.flags
      });
      return newCards;
    });
  }, []);

  const addNewCard = useCallback((startingPos, startingSize) => {
    if (startingSize === undefined) {
      startingSize = DEFAULT_SIZE;
    }
    setCards(cards => {
      let newCards = new Map(cards);
      const cardId = "card-" + nextCardIndex;
      newCards.set(cardId, {
        id: cardId,
        pos: startingPos,
        size: startingSize,
        propsBeforeChange: {
          pos: startingPos,
          size: startingSize
        },
        selected: false,
        flags: {
          allowResize: {
            width: false,
            height: false
          },
          allowMove: false
        }
      });
      return newCards;
    });
    setNextCardIndex((prevState) => prevState + 1);
  }, [nextCardIndex]);

  const deleteCard = useCallback((cardId) => {
    setCards(cards => {
      let newCards = new Map(cards);
      newCards.delete(cardId);
      return newCards;
    });
  }, []);

  const deleteSelectedCards = useCallback(() => {
    setCards(cards => {
      let newCards = new Map(cards);
      newCards.forEach(card => {
        if (card.selected === true) {
          newCards.delete(card.id);
        }
      });
      return newCards;
    });
  }, []);

  const __updatePropsBeforeChange = useCallback(() => {
    setCards(cards => {
      let newCards = new Map(cards);
      newCards.forEach(card => {
        newCards.set(card.id, {
          id: card.id,
          pos: card.pos,
          size: card.size,
          propsBeforeChange: {
            pos: card.pos,
            size: card.size
          },
          selected: card.selected,
          flags: card.flags
        });
      });
      return newCards;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setCards(cards => {
      let newCards = new Map(cards);
      newCards.forEach(card => {
        if (card.selected === true) {
          newCards.set(card.id, {
            id: card.id,
            pos: card.pos,
            size: card.size,
            propsBeforeChange: card.propsBeforeChange,
            selected: false,
            flags: card.flags
          });
        }
      });
      return newCards;
    });
  }, []);

  const isCardSelected = useCallback((cardId) => {
    if (cards.has(cardId) === true) {
      return cards.get(cardId).selected;
    } else {
      return Error("cardId does not exist.");
    }
  }, [cards]);

  const isCardInsideSelectionRect = useCallback((cardPos, cardSize, rectProps) => {
    const rectPos = rectProps.pos;
    const rectSize = rectProps.size;
    const insideX = (cardPos.left >= rectPos.left) && (cardPos.left + cardSize.width <= rectPos.left + rectSize.width);
    const insideY = (cardPos.top >= rectPos.top) && (cardPos.top + cardSize.height <= rectPos.top + rectSize.height);
    return insideX && insideY;
  }, []);

  const selectWithRectangle = useCallback((rectangleProps, flagExpandCurrentSelection) => {
    setCards(cards => {
      let newCards = new Map(cards);
      newCards.forEach(card => {
        const flagSelect = isCardInsideSelectionRect(
          card.pos,
          card.size,
          rectangleProps
        );
        newCards.set(card.id, {
          id: card.id,
          pos: card.pos,
          size: card.size,
          propsBeforeChange: card.propsBeforeChange,
          selected: flagExpandCurrentSelection ? (flagSelect || card.selected) : flagSelect,
          flags: card.flags
        });
      });
      return newCards;
    });
  }, [isCardInsideSelectionRect]);

  const cardMethods = {
    add: addNewCard,
    move: moveCard,
    translateSelected: translateSelectedCards,
    resize: resizeCard,
    __updatePropsBeforeChange: __updatePropsBeforeChange,
    isSelected: isCardSelected,
    toggleSelect: toggleCardSelection,
    clearSelection: clearSelection,
    delete: deleteCard,
    deleteSelected: deleteSelectedCards,
    selectWithRectangle: selectWithRectangle
  }

  return [cards, cardMethods];
}
export default useCards;