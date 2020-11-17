import React from 'react';
import './Config.css';

function Config(props) {

  const themes = props.config.VALID_THEMES;
  
  return (
    <section className={"section" + (props.activeSection === "config" ? " active" : "")}>
      <h3 className="title">Set theme color</h3>
      {themes.map((theme) => {
        return <button
          className={"theme-selector " + theme}
          onPointerDown={() => props.config.setTheme(theme)} />
      })}
    </section>
  );
}

export default Config;