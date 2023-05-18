import React, { useState, useEffect, useRef } from "react";
import ProjectList from "./ProjectList";
import SelectDropdown, {
  dataInterface,
} from "../../Utills/Inputs/SelectDropdown";
import { makeStyles } from "@material-ui/core";
import { Autocomplete, Grid, TextField } from "@mui/material";
import {
  getColorByStatus,
  // getProjectStatus,
} from "../../../config/project.config";
import { useDispatch, useSelector } from "react-redux";
import colors from "assets/colors";

import {
  getAllProjects,
  getAllProjectsWithMembers,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import { getAvailableUsers } from "redux/action/user.action";
import CDatePicker from "components/DatePicker/CDatePicker";
import moment from "moment-timezone";
import InputHOC from "components/Utills/Inputs/InputHOC";
import '../../../components/MuiStyles.css'
const Project = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isRenderEffect = useRef<any>(false);
  const headerRef: any = useRef();
  const [data, setData] = useState<dataInterface[]>([]);
  const { allProjects } = useSelector((state: RootState) => state.project);
  const [filteredData, setFilteredData] = useState(allProjects);

  // if (window.location.pathname.includes("projects")) {
  //   document.body.style.background = "#f5f7f8";
  // }

  const [date, setDate] = useState<string>("");
  const projectPublishStatusLocal = allProjects.map((item: any, index: any) => {
    return {
      label: item.publishStatus,
      value: index,
    };
  });
  // get the unique labels object
  const getUniqueLabels = (arr: any[]) => {
    let uniqueLabels = Object.values(
      arr.reduce((acc: any, labelObj: any) => {
        if (labelObj.label === undefined) {
        } else {
          if (!acc[labelObj.label]) {
            acc[labelObj.label] = labelObj;
          }
        }
        return acc;
      }, {})
    );
    return uniqueLabels;
  };

  const uniqueLabels = getUniqueLabels(projectPublishStatusLocal);
  const [allProjectPublishStatus, setAllProjetStatus] = useState([
    ...uniqueLabels,
  ]);

  useEffect(() => {
    if (isRenderEffect.current === false) {
      dispatch(getAllProjects());
      // dispatch(getAllProjectsWithMembers());
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
    setFilteredData(allProjects);
    setAllProjetStatus(uniqueLabels);
  }, [allProjects]);

  const [filterParams, setFilterParams] = useState({
    owner: [],
    dueDate: "",
    publishStatus: "",
  });

  const filterDataOnParams = (params: any) => {
    let filteredDataLocal: any = [...allProjects];
    if (params.owner.length > 0) {
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        return item.owner.some((o: any) => params.owner.includes(o._id));
      });

      setAllProjetStatus(
        filteredDataLocal.map((item: any, index: any) => {
          return {
            label: item.publishStatus,
            value: index,
          };
        })
      );
    }

    if (params.dueDate !== "") {
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        let [d1, m1, y1] = String(item.dueDate).split("-");
        let [d2, m2, y2] = String(params.dueDate).split("-");
        return d1 === d2 && m1 === m2 && y1 === y2;
      });
    }

    if (params.publishStatus !== "") {
      filteredDataLocal = filteredDataLocal.filter((item: any) => {
        return (
          String(item.publishStatus).toLowerCase() ===
          String(params.publishStatus).toLowerCase()
        );
      });
    }

    setFilterParams({ ...params });
    if (
      params.owner.length === 0 &&
      params.dueDate === "" &&
      params.publishStatus === ""
    ) {
      setFilteredData(allProjects);
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

  const [showProjectList, setShowProjectList] = useState<boolean>(false);

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
        window.innerHeight - (headerRef.current.clientHeight + 105);
      const height = `${contentHeight}px`;
      setHeaderHeight(height);
      if (showProjectList === false) {
        setShowProjectList(true);
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

  return (
    <></>
    // <>
    //   <Grid item xs={12}>
    //     {/* {loading && <CircularProgress size={20} className={classes.progress} />} */}
    //     <Grid container ref={headerRef} className={classes.outerWrapper}>
    //       <Grid
    //         item
    //         sx={{ width: "100%", maxWidth: "240px", height: "40px" }}
    //       >
    //         <CDatePicker
    //           IsdisablePast={false}
    //           showLabel={true}
    //           componentsProps={{
    //             actionBar: {
    //               actions: ["clear"],
    //             },
    //           }}
    //           value={date}
    //           id="date1"
    //           name="dueDate"
    //           onChange={(e: any) => {
    //             const selectedDate = moment(e).format("DD-MM-YYYY");
    //             if (selectedDate === "Invalid date") {
    //               setDate(e);
    //               filterDataOnParams({
    //                 ...filterParams,
    //                 dueDate: "",
    //               });
    //             } else {
    //               setDate(e);
    //               filterDataOnParams({
    //                 ...filterParams,
    //                 dueDate: selectedDate,
    //               });
    //             }
    //           }}
    //         />
    //       </Grid>

    //       <Grid
    //         item
    //         sx={{ width: "100%", maxWidth: "450px", height: "40px" }}
    //         className={classes.datePicker}
    //       >
    //         <InputHOC title="Owner">
    //           <Autocomplete
    //           className="autocompleteContainer"
    //             disablePortal
    //             sx={{ width: "100%" }}
    //             id="project_members1"
    //             options={data}
    //             size="small"
    //             onChange={(event, value) => handleUserChange(value)}
    //             renderInput={(params) => (
    //               <TextField
    //                 sx={{
    //                   "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
    //                     border: "none",
    //                     padding: "0px",
    //                   },
    //                 }}
    //                 {...params}
    //                 name="owner"
    //                 placeholder="Select owner"
    //               />
    //             )}
    //           />
    //         </InputHOC>
    //       </Grid>

    //       <Grid
    //         item
    //         sx={{ width: "100%", maxWidth: "350px", height: "40px" }}
    //         className={classes.datePicker}
    //       >
       
    //         <InputHOC title="Status">
    //           <Autocomplete
    //           className="autocompleteContainer"
    //             disablePortal
    //             sx={{ width: "100%" }}
    //             // multiple={false}
    //             id="project_members1"
    //             // filterSelectedOptions
    //             options={getUniqueLabels(allProjectPublishStatus)}
    //             size="small"
    //             onChange={(event, value: any) => {
    //               if (value === null) {
    //                 filterDataOnParams({
    //                   ...filterParams,
    //                   publishStatus: "",
    //                 });
    //               } else {
    //                 filterDataOnParams({
    //                   ...filterParams,
    //                   publishStatus: value.label,
    //                 });
    //               }
    //             }}
    //             renderInput={(params) => (
    //               <TextField
    //                 className={classes.underline}
    //                 sx={{
    //                   "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
    //                     border: "none",
    //                     padding: "0px",
    //                   },
    //                 }}
    //                 {...params}
    //                 name="status"
    //                 placeholder="Select status"
    //               />
    //             )}
    //           />
    //         </InputHOC>
    //       </Grid>
    //     </Grid>

    //     <Grid container className={classes.allStatus}>
    //       {/* <StatusMenu options={allStatus} /> */}
    //       {/* <StatusMenu /> */}
    //     </Grid>
    //   </Grid>
    //   {showProjectList === true ? (
    //     <Grid
    //       item
    //       // className={classes.TaskListMain}
    //       sx={{
    //         overflowY: "auto",
    //       }}
    //       maxHeight={headerHeight}
    //     >
    //       <ProjectList allProjects={filteredData} />
    //     </Grid>
    //   ) : (
    //     <div> Loading projects....</div>
    //   )}
    // </>
  );
};

export default Project;

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  },
  outerWrapper: {
    display: "flex",
    alignItems: "baseline",
    gap: "25px",
  },
  datePicker: {
    padding: 5,
  },
  allStatus: {
    padding: "10px 5px",
  },
  statusChip: {
    padding: "10px 10px",
    width: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  ongoing: {
    background: getColorByStatus("ongoing"),
  },

  completed: {
    background: getColorByStatus("completed"),
  },
  draft: {
    background: getColorByStatus("draft"),
  },
  approved: {
    background: getColorByStatus("approved"),
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    marginTop: "300px",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
  // TaskListMain: {
  //   "@media(max-width:754px)": {
  //     height: "560px",
  //     overflow: "auto",
  //   },
  //   "@media(max-width:1321px)": {
  //     height: "615px",
  //     overflow: "auto",
  //   },
  //   "@media(max-width:1870px)": {
  //     height: "680px",
  //     overflow: "auto",
  //   },
  //   // "@media(max-width:2560px)": {
  //   //   height: "780px",
  //   //   overflow: "auto",
  //   // },
  // },
});
