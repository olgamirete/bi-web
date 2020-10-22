import React from 'react';


function CardFormat(props) {
  return (
    <section className={"section" + (props.activeSection === "format" ? " active" : "")}>
      <h3 className="title">Format</h3>
          Format options
    </section>
  );
}

export default CardFormat;