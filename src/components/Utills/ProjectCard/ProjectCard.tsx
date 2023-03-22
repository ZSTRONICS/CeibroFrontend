import styled from "@emotion/styled";
// import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@mui/material";
import assets from "assets/assets";
import { ProjectInterface } from "constants/interfaces/project.interface";
import { FC } from "react";
import { useDispatch } from "react-redux";
import projectActions from "redux/action/project.action";
import colors from "../../../assets/colors";

import Box from "@mui/material/Box";
import { momentdeDateFormat } from "../Globals/Common";
interface ProjectCardInterface {
  project: ProjectInterface;
}

const ProjectCard: FC<ProjectCardInterface> = (props) => {
  const { project } = props;
  const {
    projectPhoto: src,
    dueDate,
    owner,
    creator,
    isDefault,
    // inDraftState,
    title,
    // tasksCount,
    // docsCount,
    // usersCount,
    // chatCount,
    publishStatus,
    _id,
    createdAt,
  } = project;

  const dispatch = useDispatch();
  const handleProjectClick = () => {
    dispatch(projectActions.setSelectedProject(_id));
    dispatch(projectActions.setProjectOverview(project));
    dispatch(projectActions.openDrawer());
    // dispatch(getProjectDetail({ other: _id }));
  };

  const classes = useStyles();
  const imgSrc = src === "undefined" ? assets.Defaulttask : src;
  const dueDateString: string = String(dueDate)
    .replaceAll("-", ".")
    .replace(",", "");
  // const dueDateString: any = moment(dueDate).format('DD.MM.YYYY')
  const creationDate = momentdeDateFormat(createdAt);

  return (
    <>
      <ProjectCardContain
        style={{ border: "1px solid #6B737A", borderRadius: "5px" }}
        onClick={handleProjectClick}
      >
        <ImageCard>
          <Image src={imgSrc} />
          <Status>
            <div className={classes.status}>
              <Typography className={classes.statusText}>
                {publishStatus}
              </Typography>
            </div>
          </Status>
        </ImageCard>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Grid item width="80px">
            <DueDateTag fontSize="10px" fontWeight={500} color="#605C5C">
              Due date{" "}
            </DueDateTag>
            <DateStringTag fontSize="12px" fontWeight={500}>
              {dueDate !== undefined ? dueDateString : "N/A"}
            </DateStringTag>
          </Grid>
          <Grid item width="90px">
            <DueDateTag fontSize="10px" fontWeight={500} color="#605C5C">
              Created on
            </DueDateTag>
            <DateStringTag fontSize="12px" fontWeight={500}>
              {creationDate}
            </DateStringTag>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          <Grid
            item
            sx={{
              width: "120px",
              // // overflow: "hidden",
              // textOverflow: "ellipsis",
            }}
          >
            <Typography
              fontSize="10px"
              fontWeight={500}
              fontFamily="inter"
              color="#605C5C"
            >
              Owner
            </Typography>
            <Box
              className={classes.metaValue}
              style={{ display: "flex", fontFamily: "inter", fontWeight: 500 }}
            >
              {owner?.[0]?.firstName}
              {/* {owner?.[0]?.surName} */}
              {owner?.length > 1 && (
                <div className={classes.extraOwners}>+{owner.length - 1}</div>
              )}
            </Box>
          </Grid>
          <Grid item width="90px">
            <Typography
              fontSize="10px"
              fontWeight={500}
              fontFamily="inter"
              color="#605C5C"
            >
              Created by
            </Typography>

            <Box
              className={classes.metaValue}
              style={{ display: "flex", fontFamily: "inter", fontWeight: 500 }}
            >
              {creator
                ? `${creator?.firstName}`
                : // ${creator?.surName}
                isDefault === true
                ? `${owner?.[0]?.firstName}`
                : // ${owner?.[0]?.surName}
                  "N/A"}
              {/* {owner?.[0]?.surName} */}

              {/* {owner?.length > 1 && (
                <div className={classes.extraOwners}>+{owner.length - 1}</div>
              )} */}
            </Box>
          </Grid>
        </Grid>

        <Grid item className={classes.title}>
          <TitleWrapper
            fontFamily="inter"
            fontSize="14px"
            fontWeight={700}
            className="ellipsis"
          >
            {title}
          </TitleWrapper>
        </Grid>

        {/* <Grid item xs={12}>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.viewMap}>View map</Typography>
          <hr className={classes.break} />
        </Grid> */}
        {/* <Grid item xs={12} sx={{border:"1px solid"}} className={classes.iconWrapper}>
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
        </Grid> */}
      </ProjectCardContain>
    </>
  );
};

export default ProjectCard;

const ProjectCardContain = styled.div`
  margin: 15px 10px;
  max-width: 285px;
  width: 285px;
  padding: 15px 20px;
  background: white;
  cursor: pointer;
  height: 250px;
`;
const ImageCard = styled.div`
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100px;
  border-radius: 4px;
`;
const Status = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
`;
const DueDateTag = styled(Typography)`
  fontfamily: inter;
  fontsize: 10px;
  fontweight: 500;
  color: #605c5c;
`;
const DateStringTag = styled(Typography)`
  fontfamily: inter;
  color: #000000;
`;
const TitleWrapper = styled(Typography)`
  fontfamily: inter;
  fontweight: 700;
  fontsize: 14px;
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
    // border: `1px solid`,
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
  // createdBy: {
  //   display: "flex",
  //   justifyContent: "spaceBetween",
  //   flexDirection: "row",
  // },
  status: {
    "& .MuiTypography-root": {
      fontSize: "10px",
    },
    background: "#6B737A",
    borderRadius: 4,
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
    fontFamily: "Inter",
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
    fontWeight: 500,
    fontSize: 12,
    fontFamily: "inter",
    color: "#000000",
    textTransform: "capitalize",
  },
  Owner: {
    paddingTop: "5px",
  },
  title: {
    fontWeight: 700,
    fontSize: 14,
    paddingTop: "10px",
    height: "50px",
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
  // // ownerWrapper: {
  // //   ".css-50gs4y-MuiTypography-root": {
  // //     fontSize: "10px",
  // //   },
  // },
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
