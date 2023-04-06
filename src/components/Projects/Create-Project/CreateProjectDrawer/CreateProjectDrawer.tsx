import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../../assets/colors";
import projectActions from "../../../../redux/action/project.action";
import { RootState } from "../../../../redux/reducers";
import DrawerHeader from "./DrawerHeader";
import ProjectDrawerMenu from "./ProjectDrawerMenu";
import CreateProjectBody from "./CreateProjectBody";
import CreateProjectFooter from "./CreateProjectFooter";
import { projectOverviewTemplate } from "constants/interfaces/project.interface";
import { Grid } from "@mui/material";

const CreateProjectDrawer = () => {
  const { drawerOpen, menue, projectOverview } = useSelector(
    (store: RootState) => store.project
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    dispatch(projectActions.closeDrawer());
    dispatch(projectActions.setProjectOverview(projectOverviewTemplate));
  };

  return (
    <Drawer
      onClose={handleClose}
      open={drawerOpen}
      anchor="right"
      className={classes.DrawerWrapper}
    >
      <div className={classes.outerWrapper}>
        <DrawerHeader
          title={projectOverview._id ? projectOverview.title : "New Project"}
          handleClose={handleClose}
        />
        <Grid container sx={{ overflowX: "auto", flexWrap: "nowrap" }}>
          <ProjectDrawerMenu />
        </Grid>
        <CreateProjectBody />
        {menue === 1 ? <CreateProjectFooter /> : <></>}
      </div>
    </Drawer>
  );
};

export default CreateProjectDrawer;

const useStyles = makeStyles({
  DrawerWrapper: {
    "& .MuiDrawer-paper": {
      overflowY: "hidden",
    },
  },
  outerWrapper: {
    width: "calc(100vw - 200px)",
    backgroundColor: colors.lightGrey,
    // height: "calc(100vh-213px)",
    height: "100vh",
    // overflowY: "hidden",
    "@media (max-width:960px)": {
      width: "100vw",
      // overflowY: "auto",
    },
    "& .MuiDrawer-paper": {
      overflowY: "hidden",
      flexDirection: "row",
    },
  },
});
