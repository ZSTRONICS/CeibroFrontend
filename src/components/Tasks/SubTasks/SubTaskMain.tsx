// mui-imports
import { makeStyles } from "@material-ui/core";
import { Autocomplete, Box, Grid, Paper, TextField } from "@mui/material";
import CustomizedSwitch from "components/Chat/Questioniar/IOSSwitch";
import CDatePicker from "components/DatePicker/CDatePicker";
import { getUserFormatedDataForAutoComplete } from "components/Utills/Globals/Common";

// components
import InputHOC from "components/Utills/Inputs/InputHOC";
import StatusMenu from "components/Utills/Others/StatusMenu";
import { SubtaskInterface } from "constants/interfaces/subtask.interface";
import moment from "moment-timezone";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import SubTaskList from "./SubTaskList";
import '../../../components/MuiStyles.css'

const SubTaskMain = () => {
  const headerRef: any = useRef();
  const classes = useStyles();
  const { allSubTaskList } = useSelector((state: RootState) => state.task);
  const { projectWithMembers, allProjectsTitles } = useSelector(
    (store: RootState) => store.project
  );
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
    createdByMe: false,
    assignedToMe: false,
  });

  const projectTitleLocal = allProjectsTitles.map((item: any) => {
    return {
      _id: item.value,
      label: item.label,
    };
  });

  const fixedOwner = [
    {
      label: `${user.firstName} ${user.surName}`,
      id: user._id,
    },
  ];

  useEffect(() => {
    setFilteredData(allSubTaskList);
  }, [allSubTaskList]);

  const getSubtaskStateCount = (checkState: any) => {
    let count = 0;
    filteredData.length > 0 &&
      filteredData?.forEach((subtask: any) => {
        if (subtask === undefined) {
          return;
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

  const [headerHeight, setHeaderHeight] = useState<string>("");
  let isTimeOut: NodeJS.Timeout;
  useEffect(() => {
    if (headerRef.current && headerRef.current.clientHeight) {
      getHeaderHeight();
    } else {
      windowResized();
    }
    window.addEventListener("resize", windowResized);
  });

  const windowResized = () => {
    setTimeout(() => {
      getHeaderHeight();
    }, 50);
  };

  const getHeaderHeight = () => {
    if (headerRef.current && headerRef.current.clientHeight) {
      let contentHeight =
        window.innerHeight - (headerRef.current.clientHeight + 140);
      const height = `${contentHeight}px`;
      setHeaderHeight(height);
      if (showSubTaskList === false) {
        setShowSubTaskList(true);
      }
      if(isTimeOut && isTimeOut.hasRef()){
        isTimeOut.unref();
      }
    } else {
      if (!isTimeOut || !isTimeOut.hasRef()) {
        isTimeOut = setTimeout(() => {
          getHeaderHeight();
        }, 50);
      }else{
        isTimeOut.refresh()
      }
    }
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

    if (String(params.project).length > 0) {
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        return String(item?.taskData?.project?._id) === String(params.project);
      });
    }

    if (params.assignedTo.length > 0) {
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        let localMembers = item.assignedTo
          .map((item: any) => item.members)
          .flat();
        return params.assignedTo.every(({ id }: any) =>
          localMembers.find((item: any) => String(item._id) === String(id))
        );
      });
    }

    if (params.createdByMe === true) {
      filteredDataLocal = filteredDataLocal.filter(
        (subtask: SubtaskInterface) => {
          return String(subtask.creator._id) === String(user._id);
        }
      );
    }

    if (params.assignedToMe === true) {
      filteredDataLocal = filteredDataLocal.filter(
        (subtask: SubtaskInterface) => {
          let localMembers = subtask.assignedTo
            .map((item: any) => item.members)
            .flat();
          return localMembers.some(
            (item: any) => item._id === String(user._id)
          );
        }
      );
    }

    setFilterParams({ ...params });
    if (
      params.dueDate === "" &&
      params.project === "" &&
      params.assignedTo.length === 0 &&
      params.createdByMe === false &&
      params.assignedToMe === false
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
      const selectedProject = projectWithMembers.find(
        (proj: any) => String(proj._id) === String(project._id)
      );
      if (String(selectedProject._id) === String(project._id)) {
        const projMembers = getUserFormatedDataForAutoComplete(
          selectedProject.projectMembers
        );
        setAssignToOpt([...projMembers, ...fixedOwner]);
        setAssignToList([]);
        filterParams.assignedTo = [];
        filterDataOnParams({
          ...filterParams,
          project: project._id,
        });
      }
    }
  };

  const handleAssignedToMeChange = (e: any) => {
    if (e.target.checked === false) {
      filterDataOnParams({
        ...filterParams,
        assignedToMe: false,
      });
    } else {
      filterDataOnParams({
        ...filterParams,
        assignedToMe: e.target.checked,
      });
    }
  };

  const handleCreatedByMeChange = (e: any) => {
    if (e.target.checked === false) {
      filterDataOnParams({
        ...filterParams,
        createdByMe: false,
      });
    } else {
      filterDataOnParams({
        ...filterParams,
        createdByMe: e.target.checked,
      });
    }
  };

  const handleUserChange = (user: any) => {
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
      <Box>
        <Grid
          container
          spacing={1}
          className={classes.TaskWraper}
          rowGap={1}
          ref={headerRef}>

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
                actionBar: {
                  actions: ["clear"],
                },
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
              className="autocompleteContainer"
                sx={{ width: "100%" }}
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
                sx={{ width: "100%" }}
                id="assignedTo"
                disabled={filterParams.project !== "" ? false : true}
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

          <Box
            // mt={1}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "baseline",
            }}
          >
            <Grid
              item
              sx={{
                // gap: "10px",
                // paddingLeft: "20px",
                // "@media (max-width:800px)": {
                //   marginLeft: "0px",
                // },
                "& .MuiTypography-root": {
                  fontSize: "14px !important",
                  fontWeight: "500 !important",
                },
              }}
            >
              <CustomizedSwitch
                onChange={(e: any) => handleCreatedByMeChange(e)}
                label="Created by me"
              />
            </Grid>
            <Grid
              item
              sx={{
                // display: "flex",
                // textAlign: "center",
                // justifyContent: "center",
                // gap: "10px",
                // marginLeft: "20px",
                "& .MuiTypography-root": {
                  fontSize: "14px !important",
                  fontWeight: "500 !important",
                },
              }}
            >
              <CustomizedSwitch
                onChange={(e: any) => handleAssignedToMeChange(e)}
                label="Assigned to me"
              />
            </Grid>
          </Box>

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

      {showSubTaskList && (
        <Box>
          <Grid
            item
            maxHeight={headerHeight}
            overflow={"auto"}
          >
            <SubTaskList results={filteredData} />
          </Grid>
        </Box>
      )}
    </>
  );
};

export default SubTaskMain;

const useStyles = makeStyles({
  statusWrapper: {
    marginTop: "12px",
    "@media(max-width:1024px)": {
      overflowX: "auto",
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
