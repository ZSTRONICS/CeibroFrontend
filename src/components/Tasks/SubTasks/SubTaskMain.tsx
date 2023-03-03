// mui-imports
import { makeStyles } from "@material-ui/core";
import { Box, Grid, Paper } from "@mui/material";

// components
import DatePicker from "components/Utills/Inputs/DatePicker";
import SelectDropdown from "components/Utills/Inputs/SelectDropdown";
import StatusMenu from "components/Utills/Others/StatusMenu";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import SubTaskList from "./SubTaskList";

const SubTaskMain = () => {
  const { allSubTaskList } = useSelector((state: RootState) => state.task);

  let xsPoint = 12;
  let mdPoint = 4;
  let lgPoint = 3.2;
  const classes = useStyles();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <>
      <Box
      // sx={{ flexGrow: 1, maxHeight: "100%" }}
      >
        <Grid container spacing={1} className={classes.TaskWraper} rowGap={1}>
          <Grid
            item
            sx={{
              height: "38px",
              width: "100%",
              maxWidth: "280px",
            }}
            // xs={xsPoint} md={mdPoint} sm={4} lg={lgPoint}
          >
            <DatePicker Datetitle="Date" />
          </Grid>
          <Grid
            item
            sx={{
              height: "38px",
              width: "100%",
              maxWidth: "350px",
            }}
          >
            <SelectDropdown title="Assigned to" />
          </Grid>
          <Grid
            item
            sx={{
              height: "38px",
              width: "100%",
              maxWidth: "350px",
            }}
          >
            <SelectDropdown title="Projects" />
          </Grid>
          {/* <Grid
            container
            item
            xs={xsPoint}
            md={3}
            sm={12}
            lg={2}
            gap={2}
            alignItems="baseline"
            className={classes.activeConainer}
          >
            <CustomizedSwitch
              // onChange={(e:any)=>handleChange(e)}
              label="Multi-task"
            />
            <Box sx={{ maxWidth: "20px", width: "100%" }} flex={1}>
              <img src={assets.filterIcon} width="100%" alt="" />
            </Box>
          </Grid> */}
          <Grid item xs={12} pt={0}>
            <Paper
              className={classes.statusWrapper}
              sx={{
                display: "flex",
                "&.MuiPaper-root": { padding: "7px 0 7px 5px" },
              }}
              elevation={0}
              variant="outlined"
            >
              <StatusMenu options={options} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <SubTaskList results={allSubTaskList} />
      </Box>
    </>
  );
};

const options = [
  {
    title: "All",
    count: 10,
  },
  {
    title: "Assigned",
    count: 2,
  },
  {
    title: "Accepted",
    count: 2,
  },
  {
    title: "Ongoing",
    count: 2,
  },
  {
    title: "Rejected",
    count: 4,
  },
  {
    title: "Done",
    count: 1,
  },
  {
    title: "Draft",
    count: 1,
  },
];

export default SubTaskMain;

const useStyles = makeStyles({
  statusWrapper: {
    marginTop: "12px",
    "@media(max-width:1024px)": {
      overflowX: "scroll",
    },
  },
  // subTaskMainContainer: {
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "center",
  // },
  TaskWraper: {
    // padding: "0 10px",
    "@media(max-width:1024px)": {
      padding: "",
    },
  },
  // activeConainer: {
  //   justifyContent: "space-between",
  //   paddingLeft: "0 !important",
  //   "@media(max-width:1024px)": {
  //     alignItems: "baseline !important",
  //     justifyContent: "inherit",
  //   },
  // },
  // subtaskMain: {
  //   "@media (max-width:600px)": {
  //     height: "100vh",
  //     overflowY: "hidden",
  //     marginTop: "500px",
  //   },
  // },
});
