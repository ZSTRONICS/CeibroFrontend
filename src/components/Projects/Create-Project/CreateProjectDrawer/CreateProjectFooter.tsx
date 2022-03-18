import { Button, Grid, makeStyles } from "@material-ui/core";
import colors from "../../../../assets/colors";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { projectOverviewSchema } from "constants/schemas/project.schema";
import { useEffect, useState } from "react";
import { createProject } from "redux/action/project.action";

const CreateProjectBody = () => {
  const classes = useStyles();
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const { projectOverview } = useSelector((state: RootState) => state.project);
  useEffect(() => {
    projectOverviewSchema
      .isValid(projectOverview)
      .then(setIsValid)
      .catch((_err) => {
        setIsValid(false);
      });
  }, [projectOverview]);

  const handleProjectCreate = (saveAsDraft = false) => {
    const data = getFormValues();
    if (saveAsDraft) {
      data.append("projectStatus", "draft");
    } else {
      data.append("projectStatus", "published");
    }
    dispatch(
      createProject({
        body: data,
        success: () => {
          alert("projecte created");
        },
      })
    );
  };

  const getFormValues = () => {
    const { title, owner, dueDate, location, description, photoFile } =
      projectOverview;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("owner", owner.value);
    formData.append("dueDate", dueDate);
    formData.append("projectPhoto", photoFile);
    return formData;
  };

  return (
    <Grid container justifyContent="flex-end" className={classes.body}>
      <Button
        onClick={() => handleProjectCreate(true)}
        disabled={!isValid}
        className={classes.draft}
        color="primary"
      >
        Save as draft
      </Button>
      <Button className={classes.trash} color="primary">
        <FaTrash />
      </Button>
      <Button
        disabled={!isValid}
        className={classes.create}
        variant="contained"
        color="primary"
        onClick={() => handleProjectCreate()}
      >
        Create project
      </Button>
    </Grid>
  );
};

export default CreateProjectBody;

const useStyles = makeStyles({
  body: {
    padding: 20,
    background: colors.white,
    ["@media (max-width:960px)"]: {
      flexDirection: "column",
      alignItems: "flex-end",
    },
  },
  create: {
    marginLeft: 50,
    fontSize: 12,
    fontWeight: 500,
  },
  draft: {
    fontSize: 12,
    fontWeight: 500,
  },
  trash: {
    color: "red",
  },
});
