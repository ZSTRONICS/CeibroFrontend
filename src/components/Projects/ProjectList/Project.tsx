import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import DatePicker from "../../Utills/Inputs/DatePicker";
import SelectDropdown from "../../Utills/Inputs/SelectDropdown";
import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import {
  getColorByStatus,
  getProjectStatus,
} from "../../../config/project.config";
import StatusMenu from "../../Utills/Others/StatusMenu";
import { useDispatch, useSelector } from "react-redux";
import colors from "assets/colors";

import projectActions, {
  getProjectsWithPagination,
} from "redux/action/project.action";
import InputText from "components/Utills/Inputs/InputText";
import { RootState } from "redux/reducers";

const Project = () => {
  const { searchProject, drawerOpen } = useSelector(
    (state: RootState) => state.project
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const allStatus = getProjectStatus();
  const [date, setDate] = useState<string>("");
  const [findProject, setFindProject] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  console.log("findProject", findProject);

  useEffect(() => {
    if (!drawerOpen) {
      const payload = {
        finallyAction: () => {
          setLoading(false);
        },
      };
      setLoading(true);
      dispatch(getProjectsWithPagination(payload));
    }
  }, [drawerOpen]);

  useEffect(() => {
    dispatch(projectActions.setSelectedDate(date));
  }, [date]);

  useEffect(() => {
    dispatch(projectActions.setSearchProject(findProject));
    dispatch(getProjectsWithPagination());
  }, [findProject]);

  return (
    <Grid item xs={12}>
      {loading && <CircularProgress size={20} className={classes.progress} />}

      <Grid container>
        <Grid item xs={12} md={3} className={classes.datePicker}>
          <DatePicker onChange={(e: any) => setDate(e.target.value)} />
        </Grid>

        <Grid item xs={12} md={4} className={classes.datePicker}>
          <SelectDropdown title="Assigned to" />
        </Grid>

        <Grid item xs={12} md={4} className={classes.datePicker}>
          {/* <SelectDropdown title="Projects" /> */}
          <InputText
            placeholder="Find Project"
            onChange={(e: any) => setFindProject(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container className={classes.allStatus}>
        <StatusMenu options={allStatus} />
      </Grid>

      <ProjectList />
    </Grid>
  );
};

export default Project;

const useStyles = makeStyles({
  datePicker: {
    padding: 5,
  },
  allStatus: {
    paddingLeft: 5,
  },
  statusChip: {
    padding: "10px 10px",
    width: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  ongoing: {
    background: getColorByStatus("ongoing"),
  },

  completed: {
    background: getColorByStatus("completed"),
  },
  draft: {
    background: getColorByStatus("draft"),
  },
  approved: {
    background: getColorByStatus("approved"),
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    marginTop: "300px",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
