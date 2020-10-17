import React from 'react';
import './Grid.css';

function Grid(props) {

  // const [dashboardScrollSize, setDashboardScrollSize] = useState({
  //   width: "100%",
  //   height: "100%"
  // });

  // const getScrollSize = useCallback(() => {
  //   if (props.dashboardRef.current === null) {
  //     return dashboardScrollSize;
  //   } else {
  //     return {
  //       width: props.dashboardRef.current.scrollWidth,
  //       height: props.dashboardRef.current.scrollHeight
  //     }
  //   }
  // }, [props.dashboardRef, dashboardScrollSize]);


  // useEffect(() => {
  //   // const dashboard = props.dashboardRef.current;
  //   // const scrollWidth = dashboard === null ? 0 : dashboard.scrollWidth;
  //   // const scrollHeight = dashboard === null ? 0 : dashboard.scrollHeight;
  //   // alert(scrollWidth + "-" + scrollHeight);
  //   // alert(JSON.stringify(getScrollSize(dashboard)));
  //   // console.log(JSON.stringify(getScrollSize(dashboard)));
  //   const newScrollSize = getScrollSize();
  //   if(dashboardScrollSize !== newScrollSize){
  //     setDashboardScrollSize(newScrollSize);
  //     console.log(false);
  //   } else {
  //     console.log(true);
  //   }
  //   // alert("ran");

  // }, [props.dashboardRef, getScrollSize, dashboardScrollSize]);

  return (
    <div
      className="grid"
      style={{
        width: props.dashboardScrollSize.width,
        height: props.dashboardScrollSize.height
      }}>
      {
        props.controlFlags.displayGrid === true &&
        <span>
          <div
            className="small-grid"></div>
          <div
            className="big-grid"></div>
        </span>
      }
    </div>
  )
}

export default Grid;