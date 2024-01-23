import { Button, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import assets from "assets/assets";
import { CButton } from "components/Button";
import { ConfirmDescriptionTag, CustomStack } from "components/CustomTags";
import { Member } from "constants/interfaces/ProjectRoleMemberGroup.interface";
import { projectOverviewSchema } from "constants/schemas/project.schema";
import { useConfirm } from "material-ui-confirm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import projectActions, {
  createProject,
  deleteProject,
  getAllProjectsWithMembers,
  getProjectsWithPagination,
  updateProject,
} from "redux/action/project.action";
import { RootState } from "redux/reducers/appReducer";
import colors from "../../../../assets/colors";

const CreateProjectBody = () => {
  const classes = useStyles();
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const isDiabled = !loading ? false : true;

  const { user } = useSelector((state: RootState) => state.auth);
  const { projectOverview, projects, selectedProject } = useSelector(
    (state: RootState) => state.project
  );
  const isValidData = {
    title: projectOverview.title,
    dueDate: projectOverview.dueDate,
    publishStatus: projectOverview.publishStatus,
    // location: projectOverview.location,
    // description: projectOverview.description,
  };
  const confirm = useConfirm();
  useEffect(() => {
    projectOverviewSchema
      .isValid(isValidData)
      .then(setIsValid)
      .catch((_err) => {
        setIsValid(false);
      });
  }, [projectOverview]);

  const handleProjectCreate = (saveAsDraft = false) => {
    const data = getFormValues(saveAsDraft);
    setLoading(true);
    dispatch(
      createProject({
        body: data,
        success: (res) => {
          toast.success("Project created");
          dispatch(getAllProjectsWithMembers());
          dispatch(
            projectActions.setSelectedProject(res.data.createProject._id)
          );
          dispatch(projectActions.setProjectOverview(res.data.createProject));
        },
        finallyAction: () => {
          setLoading(false);
        },
      })
    );
  };

  const handleProjectUpdate = (saveAsDraft = false) => {
    const data = getFormValues(saveAsDraft);
    // data.delete("projectPhoto");
    const payload = {
      body: data,
      success: () => {
        toast.success("Project updated successfully!");
        // dispatch(projectActions.closeDrawer());
      },
      finallyAction: () => {
        setLoading(false);
      },
      other: selectedProject,
    };
    setLoading(true);
    dispatch(updateProject(payload));
  };

  const handleSubmit = (saveAsDrfat = false) => {
    if (selectedProject) {
      handleProjectUpdate(saveAsDrfat);
    } else {
      handleProjectCreate(saveAsDrfat);
    }
  };

  const handleDelete = () => {
    confirm({
      title: (
        <CustomStack gap={1}>
          <assets.ErrorOutlineOutlinedIcon /> Confirmation
        </CustomStack>
      ),
      description: (
        <ConfirmDescriptionTag sx={{ pt: 2 }}>
          Are you confirm want to delete this project?
        </ConfirmDescriptionTag>
      ),
      titleProps: { color: "red", borderBottom: "1px solid #D3D4D9" },
      confirmationText: "Remove",
      confirmationButtonProps: {
        sx: {
          textTransform: "capitalize",
          padding: "4px 15px",
          color: "#FA0808",
          borderColor: "#FA0808",
          marginRight: "10px",
        },
        variant: "outlined",
      },
      cancellationText: (
        <CButton
          variant="contained"
          sx={{
            color: "#605C5C",
            backgroundColor: "#ECF0F1",
            fontSize: 12,
            fontWeight: "bold",
          }}
          label={"Cancel"}
        />
      ),
    }).then(() => {
      const payload = {
        success: () => {
          toast.success("Project Delete Successfully");
          dispatch(projectActions.closeDrawer());
          dispatch(getProjectsWithPagination());
        },
        other: selectedProject,
      };
      dispatch(deleteProject(payload));
    });
  };

  const getFormValues = (saveAsDraft = false) => {
    const { title } = projectOverview;
    const bodyData = { title };
    return bodyData;
  };
  // const disableBtn = [projectOverview.isDefault ? true : false];
  const updateRights = projectOverview.owner.some(
    (item: Member) => String(item._id) === String(user._id)
  );
  return (
    <>
      {updateRights === true && (
        <Grid container justifyContent="flex-end" className={classes.body}>
          {!selectedProject && (
            <Button
              onClick={() => handleSubmit(true)}
              disabled={!isValid}
              className={classes.draft}
              color="primary"
            >
              Save as draft
            </Button>
          )}
          {/* {!selectedProject?} */}
          {selectedProject && updateRights && (
            <Button
              className={classes.trash}
              variant="outlined"
              onClick={() => dispatch(projectActions.closeDrawer())}
              // disabled={projectOverview.isDefault}
            >
              Cancel
              {/* <img src={assets.DeleteIcon} className={"w-16"} /> */}
            </Button>
          )}
          {!selectedProject && (
            <Button
              disabled={!isValid || loading}
              className={classes.create}
              variant="contained"
              color="primary"
              onClick={() => handleSubmit(false)}
            >
              {isDiabled && loading && (
                <CircularProgress size={20} className={classes.progress} />
              )}
              Create project
            </Button>
          )}
          {projectOverview._id !== "" && updateRights && (
            <Button
              disabled={!isValid || loading}
              className={classes.create}
              variant="contained"
              color="primary"
              onClick={() => handleSubmit(false)}
            >
              {isDiabled && loading && (
                <CircularProgress size={20} className={classes.progress} />
              )}
              Update
            </Button>
          )}
        </Grid>
      )}
    </>
  );
};

export default CreateProjectBody;

const useStyles = makeStyles({
  body: {
    padding: "10px 20px",
    background: colors.white,
    "@media (max-width:960px)": {
      // marginBottom: "0",
      flexDirection: "row",
      alignItems: "flex-end",
    },
  },
  create: {
    marginLeft: 30,
    padding: "10px",
    fontSize: 12,
    fontWeight: 700,
  },
  draft: {
    fontSize: 12,
    fontWeight: 500,
  },
  trash: {
    // color: "red",
    display: "block",
  },
  notrash: {
    display: "none",
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