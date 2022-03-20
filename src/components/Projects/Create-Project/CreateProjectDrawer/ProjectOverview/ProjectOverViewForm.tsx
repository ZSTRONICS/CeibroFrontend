import { Grid } from "@material-ui/core";
import React from "react";
import InputText from "../../../../Utills/Inputs/InputText";
import InputTextArea from "../../../../Utills/Inputs/InputTextArea";
import InputSwitch from "../../../../Utills/Inputs/InputSwitch";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import projectActions from "redux/action/project.action";
import { RootState } from "redux/reducers";

const ProjectOverViewForm = () => {
  const dispatch = useDispatch();
  const projectOverview = useSelector(
    (state: RootState) => state.project.projectOverview
  );
  const handleTitleChange = _.debounce((e) => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        title: e.target.value,
      })
    );
  }, 500);

  const handleLocationChange = _.debounce((e) => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        location: e.target.value,
      })
    );
  }, 500);
  const handleDescriptionChange = _.debounce((e) => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        description: e.target.value,
      }));
  }, 500);

  return (
    <Grid container>
      <Grid item xs={12}>
        <InputText
          onChange={handleTitleChange}
          name="title"
          placeholder="Enter Project title"
          value={projectOverview.title}
        />
      </Grid>

      <Grid item xs={12} style={styles.inputWrapper}>
        <InputText
          onChange={handleLocationChange}
          name="location"
          placeholder="Enter a location address"
          value={projectOverview.location}
        />
      </Grid>

      <Grid item xs={12} style={styles.inputWrapper}>
        <InputTextArea
          onChange={handleDescriptionChange}
          name="description"
          placeholder="Enter project description"
          value={projectOverview.description}
        />
      </Grid>
    </Grid>
  );
};

export default ProjectOverViewForm;

const styles = {
  inputWrapper: {
    marginTop: 15,
  },
};
