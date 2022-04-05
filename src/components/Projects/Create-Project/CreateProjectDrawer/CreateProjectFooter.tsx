import { Button, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import colors from "../../../../assets/colors";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { projectOverviewSchema } from "constants/schemas/project.schema";
import { useEffect, useState } from "react";
import projectActions, {
  createProject,
  updateProject,
} from "redux/action/project.action";
import { toast } from "react-toastify";

const CreateProjectBody = () => {
  const classes = useStyles();
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const isDiabled = !loading ? false : true;
  const { projectOverview, projects, selectedProject } = useSelector(
    (state: RootState) => state.project
  );
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
      data.append("publishStatus", "draft");
    }
    dispatch(
      createProject({
        body: data,
        success: (res) => {
          toast.success("Project created");
          setLoading(true);
          dispatch(projectActions.setSelectedProject(res?.data?.id));
        },
        finallyAction: () => {
          setLoading(false);
        },
      })
    );
  };

  const handleProjectUpdate = () => {
    const data = getFormValues();
    data.delete('projectPhoto')
    const payload = {
      body: data,
      other: selectedProject,
    };
    dispatch(updateProject(payload));
  };

  const handleSubmit = () => {
    if (selectedProject) {
      handleProjectUpdate();
    } else {
      handleProjectCreate();
    }
  };

  const getFormValues = () => {
    const {
      title,
      owner,
      dueDate,
      location,
      description,
      photoFile,
      publishStatus,
    } = projectOverview;
    const formData = new FormData();
    formData.append("title", title || "");
    formData.append("location", location || "");
    formData.append("description", description || "");
    formData.append("owner", owner.value);
    formData.append("dueDate", dueDate);
    formData.append("projectPhoto", photoFile);
    formData.append("publishStatus", publishStatus || "");

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
        disabled={isDiabled}
        className={classes.create}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        {selectedProject ? "update" : "Create project"}
        {isDiabled && loading && (
          <CircularProgress size={20} className={classes.progress} />
        )}
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
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
