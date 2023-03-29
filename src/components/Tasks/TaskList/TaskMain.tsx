import React, { useRef, useEffect, useState } from "react";
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
import CustomizedSwitch, { IOSSwitch } from "components/Chat/Questioniar/IOSSwitch";
import CDatePicker from "components/DatePicker/CDatePicker";
import InputHOC from "components/Utills/Inputs/InputHOC";
import { getAvailableUsers, getMyConnections } from "redux/action/user.action";
import moment from "moment-timezone";
import { getSelectedProjectMembers, getUserFormatedDataForAutoComplete } from "components/Utills/Globals/Common";

const TaskMain = () => {
  const dispatch = useDispatch()

  const allTask: TaskInterface[] = useSelector((state: RootState) => state.task.allTask);
  const {projectWithMembers ,allProjectsTitles, } = useSelector((store: RootState) => store.project);
  const { user } = useSelector((state: RootState) => state.auth);
  const fixedOwner= [{
    label: `${user.firstName} ${user.surName}`,
    id:user._id
  }]

  const [filteredData, setFilteredData] = useState(allTask);
  const isRenderEffect = useRef<any>(false);
  // const [assignedToMe, setAssignedToMe] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [assignToOpt, setAssignToOpt] = useState<any>([]);

  const [filterParams, setFilterParams] = useState({
    dueDate: "",
    assignedTo: [],
    project: "",
    createdByMe:false,
    assignedToMe:false
  });

  useEffect(() => {
    setFilteredData(allTask);
  }, [allTask]);

  const classes = useStyles();
  const headerRef: any = useRef();

  const [showTaskList, setShowTaskList] = useState<boolean>(false);
  useEffect(() => {
    if (headerRef.current.clientHeight) {
      setTimeout(() => {
        setShowTaskList(true);
      }, 100);
    }
    window.addEventListener('resize', getHeaderHeight)
  });

  const getHeaderHeight = () => {
    let contentHeight =
      window.innerHeight - (headerRef.current.clientHeight + 135);
    return `${contentHeight}px`;
  };
  const options = [
    {
      title: "All",
      count: filteredData.length,
    },
    {
      title: "New",
      count: filteredData.filter((task) => task.state === "new").length,
    },
    {
      title: "Active",
      count: filteredData.filter((task) => task.state === "active").length,
    },

    {
      title: "Done",
      count: filteredData.filter((task) => task.state === "done").length,
    },
    {
      title: "Draft",
      count: filteredData.filter((task) => task.state === "draft").length,
    },
  ];

  const filterDataOnParams = (params: any) => {
    let filteredDataLocal: any = [...allTask];
    if (params.assignedTo.length>0) {
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        return params.assignedTo.every(({ id }: any) =>
          item.assignedTo.find((item: any) => item._id === id)
        );
      });
    }
    if (params.project.length>0) {
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        return String(item.project._id)=== String(params.project);
      });
    }

    if (params.dueDate !== "") {
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        let [d1, m1, y1] = String(item.dueDate).split("-");
        let [d2, m2, y2] = String(params.dueDate).split("-");
        return d1 === d2 && m1 === m2 && y1 === y2;
      });
    }
    if(params.createdByMe===true){
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        return String(item.creator._id)===String(user._id)
      })
    }

    if(params.assignedToMe===true){
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        return item.assignedTo.some((item:any)=> item._id ===String(user._id))
      })
    }

    setFilterParams({ ...params });
    if (
      params.assignedTo.length === 0 &&
      params.dueDate === "" &&
      params.project===""&&
      params.createdByMe===false&&
      params.assignedToMe===false
    ) {
      setFilteredData(allTask);
    } else {
      setFilteredData(filteredDataLocal);
    }
  };
  const handleAssignedToMeChange = (e: any) => {
    if (e.target.checked === false) {
      filterDataOnParams({
        ...filterParams,
        assignedToMe:false,
      });
    }else{
       filterDataOnParams({
      ...filterParams,
      assignedToMe:e.target.checked ,
    });
    }
  }

  const handleCreatedByMeChange = (e: any) => {
    if (e.target.checked === false) {
      filterDataOnParams({
        ...filterParams,
        createdByMe:false,
      });
    }else{
       filterDataOnParams({
      ...filterParams,
      createdByMe:e.target.checked ,
    });
    }
  }
  
  const handleUserChange = (user: any) => {
    if (user.length === 0) {
      filterDataOnParams({
        ...filterParams,
        assignedTo: [],
      });
    } else {
      filterDataOnParams({
        ...filterParams,
        assignedTo: [...user],
      });
    }
  };

  const handleProjectChange = (project: any) => {
    if (project === null) {
      filterDataOnParams({
        ...filterParams,
        project: "",
      });
    } else {
      const projMembersData = getSelectedProjectMembers(project?.value, projectWithMembers)
      const projMembers = getUserFormatedDataForAutoComplete(projMembersData);
      setAssignToOpt([...projMembers, ...fixedOwner]);
      filterDataOnParams({
        ...filterParams,
        project: project.value,
      });
    }
  }

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
            sx={{
              height: "38px",
              width: "260px",
            }}
          >
            <CDatePicker
            IsdisablePast={false}
              showLabel={true}
              componentsProps={{
                actionBar:{
                  actions:['clear']
                }
              }}
              value={date}
              id="date1"
              name="dueDate"
              onChange={(e: any) => {
                const selectedDate = moment(e).format("DD-MM-YYYY");
                if (selectedDate === "Invalid date") {
                  setDate(e);
                  filterDataOnParams({
                    ...filterParams,
                    dueDate: "",
                  });
                } else {
                  setDate(e);
                  filterDataOnParams({
                    ...filterParams,
                    dueDate: selectedDate,
                  });
                }
              }}
            />
          </Grid>
          
          <Grid
            item
            sx={{
              height: "38px",
              width: "350px",
            }}
          >
            <InputHOC title="Project">
              <Autocomplete
                sx={{ width: "100%", marginTop: "5px" }}
                id="assignedTo"
                options={allProjectsTitles}
                isOptionEqualToValue={(option:any,label:any)=> option.label===label}
                size="small"
                onChange={(event, value) => handleProjectChange(value)}
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
                    placeholder="Select project"
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
            {/* <SelectDropdown title="Assigned to" /> */}
            <InputHOC title="Member">
              <Autocomplete
              filterSelectedOptions
                sx={{ width: "100%", marginTop: "5px" }}
                id="assignedTo"
                disabled={filterParams.project!==""?false:true}
                options={assignToOpt}
                size="small"
                multiple={true}
                limitTags={1}
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
                    placeholder="Assigned to member"
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
                '& .MuiTypography-root':{
                  fontSize:'14px !important',
                  fontWeight:'500 !important',
                }
              }}
            >
              <CustomizedSwitch
            onChange={(e:any)=>handleCreatedByMeChange(e)}
            label= 'Created by me'
            />
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                gap: "10px",
                marginLeft: "20px",
                '& .MuiTypography-root':{
                  fontSize:'14px !important',
                  fontWeight:'500 !important',
                }
              }}
            >
               <CustomizedSwitch
            onChange={(e:any)=>handleAssignedToMeChange(e)}
            label= 'Assigned to me'
            />
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
            <TaskList filteredData={filteredData} />
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
