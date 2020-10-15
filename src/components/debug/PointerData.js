import React from 'react';

function PointerData(props) {
  // const pointerIndexMoved = props.pointerInfo.pointerIndexMoved;
  // const singlePointerInfo = props.pointerInfo.pointers[pointerIndexMoved];
  return (
    <div className="pointer-data">
      {"pointer count: " + props.pointerInfo.pointers.length}
      <div>Pointers:</div>
      {
        props.pointerInfo.pointers.map((pointer, i, arr) => {
          // return <div>{"id: " + pointer.pointerId + "-" + pointer.pageX + "-" + pointer.pageY}</div>
          return <span>{"id: " + pointer.id + "-" + Math.round(pointer.currentPos.pageX, 2) + "-" + Math.round(pointer.currentPos.pageY, 2) + "-" + pointer.isTouch}</span>
        })
      }
    </div>
  );
}

export default PointerData;