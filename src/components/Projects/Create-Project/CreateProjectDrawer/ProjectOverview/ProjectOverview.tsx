import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import CDatePicker from "components/DatePicker/CDatePicker";
import { getStatusDropdown } from "config/project.config";
import { UserInfo } from "constants/interfaces/subtask.interface";
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

  useEffect(() => {
    // if (selectedProject !== null) {
    //   return;
    // }
    const payload = {
      success: (res: any) => {
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

  // console.log('statusValue--->',statusValue);

  if (doOnce) {
    const localized = moment(projectOverview.dueDate, "DD-MM-YYYY").format(
      "ddd MMM DD YYYY"
    );
    setShowDate(localized)
    setDoOnce(false);
  }

  let ownersTemp = projectOverview.owner.map((user: UserInfo) => {
    let ret = {
      label: user.firstName + " " + user.surName,
      value: user._id,
    };
    return ret;
  });

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
          <SelectDropdown
            handleChange={handleOwnerChange}
            data={data}
            value={ownersList}
            title="Owner"
            isMulti={true}
            isDisabled={false}
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
