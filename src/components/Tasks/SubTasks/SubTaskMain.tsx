// mui-imports
import { makeStyles } from "@material-ui/core";
import { Autocomplete, Box, Grid, Paper, TextField } from "@mui/material";
import CDatePicker from "components/DatePicker/CDatePicker";
import { getUserFormatedDataForAutoComplete } from "components/Utills/Globals/Common";

// components
import InputHOC from "components/Utills/Inputs/InputHOC";
import StatusMenu from "components/Utills/Others/StatusMenu";
import moment from "moment-timezone";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import SubTaskList from "./SubTaskList";

const SubTaskMain = () => {

  const headerRef: any = useRef();
  const classes = useStyles();
  const { allSubTaskList } = useSelector((state: RootState) => state.task);
  const {projectWithMembers ,allProjectsTitles, } = useSelector((store: RootState) => store.project);
  const [filteredData, setFilteredData] = useState(allSubTaskList);
  const { user } = useSelector((state: RootState) => state.auth);
  const [showSubTaskList, setShowSubTaskList] = useState<boolean>(true);
  const [date, setDate] = useState<string>("");
  const [assignToOpt, setAssignToOpt] = useState<any>([]);
  const [assignToList, setAssignToList] = useState<any>([]);
  const [filterParams, setFilterParams] = useState({
    dueDate: "",
    assignedTo: [],
    project: "",
  });

  const projectTitleLocal =allProjectsTitles.map((item:any)=>{
    return{
      _id:item.value, 
      label: item.label
    }
  })

  const fixedOwner= [{
    label: `${user.firstName} ${user.surName}`,
    id:user._id
  }]

  useEffect(() => {
    if (headerRef.current && headerRef.current.clientHeight) {
      setTimeout(() => {
        setShowSubTaskList(true);
      }, 100);
    }
    window.addEventListener("resize", getHeaderHeight);
  });

  useEffect(() => {
    setFilteredData(allSubTaskList);
  }, [allSubTaskList]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  const getSubtaskStateCount = (checkState: any) => {
    let count = 0;
    filteredData.length>0&&filteredData?.forEach((subtask: any) => {
       if(subtask===undefined){
          return
        }
      subtask.state.every((state: any) => {
        if (state.userId === user._id && state.userState === checkState) {
          count += 1;
          return false;
        }
        return true;
      });
    });
    return count;
  };
  const getHeaderHeight = () => {
    let contentHeight: any;
    if (headerRef.current) {
      contentHeight = window.innerHeight - headerRef.current.clientHeight + 500;
    }
    // window.innerHeight - (headerRef.current.clientHeight + 135);
    return `${contentHeight}px`;
  };

  const filterDataOnParams = (params: any) => {
    let filteredDataLocal: any = [...allSubTaskList];
    if (params.dueDate !== "") {
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        let [d1, m1, y1] = String(item.dueDate).split("-");
        let [d2, m2, y2] = String(params.dueDate).split("-");
        return d1 === d2 && m1 === m2 && y1 === y2;
      });
    }
  
    if (String(params.project).length>0) {
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        return String(item?.taskData?.project?._id)=== String(params.project);
      });
    }

    if (params.assignedTo.length>0) {
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        return params.assignedTo.every(({ id }: any) =>
          item.assignedTo.members.find((item: any) => item._id === id)
        );
      });
    }
  
    setFilterParams({ ...params });
    if (
      params.dueDate === "" &&
      params.project===""&&
      params.assignedTo.length === 0
    ) {
      setFilteredData(allSubTaskList);
    } else {
      setFilteredData(filteredDataLocal);
    }
  };

  const handleProjectChange = (project: any) => {
    if (project === null) {
      setAssignToList([]);
      setAssignToOpt([]);
      filterDataOnParams({
        ...filterParams,
        project: "",
        assignedTo: [],
      });
    } else {
      const selectedProject = projectWithMembers.find((proj: any) => String(proj._id) === String(project._id));
      if (String(selectedProject._id)===String(project._id)) {
        const projMembers = getUserFormatedDataForAutoComplete(selectedProject.projectMembers);
        setAssignToOpt([...projMembers, ...fixedOwner]);
        handleUserChange([]); 
        setAssignToList([]);
         filterDataOnParams({
          ...filterParams,
          project: project._id,
        });          
      }
    }
  };

  const handleUserChange = (user: any) => {
    console.log(user);
    setAssignToList([...user]);
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

  const options = [
    {
      title: "All",
      count: filteredData.length,
    },
    {
      title: "Assigned",
      count: getSubtaskStateCount("assigned"),
    },
    {
      title: "Accepted",
      count: getSubtaskStateCount("accepted"),
    },
    {
      title: "Ongoing",
      count: getSubtaskStateCount("ongoing"),
    },
    {
      title: "Rejected",
      count: getSubtaskStateCount("rejected"),
    },
    {
      title: "Done",
      count: getSubtaskStateCount("done"),
    },
    {
      title: "Draft",
      count: getSubtaskStateCount("draft"),
    },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 2, maxHeight: "100%" }}>
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
              width: "100%",
              maxWidth: "350px",
            }}
          >
             <InputHOC title="Project">
              <Autocomplete
                sx={{ width: "100%", marginTop: "5px" }}
                id="assignedTo"
                options={projectTitleLocal}
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
                    name="project"
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
              width: "100%",
              maxWidth: "350px",
            }}
          >
          <InputHOC title="Assigned to">
              <Autocomplete
              filterSelectedOptions
                sx={{ width: "100%", marginTop: "5px" }}
                id="assignedTo"
                disabled={filterParams.project!==""?false:true}
                options={assignToOpt}
                value={assignToList}
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
      <Box
      sx={{
        height: "100vh",
      }}
      >
        <Grid item maxHeight={getHeaderHeight}>
          <SubTaskList results={filteredData} />
        </Grid>
      </Box>
    </>
  );
};

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
