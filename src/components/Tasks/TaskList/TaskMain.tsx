import { useRef, useEffect, useState } from "react";
// mui-imports
import { makeStyles } from "@material-ui/core";
import { Box, Grid, Paper, Typography } from "@mui/material";

// components
import DatePicker from "components/Utills/Inputs/DatePicker";
import SelectDropdown from "components/Utills/Inputs/SelectDropdown";
import StatusMenu from "components/Utills/Others/StatusMenu";
import { TaskInterface } from "constants/interfaces/task.interface";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import TaskList from "./TaskList";
import { IOSSwitch } from "components/Chat/Questioniar/IOSSwitch";

const TaskMain = () => {
  const allTask: TaskInterface[] = useSelector(
    (state: RootState) => state.task.allTask
  );
  let xsPoint = 12;
  let mdPoint = 4;
  let lgPoint = 3.2;
  const classes = useStyles();
  const headerRef: any = useRef();
  // const localized = moment(dueDate, 'DD-MM-YYYY').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ')
  // console.log('localized', localized)

  const [showTaskList, setShowTaskList] = useState<boolean>(false);
  useEffect(() => {
    if (headerRef.current.clientHeight) {
      setTimeout(() => {
        setShowTaskList(true);
      }, 100);
    }
  });

  const getHeaderHeight = () => {
    //headerRef.current
    //console.log(window.innerHeight, headerRef.current.clientHeight + 135);
    let contentHeight =
      window.innerHeight - (headerRef.current.clientHeight + 135);
    return `${contentHeight}px`;
  };
  const options = [
    {
      title: "All",
      count: allTask.length,
    },
    {
      title: "New",
      count: allTask.filter((task) => task.state === "new").length,
    },
    {
      title: "Active",
      count: allTask.filter((task) => task.state === "active").length,
    },

    {
      title: "Done",
      count: allTask.filter((task) => task.state === "done").length,
    },
    {
      title: "Draft",
      count: allTask.filter((task) => task.state === "draft").length,
    },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className={classes.taskMain}>
        <Grid
          container
          spacing={1}
          rowGap={1}
          className={classes.TaskWraper}
          ref={headerRef}
        >
          <Grid
            item
            // xs={xsPoint} md={mdPoint} sm={4} lg={lgPoint}
            sx={{
              height: "38px",
              width: "260px",
            }}
          >
            <DatePicker Datetitle="Date" />
          </Grid>
          <Grid
            item
            sx={{
              height: "38px",
              width: "280px",
            }}
          >
            <SelectDropdown title="Assigned to" />
          </Grid>
          <Grid
            item
            sx={{
              height: "38px",
              width: "280px",
            }}
          >
            <SelectDropdown title="Projects" />
          </Grid>
          <Box
            mt={2}
            gap={2.4}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "baseline",
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginLeft: "20px",
              }}
            >
              <IOSSwitch />
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
              >
                Created by me
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                gap: "10px",
                marginLeft: "20px",
              }}
            >
              <IOSSwitch />
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
              >
                Assigned to me
              </Typography>
            </Grid>
          </Box>
          {/* <Grid  container item xs={xsPoint} md={3} sm= {12} lg={2} gap={2} alignItems='baseline'  className={classes.activeConainer}>
        <CustomizedSwitch
          // onChange={(e:any)=>handleChange(e)}
            label= 'Multi-task' />
            <Box sx={{maxWidth:'20px', width:'100%'}} flex={1}>
            <img src={assets.filterIcon} width='100%' alt=""/>
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

      {showTaskList ? (
        <Box
          sx={{
            height: "100vh",
          }}
        >
          <Grid
            sx={{
              overflowY: "scroll",
              height: "100vh",
            }}
            paddingTop={"20px"}
            paddingBottom={"20px"}
            maxHeight={getHeaderHeight}
            item
            xs={12}
          >
            <TaskList />
          </Grid>
        </Box>
      ) : (
        <div> Loading tasks</div>
      )}
    </>
  );
};

export default TaskMain;

const useStyles = makeStyles({
  statusWrapper: {
    marginTop: "12px",
    "@media(max-width:1024px)": {
      overflowX: "scroll",
    },
  },

  // taskList: {
  //   paddingTop: "10px",
  //   overflowY: "scroll",
  //   // "@media(max-width:1024px)": {

  //   // },
  // },

  TaskWraper: {
    // padding: '0 10px',
    display: "flex",
    alignItems: "center",

    "@media(max-width:1024px)": {
      // color: "red",
      padding: "",
    },
  },
  activeConainer: {
    justifyContent: "space-between",
    // paddingLeft:'0 !important',
    "@media(max-width:1024px)": {
      alignItems: "baseline !important",
      justifyContent: "inherit",
    },
    "@media (max-width:600px)": {
      height: "100%",
    },
  },
  taskMain: {
    overflowY: "hidden",
    alignItems: "center",
    // "@media(max-width:420px)": {

    // },
  },
});
