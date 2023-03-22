import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import ProjectSection from "./ProjectSection";
import TaskSection from "./TaskSection";
import SmartMenuBar from "./SmartMenuBar";
import { getAllProjects, getAllProjectsWithMembers } from "redux/action/project.action";
import { useDispatch } from "react-redux";
import { getAllTask } from "redux/action/task.action";
import { getMyConnectionsCount, getMyInvitesCount } from "redux/action/user.action";

const Dashboard = () => {
  const headerRef: any = useRef();
  const [showProjectList, setShowProjectList] = useState<boolean>(false);
  const [projectHeight, setProjectHeight] = useState<string>(" ");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjectsWithMembers());
    dispatch(getAllTask());
    dispatch(getAllProjects());
    dispatch(getMyConnectionsCount());
    dispatch(getMyInvitesCount());
  }, []);

  useEffect(() => {
    if (headerRef.current.clientHeight) {
      setTimeout(() => {
        setShowProjectList(true);
      }, 100);
    }
  });
  const getHeaderHeight = () => {
    if (headerRef.current === undefined) {
      return;
    }
    let contentHeight =
      window.innerHeight - (headerRef.current.clientHeight + 140);
    return `${contentHeight}px`;
  };
  window.addEventListener("resize", getHeaderHeight);

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
