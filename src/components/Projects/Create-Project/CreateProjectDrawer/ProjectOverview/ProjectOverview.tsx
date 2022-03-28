import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DatePicker from "../../../../Utills/Inputs/DatePicker";
import SelectDropdown, {
  dataInterface,
} from "../../../../Utills/Inputs/SelectDropdown";
import ImagePicker from "../../../../Utills/Inputs/ImagePicker";
import HorizontalBreak from "../../../../Utills/Others/HorizontalBreak";
import colors from "../../../../../assets/colors";
import ProjectOverViewForm from "./ProjectOverViewForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { ProjectOverviewInterface } from "constants/interfaces/project.interface";
import _ from "lodash";
import projectActions, { getProjectDetail } from "redux/action/project.action";
import { getAvailableUsers } from "redux/action/user.action";
import { formatDate } from "helpers/project.helper";

const ProjectOverview = () => {
  const classes = useStyles();
  const projectOverview = useSelector(
    (state: RootState) => state.project.projectOverview
  );
  const selectedProject = useSelector(
    (state: RootState) => state.project.selectedProject
  );
  const [data, setData] = useState<dataInterface[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedProject) {
      dispatch(getProjectDetail({ other: selectedProject }));
    }
  }, [selectedProject]);

  useEffect(() => {
    dispatch(
      getAvailableUsers({
        success: (res) => {
          setData(res.data);
        },
      })
    );
  }, []);

  const handleDateChange = _.debounce((e: any) => {
    const date = e?.target?.value;
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        dueDate: date,
      })
    );
  }, 300);

  const handleOwnerChange = _.debounce((user: any) => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        owner: user,
      })
    );
  }, 300);

  const my = formatDate(projectOverview?.dueDate);

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          <DatePicker value={my} onChange={handleDateChange} />
        </Grid>

        <Grid item xs={12} sm={6} md={5} className={classes.datePickerWrapper}>
          <SelectDropdown
            handleChange={handleOwnerChange}
            data={data}
            value={projectOverview?.owner}
            title="Owner"
          />
        </Grid>

        <Grid item xs={12} md={8} style={{ padding: "20px 5px" }}>
          <HorizontalBreak color={colors.grey} />
        </Grid>
      </Grid>

      <Grid container className={classes.secondForm}>
        <Grid item xs={12} md={2} className={classes.imagePicker}>
          <ImagePicker />
        </Grid>

        <Grid item xs={12} md={6}>
          <ProjectOverViewForm />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectOverview;

const useStyles = makeStyles({
  datePickerWrapper: {
    paddingLeft: 20,
    ["@media (max-width:600px)"]: {
      paddingLeft: 0,
      paddingTop: 20,
    },
  },
  secondForm: {
    paddingTop: 0,
  },
  imagePicker: {
    ["@media (max-width:600px)"]: {
      paddingBottom: 20,
    },
  },
});
