import React from 'react';

function PointerData(props) {
  const pointerIndexMoved = props.pointerInfo.pointerIndexMoved;
  const singlePointerInfo = props.pointerInfo.pointers[pointerIndexMoved];
  return (
    <div className={"pointer-data"}>
      <div>{"isTouchOnStart: " + singlePointerInfo.isTouch}</div>
      <div>
        {
          Math.round(singlePointerInfo.lastClickedPos.pageX, 2)
          + "." +
          Math.round(singlePointerInfo.lastClickedPos.pageY, 2)
        }
      </div>
      <div>
        {
          Math.round(singlePointerInfo.lastClickedPos.dashX, 2)
          + "." +
          Math.round(singlePointerInfo.lastClickedPos.dashY, 2)
        }
      </div>
      <div>
        {
          Math.round(singlePointerInfo.currentPos.pageX, 2)
          + "." +
          Math.round(singlePointerInfo.currentPos.pageY, 2)
        }
      </div>
      <div>
        {
          Math.round(singlePointerInfo.currentPos.dashX, 2)
          + "." +
          Math.round(singlePointerInfo.currentPos.dashY, 2)
        }
      </div>
      <div>
        {
          props.pointerInfo.pointerIndexPressed + "." + props.pointerInfo.pointerIndexMoved + "." + props.pointerInfo.pointerIndexReleased
        }
      </div>
    </div>
  );
}

export default PointerData;