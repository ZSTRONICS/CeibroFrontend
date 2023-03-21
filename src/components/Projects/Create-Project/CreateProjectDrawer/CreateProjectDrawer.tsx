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

const CreateProjectDrawer = () => {
  const {drawerOpen, menue, projectOverview} = useSelector(
    (store: RootState) => store.project
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    dispatch(projectActions.closeDrawer());
    dispatch(projectActions.setProjectOverview(projectOverviewTemplate));
  };

  return (
    <Drawer onClose={handleClose} open={drawerOpen} anchor="right">
      <div className={classes.outerWrapper}>
        <DrawerHeader title={projectOverview._id?projectOverview.title :"New Project"} handleClose={handleClose} />
        <ProjectDrawerMenu />
        <CreateProjectBody />
        {menue===1?<CreateProjectFooter />:<></>}
      </div>
    </Drawer>
  );
};

export default CreateProjectDrawer;

const useStyles = makeStyles({
  outerWrapper: {
    width: "calc(100vw - 200px)",
    backgroundColor: colors.lightGrey,
    height: "calc(100vh-213px)",
    overflowY: "hidden",
    "@media (max-width:960px)": {
      width: "100vw",
      // overflowY: "auto",
    },
    "$ .MuiDrawer-paper": {
      overflowY: "hidden",
    },
  },
});
