import { Grid, makeStyles, Typography } from "@material-ui/core";
import { CButton } from "components/Button";
import { SubHeadingTag } from "components/CustomTags";
import { groupTemplate } from "constants/interfaces/ProjectRoleMemberGroup.interface";
import { useDispatch } from "react-redux";
import projectActions from "redux/action/project.action";
import colors from "../../../../../assets/colors";
import HorizontalBreak from "../../../../Utills/Others/HorizontalBreak";
import ProjectDrawer from "./ProjectDrawer";
import ProjectGroupsList from "./ProjectGroupsList";

const ProjectGroups = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <Grid item xs={12}>
        <Grid item xs={12} className={classes.actionWrapper}>
          {/* <Button
            variant="outlined"
            color="primary"
            startIcon={<ListIcon />}
            className={classes.actionButton}
          >
            Bulk edit
          </Button> */}
          <SubHeadingTag>New Group</SubHeadingTag>
          <CButton
            variant="outlined"
            color="primary"
            label="Add"
            sx={{ fontSize: 14, fontWeight: "700" }}
            onClick={() => {
              dispatch(projectActions.openProjectGroup());
              dispatch(projectActions.setSelectedGroup(groupTemplate));
            }}
          />
          <ProjectDrawer />
        </Grid>
        <Grid item xs={12} className={classes.titleWrapper}>
          <Typography className={classes.title}>Group name</Typography>
          <HorizontalBreak color={colors.ternaryGrey} />
        </Grid>

        <Grid item xs={12} className={classes.groupsWrapper}>
          <ProjectGroupsList />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectGroups;

const useStyles = makeStyles({
  actionWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 10,
  },
  actionButton: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  titleWrapper: {
    paddingTop: 0,
    "@media (max-width:960px)": {
      paddingBottom: 10,
      paddingTop: 10,
    },
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
    paddingBottom: 10,
  },
  groupsWrapper: {
    height: "660px",
    overflowY: "auto",
    paddingBottom: "100px",
  },
});
