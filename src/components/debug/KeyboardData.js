import React from 'react';

function KeyboardData(props) {

  return (
    <div className={"keyboard-data"}>
      {JSON.stringify(props.keyboardInfo)}
    </div>
  );
}

export default KeyboardData;