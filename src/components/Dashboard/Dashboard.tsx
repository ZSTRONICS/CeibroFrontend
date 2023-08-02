import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import ProjectSection from "./ProjectSection";
import TaskSection from "./TaskSection";
import SmartMenuBar from "./SmartMenuBar";

const Dashboard = () => {
  const headerRef: any = useRef();
  const [showProjectList, setShowProjectList] = useState<boolean>(false);

  useEffect(() => {
    if (headerRef.current.clientHeight) {
      setTimeout(() => {
        setShowProjectList(true);
      }, 50);
    }
  });

  const [headerHeight, setHeaderHeight] = useState<string>("");
  let isTimeOut: NodeJS.Timeout;
  useEffect(() => {
    if (headerRef.current && headerRef.current.clientHeight) {
      getHeaderHeight();
    } else {
      windowResized();
    }
    window.addEventListener("resize", windowResized);
  });

  const windowResized = () => {
    setTimeout(() => {
      getHeaderHeight();
    }, 50);
  };

  const getHeaderHeight = () => {
    if (headerRef.current && headerRef.current.clientHeight) {
      let contentHeight =
        window.innerHeight - (headerRef.current.clientHeight + 138);
      const height = `${contentHeight}px`;
      setHeaderHeight(height);
      if (isTimeOut && isTimeOut.hasRef()) {
        isTimeOut.unref();
      }
    } else {
      if (!isTimeOut || !isTimeOut.hasRef()) {
        isTimeOut = setTimeout(() => {
          getHeaderHeight();
        }, 50);
      } else {
        isTimeOut.refresh();
      }
    }
  };

  return (
    <>
      <Grid item xs={12} ref={headerRef}>
        <SmartMenuBar />
        <TaskSection />
      </Grid>
      <Grid item>
        {showProjectList === true && <ProjectSection height={headerHeight} />}
      </Grid>
    </>
  );
};

export default Dashboard;
