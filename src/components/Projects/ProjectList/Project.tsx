import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import DatePicker from "../../Utills/Inputs/DatePicker";
import SelectDropdown, {
  dataInterface,
} from "../../Utills/Inputs/SelectDropdown";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import {
  getColorByStatus,
  getProjectStatus,
} from "../../../config/project.config";
import StatusMenu from "../../Utills/Others/StatusMenu";
import { useDispatch, useSelector } from "react-redux";
import colors from "assets/colors";

import projectActions, {
  getAllProjects,
  getAllProjectsWithMembers,
  getProjectsWithPagination,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import { getAvailableUsers } from "redux/action/user.action";
import Input from "components/Utills/Inputs/Input";
import CDatePicker from "components/DatePicker/CDatePicker";

const Project = () => {
  const { searchProject, drawerOpen } = useSelector(
    (state: RootState) => state.project
  );

  if (window.location.pathname.includes("projects")) {
    document.body.style.background = "#f5f7f8";
  }
  const classes = useStyles();
  const dispatch = useDispatch();
  const allStatus = getProjectStatus();
  const [date, setDate] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllProjectsWithMembers());
  }, []);

  const handleUserChange = (user: dataInterface) => {
    dispatch(projectActions.setSelectedUser(user?.value || null));
    setLoading(true);
    dispatch(
      getProjectsWithPagination({
        finallyAction: () => setLoading(false),
      })
    );
  };

  return (
    <Grid item xs={12}>
      {loading && <CircularProgress size={20} className={classes.progress} />}

      <Grid container className={classes.outerWrapper}>
        <Grid
          item
          sx={{ width: "100%", maxWidth: "240px", height: "40px" }}
          // xs={12} md={3}
        >
          <CDatePicker
            showLabel={true}
            required
            value={date}
            id="date1"
            name="dueDate"
            onChange={(e: any) => setDate(e)}
          />
        </Grid>

        <Grid
          item
          sx={{ width: "100%", maxWidth: "450px", height: "40px" }}
          // xs={12} md={4}
          className={classes.datePicker}
        >
          <SelectDropdown
            isClearAble={true}
            title="Members"
            // data={availableUsers}
            handleChange={handleUserChange}
          />
        </Grid>

        <Grid
          item
          // xs={12} md={4}
          sx={{ width: "100%", maxWidth: "350px", height: "40px" }}
          className={classes.datePicker}
        >
          {/* <SelectDropdown title="Projects" /> */}
          <SelectDropdown
            placeholder="All"
            title="Status"
            // onChange={(e: any) => setFindProject(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container className={classes.allStatus}>
        {/* <StatusMenu options={allStatus} /> */}
        {/* <StatusMenu /> */}
      </Grid>

      <ProjectList />
    </Grid>
  );
};

export default Project;

const useStyles = makeStyles({
  outerWrapper: {
    display: "flex",
    alignItems: "baseline",
    gap: "25px",
  },
  datePicker: {
    padding: 5,
  },
  allStatus: {
    padding: "10px 5px",
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
