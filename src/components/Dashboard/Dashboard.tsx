import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import ProjectSection from "./ProjectSection";
import TaskSection from "./TaskSection";
import SmartMenuBar from "./SmartMenuBar";

const Dashboard = () => {
  const headerRef: any = useRef();
  const [showProjectList, setShowProjectList] = useState<boolean>(false);
  const [projectHeight, setProjectHeight] = useState<string>(" ");

  useEffect(() => {
    if (headerRef.current.clientHeight) {
      setTimeout(() => {
        setShowProjectList(true);
      }, 100);
    }
    window.addEventListener("resize", getHeaderHeight);
  });

  const getHeaderHeight = () => {
    if (headerRef.current === undefined) {
      return;
    }
    let contentHeight =
      window.innerHeight - (headerRef.current.clientHeight + 140);
    return `${contentHeight}px`;
  };
  return (
    <>
      <Grid item xs={12} ref={headerRef}>
        <SmartMenuBar />
        <TaskSection />
      </Grid>
      <Grid item>
        {showProjectList === true && <ProjectSection height={getHeaderHeight()} />}
      </Grid>
    </>
  );
};

export default Dashboard;
