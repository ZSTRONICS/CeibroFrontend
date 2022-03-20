import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import colors from "../../../assets/colors";
import { BsClipboard } from "react-icons/bs";
import { AiOutlineFolder } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineChatAlt } from "react-icons/hi";
import Moment from "react-moment";
import {
  getColorByStatus,
  getTextColorByStatus,
} from "../../../config/project.config";
import assets from "assets/assets";
import { ProjectInterface } from "constants/interfaces/project.interface";
import { useDispatch } from "react-redux";
import projectActions from "redux/action/project.action";
import { UserInterface } from "constants/interfaces/user.interface";

interface ProjectCardInterface {
  project: ProjectInterface;
}

const ProjectCard: FC<ProjectCardInterface> = (props) => {
  const { project } = props;
  const {
    projectPhoto: src,
    dueDate,
    owner,
    title,
    tasks,
    docs,
    users,
    chat,
    publishStatus: status,
    id,
  } = project;

  const dispatch = useDispatch();

  const handleProjectClick = () => {
    dispatch(projectActions.setSelectedProject(id || null));
    dispatch(projectActions.openDrawer());
  };

  const classes = useStyles();

  return (
    <Grid
      className={classes.cardOuterWrapper}
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      onClick={handleProjectClick}
    >
      <Grid
        item
        xs={12}
        className={classes.cardWrapper}
        style={{ borderColor: getColorByStatus(status) }}
      >
        <Grid item xs={12} className={classes.imageWrapper}>
          <div className={classes.tagWrapper}>
            <div
              className={classes.status}
              style={{
                background: getColorByStatus(status),
                color: getTextColorByStatus(status),
              }}
            >
              <Typography className={classes.statusText}>{status}</Typography>
            </div>
            <div className={classes.dateWrapper}>
              <Typography className={classes.statusDate}>
                {<Moment format="YYYY-MM-DD">{dueDate}</Moment>}
              </Typography>
            </div>
          </div>
          <img className={classes.myImage} src={src} alt="ceibro-project-img" />
        </Grid>
        <Grid container>
          <Grid item xs={5}>
            <Typography className={classes.meta}>Due Date</Typography>
            <Typography className={classes.metaValue}>
              {<Moment format="YYYY-MM-DD">{dueDate}</Moment>}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.meta}>Owner</Typography>
            <Typography className={classes.metaValue}>
              {owner.firstName} {owner.surName}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.viewMap}>View map</Typography>

          <hr className={classes.break} />
        </Grid>

        <Grid item xs={12} className={classes.iconWrapper}>
          <div className={classes.iconChip}>
            <img src={assets.clipboardIcon} className={`w-16`} />
            <Typography className={classes.iconText}>
              {tasks} task(s)
            </Typography>
          </div>

          <div className={classes.iconChip}>
            <img src={assets.folderIcon} className={`w-16`} />
            <Typography className={classes.iconText}>{docs} doc(s)</Typography>
          </div>

          <div className={classes.iconChip}>
            <img src={assets.blueUser} className={`width-16`} />
            <Typography className={classes.iconText}>{users}</Typography>
          </div>

          <div className={classes.iconChip}>
            <img src={assets.chatIcon} className={`w-16`} />
            <Typography className={classes.iconText}>{chat}</Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectCard;

const useStyles = makeStyles({
  cardOuterWrapper: {
    padding: 5,
    cursor: "pointer",
  },
  cardWrapper: {
    height: 270,
    padding: 15,
    background: colors.white,
    border: `1px solid`,
    boxSizing: "border-box",
    borderRadius: 5,
  },
  imageWrapper: {
    position: "relative",
  },
  tagWrapper: {
    position: "absolute",
    background: colors.white,
    top: 10,
    left: 5,
    borderRadius: 3,
    display: "flex",
    height: 20,
  },
  status: {
    background: colors.darkYellow,
    borderRadius: 3,
    paddingLeft: 5,
    paddingRight: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 500,
  },
  statusDate: {
    color: colors.black,
    fontWeight: 500,
    fontSize: 10,
  },
  dateWrapper: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 10,
  },
  myImage: {
    width: "100%",
    height: 100,
    borderRadius: 4,
  },
  meta: {
    fontWeight: 500,
    fontSize: 10,
    color: colors.textGrey,
  },
  metaValue: {
    fontWeight: 500,
    fontSize: 12,
  },
  title: {
    fontWeight: 500,
    fontSize: 14,
    marginTop: 10,
    color: colors.black,
  },
  viewMap: {
    color: colors.primary,
    fontWeight: 500,
    fontSize: 12,
  },
  break: {
    border: 0,
    borderTop: `1px solid ${colors.grey}`,
  },
  iconWrapper: {
    display: "flex",
    aligItems: "center",
    justifyContent: "space-between",
    minHeight: 40,
  },
  iconChip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: 500,
    fontSize: 10,
  },
  icon: {
    color: colors.primary,
    paddingRight: 3,
    fontSize: 12,
  },
  iconText: {
    fontSize: 10,
    fontWeight: 500,
    paddingLeft: 5,
  },
});
