import { useRef, useEffect, useState } from "react";
// mui-imports
import { makeStyles } from "@material-ui/core";
import { Autocomplete, Box, Grid, Paper, TextField, Typography } from "@mui/material";

// components
import DatePicker from "components/Utills/Inputs/DatePicker";
import SelectDropdown, { dataInterface } from "components/Utills/Inputs/SelectDropdown";
import StatusMenu from "components/Utills/Others/StatusMenu";
import { TaskInterface } from "constants/interfaces/task.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import TaskList from "./TaskList";
import { IOSSwitch } from "components/Chat/Questioniar/IOSSwitch";
import CDatePicker from "components/DatePicker/CDatePicker";
import InputHOC from "components/Utills/Inputs/InputHOC";
import { getAvailableUsers } from "redux/action/user.action";

const TaskMain = () => {
  const dispatch = useDispatch()

  const allTask: TaskInterface[] = useSelector((state: RootState) => state.task.allTask);
  const [filteredData, setFilteredData] = useState(allTask);
  const isRenderEffect = useRef<any>(false);
  const [data, setData] = useState<dataInterface[]>([]);

  useEffect(() => {
    if (isRenderEffect.current === false) {
      const payload = {
        success: (res: any) => {
          setData(res.data);
        },
      };
      dispatch(getAvailableUsers(payload));
    }
    return () => {
      isRenderEffect.current = true;
    };
  }, []);
  useEffect(() => {
    setFilteredData(allTask);
  }, [allTask]);

  const [filterParams, setFilterParams] = useState({
    dueDate: "",
    assignedTo: [],
    project: [],
    createdByMe:false,
    assignedToMe:false
  });

  console.log('allTask',allTask);

  // let xsPoint = 12;
  // let mdPoint = 4;
  // let lgPoint = 3.2;
  const classes = useStyles();
  const headerRef: any = useRef();
  // const localized = moment(dueDate, 'DD-MM-YYYY').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ')

  const [showTaskList, setShowTaskList] = useState<boolean>(false);
  useEffect(() => {
    if (headerRef.current.clientHeight) {
      setTimeout(() => {
        setShowTaskList(true);
      }, 100);
    }
    window.addEventListener("resize", getHeaderHeight);
  });

  const getHeaderHeight = () => {
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
  const filterDataOnParams = (params: any) => {
    let filteredDataLocal: any = [...allTask];
    if (params.assignedTo.length > 0) {
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        return item.assignedTo.some((o: any) => params.assignedTo.includes(o._id));
      });
    }

    if (params.dueDate !== "") {
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        let [d1, m1, y1] = String(item.dueDate).split("-");
        let [d2, m2, y2] = String(params.dueDate).split("-");
        return d1 === d2 && m1 === m2 && y1 === y2;
      });
    }

    setFilterParams({ ...params });
    if (
      params.assignedTo.length === 0 &&
      params.dueDate === "" 
    ) {
      setFilteredData(allTask);
    } else {
      setFilteredData(filteredDataLocal);
    }
  };

  const handleUserChange = (user: any) => {
    if (user === null) {
      filterDataOnParams({
        ...filterParams,
        owner: [],
      });
    } else {
      filterDataOnParams({
        ...filterParams,
        owner: user.value,
      });
    }
  };
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
            <CDatePicker
              showLabel={true}
              required
              // value={showDate}
              id="date1"
              name="dueDate"
              // onChange={(e: any) => {
              //   setShowDate(e);
              //   projectOverview.dueDate = moment(e).format("DD-MM-YYYY");
              // }}
            />
            {/* <DatePicker Datetitle="Date" /> */}
          </Grid>
          <Grid
            item
            sx={{
              height: "38px",
              width: "350px",
            }}
          >
            {/* <SelectDropdown title="Assigned to" /> */}
            <InputHOC title="Assigned to">
              <Autocomplete
                // disablePortal
                sx={{ width: "100%", marginTop: "5px" }}
                // multiple={false}
                id="project_members1"
                // filterSelectedOptions
                options={data}
                size="small"
                onChange={(event, value) => handleUserChange(value)}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        padding: "0px",
                      },
                    }}
                    {...params}
                    name="assignedTo"
                    placeholder="Assigned to"
                  />
                )}
              />
            </InputHOC>

          </Grid>
          <Grid
            item
            sx={{
              height: "38px",
              width: "350px",
            }}
          >
            {/* <SelectDropdown title="Projects" /> */}
            <InputHOC title="Project">
              <Autocomplete
                // disablePortal
                sx={{ width: "100%", marginTop: "5px" }}
                // multiple={false}
                id="project_1"
                // filterSelectedOptions
                options={data}
                size="small"
                onChange={(event, value) => handleUserChange(value)}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        padding: "0px",
                      },
                    }}
                    {...params}
                    name="project"
                    placeholder="Project"
                  />
                )}
              />
            </InputHOC>
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
              <StatusMenu
                options={options}
                // showZero={true}
              />
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
