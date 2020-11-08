import React, { useRef } from 'react';
import './DashboardContent.css';
import MetaCard from './components/meta-card/MetaCard.js';
import useDashboardEventHandlers from './customHooks/useDashboardEventHandlers.js';
import SelectionRectangle from './components/selection-rectangle/SelectionRectangle.js';
import Grid from './components/grid/Grid.js';

const DASHBOARD_ID = "dashboard-content";
const SELRECT_BORDERWIDTH = 2;

function DashboardContent(props) {

  const dashboardRef = useRef(null);

  const [dashboardFlags, dashboardProps] = useDashboardEventHandlers(
    DASHBOARD_ID,
    SELRECT_BORDERWIDTH,
    props.cardMethods,
    props.controlMethods,
    props.controlFlags);

  return (
    <div
      id={DASHBOARD_ID}
      // onPointerDown={dashboardMethods.onPointerDown}
      className={"dashboard-content" + (dashboardFlags.allowRectangleSelect ? " touch-action-none" : "")}
      ref={dashboardRef}>
      <Grid
        controlFlags={props.controlFlags}
        controlProps={props.controlProps}
        dashboardRef={dashboardRef} /> 
        {/* dashboardScrollSize={dashboardProps.scrollSize} /> */}
      {/* <span className="debug-info">{dashboardProps.debugInfo}</span> */}
      {/* <span className="debug-info">{"allow rect select: " + dashboardFlags.allowRectangleSelect}</span> */}
      {/* <span className="debug-info">{JSON.stringify(dashboardProps.scrollSize)}</span> */}
      {
        Array.from(props.cards.values()).map((cardInfo, i, arr) => {
          return <MetaCard
            key={i}
            cardInfo={cardInfo}
            dashboardFlags={dashboardFlags}
            controlFlags={props.controlFlags} />
        })
      }
      <SelectionRectangle selRectInfo={dashboardProps.selectionRectangleProps} />
    </div>
  );
}

export default DashboardContent;