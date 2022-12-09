import { FC } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "@emotion/styled";
import assets from "assets/assets";
import { ProjectInterface } from "constants/interfaces/project.interface";
import { useDispatch } from "react-redux";
import projectActions, { getPermissions } from "redux/action/project.action";
import colors from "../../../assets/colors";
import {
  getColorByStatus,
  getTextColorByStatus,
} from "../../../config/project.config";

import moment from "moment";
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
    docsCount,
    usersCount,
    chatCount,
    publishStatus: status,
    id,
  } = project;

  const dispatch = useDispatch();
  const handleProjectClick = () => {
    dispatch(getPermissions({ other: id }));
    dispatch(projectActions.setSelectedProject(id || null));
    dispatch(projectActions.openDrawer());
  };

  const classes = useStyles();
  const imgSrc = src === "undefined" ? assets.Defaulttask : src;
  const dueDateString: string = moment(dueDate).format("YYYY-MM-DD");

  return (
    <>
      <ProjectCardContain
        style={{ border: `1px solid ${getColorByStatus(status)}` }}
        onClick={handleProjectClick}
      >
        <ImageCard>
          <Image src={imgSrc} />
          <Status>
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
                {dueDateString}
              </Typography>
            </div>
          </Status>
        </ImageCard>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography className={classes.meta}>Due Date </Typography>
            <Typography className={classes.metaValue}>
              {dueDateString}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.meta}>Owner</Typography>
            <Typography
              className={classes.metaValue}
              style={{ display: "flex" }}
            >
              {owner?.[0]?.firstName} {owner?.[0]?.surName}
              {owner?.length > 1 && (
                <div className={classes.extraOwners}>+{owner.length - 1}</div>
              )}
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
            <img src={assets.clipboardIcon} className={`w-16`} alt="" />
            <Typography className={classes.iconText}>
              {tasks} task(s)
            </Typography>
          </div>

          <div className={classes.iconChip}>
            <img src={assets.folderIcon} className={`w-16`} alt="" />
            <Typography className={classes.iconText}>
              {docsCount} doc(s)
            </Typography>
          </div>

          <div className={classes.iconChip}>
            <img src={assets.blueUser} className={`width-16`} alt="" />
            <Typography className={classes.iconText}>{usersCount}</Typography>
          </div>

          <div className={classes.iconChip}>
            <img src={assets.chatIcon} className={`w-16`} alt="" />
            <Typography className={classes.iconText}>{chatCount}</Typography>
          </div>
        </Grid>
      </ProjectCardContain>
    </>
  );
};

export default ProjectCard;

const ProjectCardContain = styled.div`
  margin: 7px 10px;
  max-width: 285px;
  width: 285px;
  padding: 10px 20px;
  background: white;
  cursor: pointer;
  height: 267px;
`;
const ImageCard = styled.div`
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 110px;
  border-radius: 4px;
`;
const Status = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
`;
const useStyles = makeStyles({
  cardOuterWrapper: {
    padding: 5,
    cursor: "pointer",
  },
  wrapper: {
    height: "80%",
  },
  cardWrapper: {
    minHeight: 270,
    height: "100%",
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
    width: "100px",
    padding: "10px 0",
  },
  status: {
    background: colors.darkYellow,
    borderRadius: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "capitalize",
    padding: "2px 5px",
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
    background: "white",
    padding: "3px 5px",
    borderRadius: " 3px",
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
    fontWeight: 600,
    fontSize: 12,
    textTransform: "capitalize",
  },
  title: {
    fontWeight: 700,
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
    height: "20%",
    paddingBottom: 10,
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
    fontWeight: 600,
    paddingLeft: 5,
  },
  extraOwners: {
    background: colors.darkYellow,
    color: colors.white,
    borderRadius: 20,
    height: 15,
    minWidth: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    fontSize: 8,
    fontWeight: 700,
  },
});
