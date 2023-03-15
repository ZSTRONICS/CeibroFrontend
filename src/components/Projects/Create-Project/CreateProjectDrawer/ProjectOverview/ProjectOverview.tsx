import { CircularProgress, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import { borderRadius } from "@material-ui/system";
import { Autocomplete, Chip, TextField } from "@mui/material";
import CDatePicker from "components/DatePicker/CDatePicker";
import { getStatusDropdown } from "config/project.config";
import { UserInfo } from "constants/interfaces/subtask.interface";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions from "redux/action/project.action";
import { getAvailableUsers } from "redux/action/user.action";
import { RootState } from "redux/reducers";
import colors from "../../../../../assets/colors";
import ImagePicker from "../../../../Utills/Inputs/ImagePicker";
import { dataInterface } from "../../../../Utills/Inputs/SelectDropdown";
import HorizontalBreak from "../../../../Utills/Others/HorizontalBreak";
import CreateProjectStatus from "./CreateProjectStatus";
import ProjectOverViewForm from "./ProjectOverViewForm";
import InputHOC from "components/Utills/Inputs/InputHOC";

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

  const [showDate, setShowDate] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [doOnce, setDoOnce] = useState(true);
  const dispatch = useDispatch();

  const handleStatusChange = (status: dataInterface) => {
    status?.value &&
      dispatch(
        projectActions.setProjectOverview({
          ...projectOverview,
          publishStatus: status.value,
        })
      );
  };

  // const my = formatDate(projectOverview?.dueDate)
  const statusData = getStatusDropdown();
  const statusValue = projectOverview.publishStatus
    ? {
        label: projectOverview.publishStatus,
        value: projectOverview.publishStatus,
      }
    : null;

  let fixuser = [
    {
      _id: user._id,
      firstName: user.firstName,
      surName: user.surName,
      profilePic: "",
    },
  ];

  if (doOnce) {
    const localized = moment(projectOverview.dueDate, "DD-MM-YYYY").format(
      "ddd MM DD YYYY"
    );
    setShowDate(localized);
    fixuser &&
      dispatch(
        projectActions.setProjectOverview({
          ...projectOverview,
          owner: fixuser,
        })
      );
    setDoOnce(false);
  }
  let fixedOwner = [
    {
      label: user.firstName + " " + user.surName,
      value: user._id,
    },
  ];
  let ownersTemp = projectOverview.owner.map((user: UserInfo) => {
    let ret = {
      label: user.firstName + " " + user.surName,
      value: user._id,
    };
    return ret;
  });

  if (projectOverview.owner.length === 0) {
    ownersTemp = fixedOwner;
  }

  const [ownersList, setOwnerList] = useState<any>(ownersTemp);
  const handleOwnerChange = (users: dataInterface[]) => {
    //Current User && Creator can never be removed !!!
    setOwnerList(users);

    let newOwners: UserInfo[] = [];
    users.forEach((item: dataInterface) => {
      let found = false;
      projectOverview.owner.every((owner: UserInfo) => {
        if (owner._id === item.value) {
          found = true;
          newOwners.push(owner);
          return false;
        }
        return true;
      });

      if (found === false) {
        newOwners.push({
          _id: item.value,
          firstName: item.label.split(" ")[0],
          surName: item.label.split(" ")[1],
          profilePic: "",
        });
      }
    });

    newOwners &&
      dispatch(
        projectActions.setProjectOverview({
          ...projectOverview,
          owner: newOwners,
        })
      );
  };

  // const checkV = ownersList.some((item: any) => item.value === user._id);

  useEffect(() => {
    // if (selectedProject !== null) {
    //   return;
    // }
    const payload = {
      success: (res: any) => {
        // res.data = [
        //   ...res.data.filter(
        //     (option: any) => fixedOwner[0].value !== option.value
        //   ),
        // ];

        setData(res.data);
        // // setting current user as default owner
        // res?.data?.map((row: dataInterface) => {
        //   if (row?.value === user?._id) {
        //     if (!selectedProject) {

        //     }
        //   }
        // });
      },
    };

    dispatch(getAvailableUsers(payload));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Grid container gap={2.5}>
        {loading && <CircularProgress size={20} className={classes.progress} />}

        <Grid
          className={classes.firstForm}
          item
          sx={{
            maxWidth: "280px",
            width: "100%",
          }}
          // xs={12}
          // sm={2}
          // md={2}
          // lg={2.4}
        >
          <CDatePicker
            showLabel={true}
            required
            value={showDate}
            id="date1"
            name="dueDate"
            onChange={(e: any) => {
              setShowDate(e);
              projectOverview.dueDate = moment(e).format("DD-MM-YYYY");
            }}
          />
        </Grid>

        <Grid
          item
          // xs={12}
          // sm={5}
          // md={4}
          sx={{
            width: "100%",
            height: "40px",
            maxWidth: "460px",
          }}
          className={classes.datePickerWrapper}
        >
          {/* <SelectDropdown
            handleChange={handleOwnerChange}
            value={ownersList}
            data={data}
            title="Owner"
            isClearAble={false}
            isMulti={true}
            isDisabled={false}
          /> */}
          <InputHOC title="Owners">
            <Autocomplete
              sx={{
                backgroundColor: "white",
                maxWidth: "100%",
                width: "100%",
              }}
              multiple
              // disableClearable
              id="project_owners1"
              disablePortal
              filterSelectedOptions
              disableCloseOnSelect
              limitTags={2}
              defaultValue={fixedOwner}
              value={ownersList}
              options={data}
              size="small"
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                  return (
                    <Chip
                      sx={{
                        height: "25px",
                        backgroundColor: "#F1B740",
                        color: colors.black,
                        borderRadius: "4px",
                      }}
                      label={option?.label}
                      {...getTagProps({ index })}
                      disabled={String(user._id) === String(option.value)}
                    />
                  );
                })
              }
              onChange={(event, value) => {
                let newValue: any = [
                  ...fixedOwner,
                  ...value.filter(
                    (option: any) => fixedOwner[0].value !== option.value
                  ),
                ];
                // value.every((option: any) => {
                //   if (String(user._id) === String(option.id)) {
                //     found = true;
                //     return false;
                //   }
                //   return true
                // });

                // if (found === false) {
                //   value.push(fixedOwner[0]);
                // }
                handleOwnerChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  sx={{
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      padding: "0px",
                    },
                    // border: "1px solid #DBDBE5",
                    // borderRadius: "4px",
                  }}
                  {...params}
                  name="owners"
                  // label="Owners"
                  // placeholder="Select owner(s)"
                />
              )}
            />
          </InputHOC>
        </Grid>

        <Grid
          item
          // xs={12}
          // sm={7}
          // md={3}
          sx={{
            width: "100%",
            maxWidth: "280px",
          }}
          className={classes.datePickerWrapper}
        >
          {/* <SelectDropdown
            handleChange={handleStatusChange}
            data={statusData}
            value={statusValue}
            title="Status"
          /> */}
          <CreateProjectStatus />
        </Grid>

        <Grid item xs={12} md={12} style={{ padding: "0px 20px 40px" }}>
          <HorizontalBreak color={colors.grey} />
        </Grid>
      </Grid>

      <Grid container className={classes.secondForm}>
        <Grid
          item
          // xs={2}
          // sm={3}
          // md={2.5}
          // xs={12}
          // md={2}
          className={classes.imagePicker}
        >
          <ImagePicker />
        </Grid>

        <Grid
          item
          // sm={10} md={8}
        >
          <ProjectOverViewForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectOverview;

const useStyles = makeStyles({
  firstForm: {
    height: "40px",
    "@media (max-width:520px)": {
      width: "100%",
      maxWidth: "100%",
    },
  },
  datePickerWrapper: {
    // paddingLeft: "25px",

    "@media (max-width:900px)": {
      paddingLeft: 0,
      // paddingTop: 20,
    },
    // "@media (max-width:600px)": {
    //   paddingLeft: 0,
    //   paddingTop: 10,
    // },
  },
  secondForm: {
    paddingTop: 0,
    display: "flex",
    "@media (max-width:1183px)": {
      paddingLeft: 0,
    },
  },
  imagePicker: {
    width: "275px",
    padding: "0",
    "@media (max-width:1183px)": {
      paddingBottom: "10px",
    },
    "@media (max-width:900px)": {
      paddingBottom: 10,
    },
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
