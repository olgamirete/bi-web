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

  const [nextCardIndex, setNextCardIndex] = useState(0);

  const newCardTemplate = useCallback((cardId, nonDefaultValues) => {
    return {
      id: cardId,
      pos: nonDefaultValues.pos === undefined ? { x: 0, y: 0 } : nonDefaultValues.pos,
      size: nonDefaultValues.size === undefined ? DEFAULT_SIZE : nonDefaultValues.size,
      propsBeforeChange: {
        pos: nonDefaultValues.pos === undefined ? { x: 0, y: 0 } : nonDefaultValues.pos,
        size: nonDefaultValues.size === undefined ? DEFAULT_SIZE : nonDefaultValues.size
      },
      selected: false,
      flags: {
        allowResize: {
          width: false,
          height: false
        },
        allowMove: false
      },
      type: nonDefaultValues.type === undefined ? "empty" : nonDefaultValues.type,
      contentOptions: {
        showLegend: false,
        fields: {
          categories: [],
          valuesX: [],
          valuesY: []
        }
      }
    }
  }, []);

  const updateCardInfo = useCallback((cards, cardId, propsToChange) => {
    const prevCard = cards.get(cardId);
    let newProps = {};
    for (const key in prevCard) {
      if (propsToChange.hasOwnProperty(key) && key !== "id" ) {
        newProps[key] = propsToChange[key];
      } else {
        newProps[key] = prevCard[key];
      }
    }
    cards.set(cardId, newProps);
  }, []);

  const updateContentOptions = useCallback((cards, cardId, optionsToChange) => {
    const prevCard = cards.get(cardId);
    let newOptions = {};
    for (const key in prevCard.contentOptions) {
      if (optionsToChange.hasOwnProperty(key)) {
        newOptions[key] = optionsToChange[key];
      } else {
        newOptions[key] = prevCard.contentOptions[key];
      }
    }
    updateCardInfo(cards, cardId, {contentOptions: newOptions});
  }, [updateCardInfo]);

  const addNewCard = useCallback((startingProps) => {
    setCards(cards => {
      let newCards = new Map(cards.present);
      const cardId = "card-" + nextCardIndex;
      const newCardProps = newCardTemplate(cardId, startingProps);
      newCards.set(cardId, newCardProps);
      return {
        past: cards.past.concat([cards.present]),
        present: newCards,
        future: []
      };
    });
    setNextCardIndex((prevState) => prevState + 1);
  }, [nextCardIndex, newCardTemplate]);

  const moveCard = useCallback((cardId, newPos) => {
    const newPosControlled = {
      left: controlFlags.snapToGrid ? Math.round(newPos.left / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH : newPos.left,
      top: controlFlags.snapToGrid ? Math.round(newPos.top / GRID_UNIT_WIDTH, 0) * GRID_UNIT_WIDTH : newPos.top
    }
    setCards(cards => {
      let newCards = new Map(cards.present);
      updateCardInfo(newCards, cardId, { pos: newPosControlled });
      return {
        past: cards.past.concat([cards.present]),
        present: newCards,
        future: []
      };
    });
  }, [controlFlags.snapToGrid, updateCardInfo]);

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
          updateCardInfo(newCards, card.id, { pos: newPosControlled });
        }
      });
      return {
        past: cards.past, // we do not update the past until we fix the values of propsBeforeChange
        present: newCards,
        future: cards.future // we do not update the future until we fix the values of propsBeforeChange
      };
    });
  }, [controlFlags.snapToGrid, updateCardInfo]);

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
      const nextSizeControlled = {
        width: nextWidthControlled,
        height: nextHeightControlled
      }

      let newCards = new Map(cards.present);
      updateCardInfo(newCards, cardId, {
        pos: nextPosControlled,
        size: nextSizeControlled
      });
      return {
        past: cards.past, // we do not update the past until we fix the values of propsBeforeChange
        present: newCards,
        future: cards.future // we do not update the future until we fix the values of propsBeforeChange
      };
    });
  }, [controlFlags.snapToGrid, updateCardInfo]);

  const toggleCardSelection = useCallback((cardId) => {
    setCards(cards => {
      let newCards = new Map(cards.present);
      const prevCard = newCards.get(cardId);
      updateCardInfo(newCards, cardId, { selected: !prevCard.selected });
      return {
        past: cards.past, // no need to update the past when selecting a card
        present: newCards,
        future: cards.future // no need to update the future when selecting a card
      };
    });
  }, [updateCardInfo]);

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
        updateCardInfo(newCards, card.id, {
          propsBeforeChange: {
            pos: card.pos,
            size: card.size
          }
        });
      });
      return {
        past: cards.past.concat([cards.present]),
        present: newCards,
        future: []
      };
    });
  }, [updateCardInfo]);

  const setContentTypeOfSelectedCards = useCallback((type) => {
    setCards(cards => {
      let newCards = new Map(cards.present);
      newCards.forEach(card => {
        if (card.selected === true) {
          updateCardInfo(newCards, card.id, { type: type });
        }
      });
      return {
        past: cards.past.concat([cards.present]),
        present: newCards,
        future: []
      };
    });
  }, [updateCardInfo]);

  const toggleCardLegend = useCallback((cardId) => {
    setCards(cards => {
      let newCards = new Map(cards.present);
      const prevCard = newCards.get(cardId);
      updateContentOptions(newCards, cardId, {
        showLegend: !prevCard.contentOptions.showLegend
      });
      return {
        past: cards.past.concat([cards.present]),
        present: newCards,
        future: []
      };
    });
  }, [updateContentOptions]);

  const toggleSelectedCardsLegend = useCallback((cardId) => {
    
    setCards(cards => {
      let newCards = new Map(cards.present);
      newCards.forEach(card => {
        if (card.selected === true) {
          updateContentOptions(newCards, card.id, {
            showLegend: !card.contentOptions.showLegend
          });
        }
      });
      return {
        past: cards.past.concat([cards.present]),
        present: newCards,
        future: []
      };
    });
  }, [updateContentOptions]);

  const clearSelection = useCallback(() => {
    setCards(cards => {
      let newCards = new Map(cards.present);
      newCards.forEach(card => {
        if (card.selected === true) {
          updateCardInfo(newCards, card.id, { selected: false });
        }
      });
      return {
        past: cards.past, // no need to update the past when clearing the selection
        present: newCards,
        future: cards.future // no need to update the future when clearing the selection
      };
    });
  }, [updateCardInfo]);

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
    setContentTypeOfSelectedCards: setContentTypeOfSelectedCards,
    undo: undo,
    redo: redo,
    toggleCardLegend: toggleCardLegend,
    toggleSelectedCardsLegend
  }

  return [cards.present, cardFlags, cardMethods];
}
export default useCards;