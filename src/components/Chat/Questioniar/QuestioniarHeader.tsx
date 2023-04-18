import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import colors from "../../../assets/colors";
import {
  closeQuestioniarDrawer,
  closeViewQuestioniarDrawer,
} from "../../../redux/action/chat.action";
import { Close } from "@material-ui/icons";

interface ProjectDrawerHeaderInt {
  viewMode?: boolean;
}

const ProjectDrawerHeader: React.FC<ProjectDrawerHeaderInt> = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleClose = () => {
    props?.viewMode
      ? dispatch(closeViewQuestioniarDrawer())
      : dispatch(closeQuestioniarDrawer());
  };

  return (
    <div className={classes.drawerHeader}>
      <div className={classes.headerTitleWrapper}>
        <Typography className={classes.headerTitle}>Questionarie</Typography>
      </div>
      <div className={classes.headerIcons} onClick={handleClose}>
        <Typography className={classes.close}>Close</Typography>
        {/* <Close className={classes.icon} /> */}
      </div>
    </div>
  );
};

export default ProjectDrawerHeader;

const useStyles = makeStyles({
  drawerHeader: {
    backgroundColor: colors.white,
    // height: 80,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },
  headerTitleWrapper: {},
  headerTitle: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 24,
  },
  headerIcons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: colors.primary,
    cursor: "pointer",
  },
  icon: {
    color: colors.primary,
    paddingLeft: 5,
    fontSize: 20,
  },
  close: {
    fontSize: 14,
    fontWeight: 500,
    border: "1px solid",
    padding: "5px 4px",
    borderRadius: "4px",
  },
});
