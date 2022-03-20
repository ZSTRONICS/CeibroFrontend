import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import DatePicker from "../../Utills/Inputs/DatePicker";
import SelectDropdown from "../../Utills/Inputs/SelectDropdown";
import { Grid, makeStyles } from "@material-ui/core";
import {
  getColorByStatus,
  getProjectStatus,
} from "../../../config/project.config";
import StatusMenu from "../../Utills/Others/StatusMenu";
import { useDispatch } from "react-redux";
import projectActions, {
  getProjectsWithPagination,
} from "redux/action/project.action";

const Project = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allStatus = getProjectStatus();
  const [date, setDate] = useState<string>("");

  console.log("selected date1", date);

  useEffect(() => {
    dispatch(getProjectsWithPagination());
  }, []);

  useEffect(() => {
    dispatch(projectActions.setSelectedDate(date));
  }, [date]);

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12} md={3} className={classes.datePicker}>
          <DatePicker onChange={(e: any) => setDate(e.target.value)} />
        </Grid>

        <Grid item xs={12} md={4} className={classes.datePicker}>
          <SelectDropdown title="Assigned to" />
        </Grid>

        <Grid item xs={12} md={4} className={classes.datePicker}>
          <SelectDropdown title="Projects" />
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
});
