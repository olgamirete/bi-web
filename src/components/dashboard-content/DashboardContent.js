import React from 'react';
import './DashboardContent.css';
import MetaCard from '../meta-card/MetaCard.js';

function DashboardContent(props) {

  return (
    <div
      className="dashboard-content"
      ref={props.dashboardContentRef}>
      {
        props.cards.map((cardInfo, i, arr) => {
          return <MetaCard
            key={i}
            pointerInfo={props.pointerInfo}
            cardInfo={cardInfo}
            controlFlags={props.controlFlags} />
        })
      }
    </div>
  );
}

export default DashboardContent;