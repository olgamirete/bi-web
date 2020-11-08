import { useState, useCallback } from 'react';

const GRID_UNIT_WIDTH = 20;
const GRID_UNIT_HEIGHT = 20;

const MIN_WIDHT = GRID_UNIT_WIDTH * 2;
const MIN_HEIGHT = GRID_UNIT_HEIGHT * 2;
const DEFAULT_WIDTH = GRID_UNIT_WIDTH * 3 * 8;
const DEFAULT_HEIGHT = GRID_UNIT_HEIGHT * 3 * 5;
const DEFAULT_SIZE = { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };

function useCards(controlFlags) {

  const [cards, setCards] = useState({
    past: [],
    present: new Map(),
    future: []
  });
  // const [cardsPast, setCardsPast] = useState([]);
  // const [cardsFuture, setCardsFuture] = useState([]);

  const [nextCardIndex, setNextCardIndex] = useState(0);

  const moveCard = useCallback((cardId, newPos) => {
    const newPosControlled = {
      left: controlFlags.snapToGrid ? Math.round(newPos.left / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH : newPos.left,
      top: controlFlags.snapToGrid ? Math.round(newPos.top / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH : newPos.top
    }
    setCards(cards => {
      const prevCard = cards.present.get(cardId);
      let newCards = new Map(cards.present);
      newCards.set(cardId, {
        id: prevCard.id,
        pos: newPosControlled,
        size: prevCard.size,
        propsBeforeChange: prevCard.propsBeforeChange,
        selected: prevCard.selected,
        flags: prevCard.flags
      });
      return {
        past: cards.past.concat([cards.present]),
        present: newCards,
        future: []
      };
    });
  }, [controlFlags.snapToGrid]);

  const translateSelectedCards = useCallback((translation) => {
    setCards(cards => {
      let newCards = new Map(cards.present);
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
      return {
        past: cards.past, // we do not update the past until we fix the values of propsBeforeChange
        present: newCards,
        future: cards.future // we do not update the future until we fix the values of propsBeforeChange
      };
    });
  }, [controlFlags.snapToGrid]);

  const resizeCard = useCallback((cardId, mouseTranslation, allowResize, anchor) => {
    setCards(cards => {
      const prevCard = cards.present.get(cardId);
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

      let newCards = new Map(cards.present);
      newCards.set(cardId, {
        id: prevCard.id,
        pos: nextPosControlled,
        size: nextSizeControlled,
        propsBeforeChange: prevCard.propsBeforeChange,
        selected: prevCard.selected,
        flags: prevCard.flags
      });
      return {
        past: cards.past, // we do not update the past until we fix the values of propsBeforeChange
        present: newCards,
        future: cards.future // we do not update the future until we fix the values of propsBeforeChange
      };
    });
  }, [controlFlags.snapToGrid]);

  const toggleCardSelection = useCallback((cardId) => {
    setCards(cards => {
      const prevCard = cards.present.get(cardId);
      let newCards = new Map(cards.present);
      newCards.set(cardId, {
        id: prevCard.id,
        pos: prevCard.pos,
        size: prevCard.size,
        propsBeforeChange: prevCard.propsBeforeChange,
        selected: !prevCard.selected,
        flags: prevCard.flags
      });
      return {
        past: cards.past, // no need to update the past when selecting a card
        present: newCards,
        future: cards.future // no need to update the future when selecting a card
      };
    });
  }, []);

  const addNewCard = useCallback((startingPos, startingSize) => {
    if (startingSize === undefined) {
      startingSize = DEFAULT_SIZE;
    }
    setCards(cards => {
      let newCards = new Map(cards.present);
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
      return {
        past: cards.past.concat([cards.present]),
        present: newCards,
        future: []
      };
    });
    setNextCardIndex((prevState) => prevState + 1);
  }, [nextCardIndex]);

  const deleteCard = useCallback((cardId) => {
    setCards(cards => {
      let newCards = new Map(cards.present);
      newCards.delete(cardId);
      return {
        past: cards.past.concat([cards.present]),
        present: newCards,
        future: []
      };
    });
  }, []);

  const deleteSelectedCards = useCallback(() => {
    setCards(cards => {
      let flagDeletedSomething = false;
      let newCards = new Map(cards.present);
      newCards.forEach(card => {
        if (card.selected === true) {
          newCards.delete(card.id);
          flagDeletedSomething = true;
        }
      });
      return {
        past: flagDeletedSomething ? cards.past.concat([cards.present]) : cards.past,
        present: flagDeletedSomething ? newCards : cards.present,
        future: flagDeletedSomething ? [] : cards.future
      };
    });
  }, []);

  const __updatePropsBeforeChange = useCallback(() => {
    setCards(cards => {
      let newCards = new Map(cards.present);
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
      return {
        past: cards.past.concat([cards.present]),
        present: newCards,
        future: []
      };
    });
  }, []);

  const clearSelection = useCallback(() => {
    setCards(cards => {
      let newCards = new Map(cards.present);
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
      return {
        past: cards.past, // no need to update the past when clearing the selection
        present: newCards,
        future: cards.future // no need to update the future when clearing the selection
      };
    });
  }, []);

  const isCardSelected = useCallback((cardId) => {
    if (cards.present.has(cardId) === true) {
      return cards.present.get(cardId).selected;
    } else {
      return Error("cardId does not exist.");
    }
  }, [cards.present]);

  const isCardInsideSelectionRect = useCallback((cardPos, cardSize, rectProps) => {
    const rectPos = {
      left: rectProps.pos.left,
      top: rectProps.pos.top
    }
    const rectSize = {
      width: Math.max(rectProps.size.width, 0),
      height: Math.max(rectProps.size.height, 0)
    }
    const insideX = (cardPos.left >= rectPos.left + rectProps.borderWidth) && (cardPos.left + cardSize.width <= rectPos.left + rectProps.borderWidth + rectSize.width - 2 * rectProps.borderWidth);
    const insideY = (cardPos.top >= rectPos.top + rectProps.borderWidth) && (cardPos.top + cardSize.height <= rectPos.top + rectProps.borderWidth + rectSize.height - 2 * rectProps.borderWidth);
    return insideX && insideY;
  }, []);

  const selectWithRectangle = useCallback((rectangleProps, flagExpandCurrentSelection) => {
    setCards(cards => {
      let newCards = new Map(cards.present);
      newCards.forEach(card => {
        const flagSelect = isCardInsideSelectionRect(
          card.pos,
          card.size,
          rectangleProps
        );
        updateCardInfo(newCards, card.id, {
          selected: flagExpandCurrentSelection ? (flagSelect || card.selected) : flagSelect
        });
      });
      return {
        past: cards.past, // no need to update the past when selecting cards
        present: newCards,
        future: cards.future // no need to update the future when selecting cards
      };
    });
  }, [isCardInsideSelectionRect, updateCardInfo]);

  const undo = useCallback(() => {
    setCards(cards => ({
      past: cards.past.length > 0 ? cards.past.slice(0, cards.past.length - 1) : cards.past,
      present: cards.past.length > 0 ? cards.past[cards.past.length - 1] : cards.present,
      future: cards.past.length > 0 ? cards.future.concat([cards.present]) : cards.future
    }));
  }, []);

  const redo = useCallback(() => {
    setCards(cards => ({
      past: cards.future.length > 0 ? cards.past.concat([cards.present]) : cards.past,
      present: cards.future.length > 0 ? cards.future[cards.future.length - 1] : cards.present,
      future: cards.future.length > 0 ? cards.future.slice(0, cards.future.length - 1) : cards.future
    }));
  }, []);

  const cardFlags = {
    canUndo: cards.past.length > 0,
    canRedo: cards.future.length > 0
  }

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
    selectWithRectangle: selectWithRectangle,
    undo: undo,
    redo: redo
  }

  return [cards.present, cardFlags, cardMethods];
}
export default useCards;