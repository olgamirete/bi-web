import React from 'react';
import './DashboardContent.css';
import MetaCard from '../meta-card/MetaCard.js';
import useCardEventHandlers from './customHooks/useCardEventHandlers.js';

const DASHBOARD_ID = "dashboard-content";

function DashboardContent(props) {

  const [cardFlags, debugInfo] = useCardEventHandlers(
    DASHBOARD_ID,
    props.cardMethods,
    props.controlFlags,
    props.keyboardInfo);

  return (
    <div
      id={DASHBOARD_ID}
      className="dashboard-content">
      {
        props.controlFlags.displayGrid === true &&
          <span>
            <div className="smallgrid"></div>
            <div className="grid"></div>
          </span>
      }
      <span>{debugInfo}</span>
      {
        Array.from(props.cards.values()).map((cardInfo, i, arr) => {
          return <MetaCard
            key={i}
            cardInfo={cardInfo}
            dashboardFlags={cardFlags}
            controlFlags={props.controlFlags} />
        })
      }
    </div>
  );
}

export default DashboardContent;