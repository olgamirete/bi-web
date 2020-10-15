import { useState, useEffect } from 'react';

function usePointerIndex(pointerInfo) {

  const [pointerIndex, setPointerIndex] = useState(0);

  useEffect(() => {
    setPointerIndex(pointerInfo.pointerIndexPressed);
  }, [pointerInfo.pointerDownCounter, pointerInfo.pointerIndexPressed]);

  useEffect(() => {
    setPointerIndex(null);
  }, [pointerInfo.pointerUpCounter, pointerInfo.pointerIndexRelease]);

  return pointerIndex;

}

export default usePointerIndex;