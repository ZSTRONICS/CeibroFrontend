// import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
// import CDatePicker from "components/DatePicker/CDatePicker";
// import InputText from "components/Utills/Inputs/InputText";
// import { getStatusDropdown } from "config/project.config";
// import { formatDate } from "helpers/project.helper";
// import _ from "lodash";
// import moment from "moment-timezone";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import projectActions, { getProjectDetail } from "redux/action/project.action";
// import { getAvailableUsers } from "redux/action/user.action";
// import { RootState } from "redux/reducers";
// import colors from "../../../../../assets/colors";
// import CreatableSelect from "../../../../Utills/Inputs/CreateAbleSelect2";
// import ImagePicker from "../../../../Utills/Inputs/ImagePicker";
// import SelectDropdown, {
//   dataInterface,
// } from "../../../../Utills/Inputs/SelectDropdown";
// import HorizontalBreak from "../../../../Utills/Others/HorizontalBreak";
// import CreateProjectStatus from "./CreateProjectStatus";
// import ProjectOverViewForm from "./ProjectOverViewForm";

// const ProjectOverview = () => {
//   const classes = useStyles();
//   const projectOverview = useSelector(
//     (state: RootState) => state.project.projectOverview
//   );
//   const selectedProject = useSelector(
//     (state: RootState) => state.project.selectedProject
//   );
//   const { user } = useSelector((state: RootState) => state.auth);
//   const [data, setData] = useState<dataInterface[]>([]);
//   const [showDate, setShowDate] = useState<any>(
//     projectOverview && projectOverview.dueDate
//   );
//   const [loading, setLoading] = useState<boolean>(false);
//   const [doOnce, setDoOnce] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (selectedProject) {
//       const payload = {
//         finallyAction: () => {
//           setLoading(false);
//         },
//         other: selectedProject,
//       };
//       setLoading(true);
//       dispatch(getProjectDetail(payload));
//     }
//   }, []);

//   useEffect(() => {
//     const payload = {
//       other: true,
//       success: (res: any) => {
//         setData(res.data);
//         // setting current user as default owner
//         res?.data?.map((row: dataInterface) => {
//           if (row?.value === user?._id) {
//             if (!selectedProject) {
//               dispatch(
//                 projectActions.setProjectOverview({
//                   ...projectOverview,
//                   owner: [...(projectOverview?.owner || []), row],
//                 })
//               );
//             }
//           }
//         });
//       },
//     };
//     dispatch(getAvailableUsers(payload));
//   }, []);

//   // const handleDateChange = (e: any) => {
//   //   const date = e?.target?.value
//   //   console.log('date',date);

//   //   date &&
//   //     dispatch(
//   //       projectActions.setProjectOverview({
//   //         ...projectOverview,
//   //         dueDate: date,
//   //       })
//   //     )
//   // }

//   const handleOwnerChange = (users: dataInterface[]) => {
//     users &&
//       dispatch(
//         projectActions.setProjectOverview({
//           ...projectOverview,
//           owner: users,
//         })
//       );
//   };

//   const handleStatusChange = (status: dataInterface) => {
//     status?.value &&
//       dispatch(
//         projectActions.setProjectOverview({
//           ...projectOverview,
//           publishStatus: status.value,
//         })
//       );
//   };

//   // const my = formatDate(projectOverview?.dueDate)
//   const statusData = getStatusDropdown();
//   const statusValue = projectOverview?.publishStatus
//     ? {
//         label: projectOverview?.publishStatus,
//         value: projectOverview?.publishStatus,
//       }
//     : null;

//   // console.log('statusValue--->',statusValue);

//   if (doOnce) {
//     projectOverview.dueDate = moment(showDate).format("YYYY-MM-DD");
//     setDoOnce(false);
//   }
//   //  const newArray = Array.from(
//   //    new Set(projectOverview?.owner?.map((el: any) => JSON.stringify(el)))
//   //  ).map((el: any) => JSON.parse(el));

//   const ProjectOwnerList = projectOverview?.owner?.reduce?.(
//     (acc: any, current: any) => {
//       const x = acc.find((item: any) => item.value === current.value);
//       if (!x) {
//         return acc.concat([current]);
//       } else {
//         return acc;
//       }
//     },
//     []
//   );

//   const handleTitleChange = (e: any) => {
//     dispatch(
//       projectActions.setProjectOverview({
//         ...projectOverview,
//         title: e.target.value,
//       })
//     );
//   };
//   const handleLocationChange = (e: any) => {
//     dispatch(
//       projectActions.setProjectOverview({
//         ...projectOverview,
//         location: e.target.value,
//       })
//     );
//   };

//   const isDisabled = !_.map(ProjectOwnerList, "value").includes(user._id);

//   return (
//     <div style={{ width: "100%" }}>
//       <Grid container spacing={3} className={classes.mainWrapper}>
//         {loading && <CircularProgress size={20} className={classes.progress} />}

//         <Grid
//           item
//           // sx={{ maxWidth: "240px",width:"100%", }}
//           xs={10}
//           sm={6}
//           md={2}
//         >
//           {/* <DatePicker value={my} onChange={handleDateChange} /> */}
//           <CDatePicker
//             showLabel={true}
//             required
//             value={showDate}
//             id="date1"
//             name="dueDate"
//             onChange={(e: any) => {
//               setShowDate(e);
//               projectOverview.dueDate = moment(e).format("YYYY-MM-DD");
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={5} className={classes.datePickerWrapper}>
//           <SelectDropdown
//             handleChange={handleOwnerChange}
//             data={data}
//             value={ProjectOwnerList}
//             title="Owner"
//             isMulti={true}
//             // isDisabled={isDisabled}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={3} className={classes.datePickerWrapper}>
//           {/* <CreatableSelect
//             handleChange={handleStatusChange}
//             data={statusData}
//             value={statusValue}
//             title="Status"
//           /> */}
//           <CreateProjectStatus />
//         </Grid>

//         <Grid item xs={12} md={12} style={{ padding: "20px 5px" }}>
//           <HorizontalBreak color={colors.grey} />
//         </Grid>
//       </Grid>

//       <Grid container className={classes.secondForm}>
//         <Grid
//           item
//           // xs={12} md={2}
//           className={classes.imagePicker}
//         >
//           <ImagePicker />
//         </Grid>

//         <Grid item className={classes.inputWrapper}>
//           <Grid
//             item
//             // xs={12}
//             // sm={12}
//             // md={9}
//             style={{
//               width: "100%",
//               maxWidth: "800px",
//             }}
//           >
//             <InputText
//               onChange={handleTitleChange}
//               name="title"
//               placeholder="Enter Project title"
//               value={projectOverview.title || ""}
//               disabled={projectOverview.isDefault ? true : false}
//             />
//           </Grid>

//           <Grid
//             item
//             // xs={12}
//             sm={12}
//             md={9}
//             style={{
//               width: "100%",
//               maxWidth: "800px",
//             }}
//           >
//             <InputText
//               onChange={handleLocationChange}
//               name="location"
//               placeholder="Enter a location address"
//               value={projectOverview.location || ""}
//             />
//           </Grid>
//         </Grid>

//         <Grid
//           item
//           xs={12}
//         >
//           <ProjectOverViewForm />
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default ProjectOverview;

// const useStyles = makeStyles({
//   // mainWrapper: {
//   //   "@media(max-width:520px)": {
//   //     overFlowY: "auto",
//   //   },
//   // },
//   datePickerWrapper: {
//     paddingLeft: "25px",
//     "@media (max-width:600px)": {
//       paddingLeft: 0,
//       paddingTop: 20,
//     },
//   },
//   inputWrapper: {
//     display: "flex",
//     gap: "20px",
//     flexDirection: "column",
//     marginTop: "15px",
//     width: "100%",
//     maxWidth: "800px",
//     paddingLeft: "40px",
//     "@media(max-width:1125px)": {
//       paddingLeft: "0px",
//     },
//   },
//   secondForm: {
//     paddingTop: "0px",
//     display: "flex",
//   },
//   imagePicker: {
//     height: "120px",
//     paddingLeft: "45px",
//     paddingBottom: 10,
//     "@media (max-width:600px)": {
//       paddingBottom: 20,
//     },
//   },

//   progress: {
//     color: colors.primary,
//     position: "absolute",
//     zIndex: 1,
//     margin: "auto",
//     marginTop: "300px",
//     left: 0,
//     right: 0,
//     top: 10,
//     textAlign: "center",
//   },
// });

import { CircularProgress, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import { display } from "@material-ui/system";
import CDatePicker from "components/DatePicker/CDatePicker";
import { getStatusDropdown } from "config/project.config";
import { formatDate } from "helpers/project.helper";
import _ from "lodash";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions, { getProjectDetail } from "redux/action/project.action";
import { getAvailableUsers } from "redux/action/user.action";
import { RootState } from "redux/reducers";
import colors from "../../../../../assets/colors";
import CreatableSelect from "../../../../Utills/Inputs/CreateAbleSelect2";
import ImagePicker from "../../../../Utills/Inputs/ImagePicker";
import SelectDropdown, {
  dataInterface,
} from "../../../../Utills/Inputs/SelectDropdown";
import HorizontalBreak from "../../../../Utills/Others/HorizontalBreak";
import ProjectOverViewForm from "./ProjectOverViewForm";

const ProjectOverview = () => {
  const classes = useStyles();
  const projectOverview = useSelector(
    (state: RootState) => state.project.projectOverview
  );
  const selectedProject = useSelector(
    (state: RootState) => state.project.selectedProject
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<dataInterface[]>([]);
  // const localized = momentdeDateFormat(projectOverview.dueDate);

  const [showDate, setShowDate] = useState<any>(projectOverview.dueDate);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedProject) {
      const payload = {
        finallyAction: () => {
          setLoading(false);
        },
        other: selectedProject,
      };
      setLoading(true);
      dispatch(getProjectDetail(payload));
    }
  }, [selectedProject]);

  useEffect(() => {
    const payload = {
      other: true,
      success: (res: any) => {
        setData(res.data);
        // setting current user as default owner
        res?.data?.map((row: dataInterface) => {
          if (row?.value === user?._id) {
            if (!selectedProject) {
              dispatch(
                projectActions.setProjectOverview({
                  ...projectOverview,
                  owner: [...(projectOverview?.owner || []), row],
                })
              );
            }
          }
        });
      },
    };
    dispatch(getAvailableUsers(payload));
  }, []);

  // const handleDateChange = (e: any) => {
  //   const date = e?.target?.value
  //   console.log('date',date);

  //   date &&
  //     dispatch(
  //       projectActions.setProjectOverview({
  //         ...projectOverview,
  //         dueDate: date,
  //       })
  //     )
  // }

  const handleOwnerChange = (users: dataInterface[]) => {
    users &&
      dispatch(
        projectActions.setProjectOverview({
          ...projectOverview,
          owner: users,
        })
      );
  };

  const handleStatusChange = (status: dataInterface) => {
    status?.value &&
      dispatch(
        projectActions.setProjectOverview({
          ...projectOverview,
          publishStatus: status.value,
        })
      );
  };

  const my = formatDate(projectOverview?.dueDate);
  const statusData = getStatusDropdown();
  const statusValue = projectOverview?.publishStatus
    ? {
        label: projectOverview?.publishStatus,
        value: projectOverview?.publishStatus,
      }
    : null;

  //  const newArray = Array.from(
  //    new Set(projectOverview?.owner?.map((el: any) => JSON.stringify(el)))
  //  ).map((el: any) => JSON.parse(el));

  const ProjectOwnerList = projectOverview?.owner?.reduce?.(
    (acc: any, current: any) => {
      const x = acc.find((item: any) => item.value === current.value);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    },
    []
  );

  const isDisabled = !_.map(ProjectOwnerList, "value").includes(user._id);

  return (
    <div style={{ width: "100%" }}>
      <Grid container  gap={2}>
        {loading && <CircularProgress size={20} className={classes.progress} />}

        <Grid
          item
          sx={{ maxWidth: "240px",width:"100%", }}
          xs={12}
          sm={4}
          md={2}
      
        >
          {/* <DatePicker value={my} onChange={handleDateChange} /> */}
          <CDatePicker
            showLabel={true}
            required
            value={showDate}
            id="date"
            name="dueDate"
            onChange={(e: any) => {
              setShowDate(e);
              // projectOverview.dueDate = moment(e).format("YYYY-MM-DD");
            }}
          />
        </Grid>

        <Grid item xs={12} sm={5} md={5} className={classes.datePickerWrapper}>
          <SelectDropdown
            handleChange={handleOwnerChange}
            data={data}
            value={ProjectOwnerList}
            title="Owner"
            isMulti={true}
            // isDisabled={isDisabled}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} className={classes.datePickerWrapper}>
          <SelectDropdown
            handleChange={handleStatusChange}
            data={statusData}
            value={statusValue}
            title="Status"
          />
        </Grid>

        <Grid item xs={12} md={6} style={{ padding: "20px 5px" }}>
          <HorizontalBreak color={colors.grey} />
        </Grid>
      </Grid>

      <Grid container className={classes.secondForm}>
        <Grid
          item
          xs={2}
          sm={3}
          md={2.5}
          // xs={12}
          // md={2}
          className={classes.imagePicker}
        >
          <ImagePicker />
        </Grid>

        <Grid item sm={10} md={8}>
          <ProjectOverViewForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectOverview;

const useStyles = makeStyles({
  datePickerWrapper: {
    // paddingLeft: "25px",
    "@media (max-width:900px)": {
      paddingLeft: 0,
      // paddingTop: 20,
    },
    "@media (max-width:600px)": {
      paddingLeft: 0,
      paddingTop: 10,
    },
  },
  secondForm: {
    paddingTop: 0,
    display: "flex",

    // alignItems:"center",
  },
  imagePicker: {
    padding: "0 10px",
    "@media (max-width:600px)": {
      paddingBottom: 10,
    },
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
});
