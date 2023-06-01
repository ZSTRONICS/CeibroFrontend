import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid, Typography } from "@mui/material";
import colors from "../../../../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import projectActions, { PROJECT_APIS } from "../../../../redux/action/project.action";
import { RootState } from "../../../../redux/reducers";

const menus = [
  {
    id: 1,
    title: "Overview",
  },
  {
    id: 2,
    title: "Role(s)",
  },
  // {
  //   id: 3,
  //   title: "Role(s)",
  // },
  // {
  //   id: 4,
  //   title: "Group(s)",
  // },
  // {
  //   id: 5,
  //   title: "Members",
  // },

  {
    id: 6,
    title: "Documents",
  },
  // {
  //   id: 6,
  //   title: "Work Profile",
  // },
];

function ProjectDrawerMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { menue: selectedMenue, selectedProject } = useSelector(
    (state: RootState) => state.project
  );

  const handleClick = (id: number, isDisabled: boolean) => {
    if (isDisabled) return;
    dispatch(projectActions.setMenue(id));
  };

  return (
    <>
      {/* <PermissionState> */}
      <Grid
        container
        sx={{
          paddingLeft: "4px",
          "@media(max-width:960px)": {
            paddingLeft: "10px",
            flexWrap: "nowrap",
            overflowX: "scroll",
          },
        }}
      >
        {menus &&
          menus.map((menu, index) => {
            const isDisabled = index > 0 && !selectedProject;
            return (
              <div
                key={index}
                className={`${classes.statusChip}`}
                onClick={() => handleClick(menu.id, isDisabled)}
              >
                <Typography
                  className={classes.menu}
                  style={{
                    fontSize: "15px",
                    fontFamily: "inter",
                    fontWeight: 500,
                    color: isDisabled
                      ? colors.lightGreySecondary
                      : selectedMenue === menu.id
                      ? colors.black
                      : colors.primary,
                  }}
                >
                  {menu.title}
                </Typography>
              </div>
            );
          })}
      </Grid>
      {/* {!isTabletOrMobile && (
        <Grid container className={classes.breakContainer}>
          <HorizontalBreak />
        </Grid>
      )} */}
      {/* </PermissionState> */}
    </>
  );
}

export default ProjectDrawerMenu;

const useStyles = makeStyles({
  statusChip: {
    padding: "10px 10px",
    width: 103,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    "@media (max-width:960px)": {
      justifyContent: "flex-start",
    },
  },
  menu: {
    fontSize: "14px",
    // padding:""
    fontWeight: 600,
    // color: colors.primary,
    color: "red",
    cursor: "pointer",
  },
});
