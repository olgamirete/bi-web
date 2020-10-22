import React from 'react';


function Other(props) {
  return (
    <section className={"section" + (props.activeSection === "other" ? " active" : "")}>
      <h3 className="title">Other</h3>
          Other
    </section>
  );
}

export default Other;