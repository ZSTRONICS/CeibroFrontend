import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
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
import {
  dataInterface
} from "../../../../Utills/Inputs/SelectDropdown";
import HorizontalBreak from "../../../../Utills/Others/HorizontalBreak";
import CreateProjectStatus from "./CreateProjectStatus";
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
      "ddd MMM DD YYYY"
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
    ownersTemp = fixedOwner
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
      <Grid container>
        {loading && <CircularProgress size={20} className={classes.progress} />}

        <Grid item xs={12} sm={6} md={3} className="black-input">
          {/* <DatePicker value={my} onChange={handleDateChange} /> */}
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

        <Grid item xs={12} sm={6} md={5} className={classes.datePickerWrapper}>
          {/* <SelectDropdown
            handleChange={handleOwnerChange}
            value={ownersList}
            data={data}
            title="Owner"
            isClearAble={false}
            isMulti={true}
            isDisabled={false}
          /> */}

          <Autocomplete
            multiple
            id="project_owners1"
            disablePortal
            filterSelectedOptions
            disableCloseOnSelect
            limitTags={3}
            // defaultValue={fixedOwner}
            value={ownersList}
            options={data}
            size="small"
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => {
                return (
                  <Chip
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
                {...params}
                name="owners"
                label="Owners"
                placeholder="Select owner(s)"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} className={classes.datePickerWrapper}>
          {/* <CreatableSelect
            handleChange={handleStatusChange}
            data={statusData}
            value={statusValue}
            title="Status"
          /> */}
          <CreateProjectStatus />
        </Grid>

        <Grid item xs={12} md={12} style={{ padding: "20px 5px" }}>
          <HorizontalBreak color={colors.grey} />
        </Grid>
      </Grid>

      <Grid container className={classes.secondForm}>
        <Grid item xs={12} md={2} className={classes.imagePicker}>
          <ImagePicker />
        </Grid>

        <Grid item xs={12} md={6}>
          <ProjectOverViewForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectOverview;

const useStyles = makeStyles({
  datePickerWrapper: {
    paddingLeft: 20,
    "@media (max-width:600px)": {
      paddingLeft: 0,
      paddingTop: 20,
    },
  },
  secondForm: {
    paddingTop: 0,
  },
  imagePicker: {
    "@media (max-width:600px)": {
      paddingBottom: 20,
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
